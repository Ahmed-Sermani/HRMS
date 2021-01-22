from django.contrib.auth.decorators import login_required
from core.decorators import employer_required
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views
from rest_framework import permissions
from rest_framework import decorators
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.db.utils import IntegrityError
from django.db import transaction
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from employee_dashboard.models.Employee_Extra_Info import Employee_Extra_Info
from employee_dashboard.serializers.EmployeeExtraInfoSerializer import EmployeeExtraInfoSerializer
@login_required
@employer_required
def serve_dashboard(request):
    return HttpResponse(b'Employer Dashboard')


@csrf_exempt
@login_required
@employer_required
def optain_token(request):
    refresh = RefreshToken.for_user(request.user)
    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'name': request.user.first_name + ' ' + request.user.last_name
    })


class EmployeeAddUpdateView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @method_decorator([employer_required])
    def post(self, request):
        from core.models import User, Employee
        from employee_dashboard.models.Employee_Extra_Info import Employee_Extra_Info
        from dateutil.parser import parse
        from django.core.exceptions import ValidationError
        from employee_dashboard.models.Section import Section
        from django.contrib.sites.shortcuts import get_current_site
        from django.template.loader import render_to_string
        from django.utils.http import urlsafe_base64_encode
        from django.utils.encoding import force_bytes
        from core.tokens import account_activation_token
        data = request.data
        user = User()
        user.email = data['email']
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.date_joined = data['hiring_date']
        user.username = data['username']
        user.position = data['position']
        user.national_id = data['national_id']
        user.phone_number = data['phone_number']
        user.office_phone = data['office_number']
        user.date_of_birth = data['date_of_birth']
        user.is_employee = True

        

        employee = Employee()
        employee.employer = request.user.employer
        employee.user = user
        

        employee_extra = Employee_Extra_Info()

        employee_extra.employee = employee
        employee_extra.nationality = data['nationality']
        employee_extra.job_title = data['job_title']

        try:
            employee_extra.direct_manager = Employee.objects.get(user__email = data.get('direct_manager')) if  data.get('direct_manager') else None
            employee_extra.supervisor = Employee.objects.get(user__email = data.get('supervisor')) if  data.get('supervisor') else None
        except Employee.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Supervisor or Direct Manager Does Not Exist'
            })
        
        try:
            employee_extra.section = Section.objects.get(name = data.get('section') ) if data.get('section') else None  
        except Section.DoesNotExist:
            return Response({
                'success': False,
                'message': 'The Section {} Does Not Exist'.format(data['section'])
            })

        employee_extra.birth_date = data['date_of_birth']
        employee_extra.hiring_date = data['hiring_date']
        employee_extra.end_of_contract = data['end_of_contract']
        employee_extra.end_of_probation = data['end_of_probation']
        employee_extra.marital_status = data['marital_status']
        employee_extra.branch = data['branch']
        employee_extra.sick_day_balance = 30
        employee_extra.base_salary = data['base_salary']
        employee_extra.GOSI_salary = data['GOSI_salary']
        employee_extra.available_annual_vacation_balance = 30
        employee_extra.gender = data['gender']
        employee_extra.salutation = data['salutation']
        employee_extra.status = 'Active'


        try:
            with transaction.atomic():
                user.save()
                employee.save()
                employee_extra.save()

        except ValidationError as e:
            return Response({
                'success': False,
                'message': e.message
            })
        except  IntegrityError:
            return Response({
                'success': False,
                'message': 'Email or Username Already Exist'
            })
        
        current_site = get_current_site(request)
        subject = 'Activate Employee Account'
        message = render_to_string('core/account_activation_email.html', {
            'user': employee,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(employee.pk)),
            'token': account_activation_token.make_token(user)
        })

        user.email_user(subject, message, from_email='hrms.system@gmail.com')

        return Response({'success': True})


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 10

class EmployeeListView(generics.ListAPIView):
     
    serializer_class = EmployeeExtraInfoSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated]

    @method_decorator([employer_required])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    @method_decorator([employer_required])
    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    
    def get_queryset(self):
        queryset = Employee_Extra_Info.objects.all()
        if self.request.data.get('search_name'):
            queryset = queryset.filter(employee__user__first_name__icontains = self.request.data.get('search_name'))
        if self.request.data.get('id'):
            queryset = queryset.filter(pk = self.request.data.get('id'))
        return queryset

class IsEmployer(permissions.BasePermission):
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_employer)


class EmployeeViewSet(ModelViewSet):
    queryset = Employee_Extra_Info.objects.all()
    serializer_class = EmployeeExtraInfoSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]

from core.models import Asset, AssignedAsset, Employee
from employee_dashboard.serializers.AssetSerializer import AssetSerializer
from rest_framework import mixins
class AssetsViewSet(ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]

    def create(self, request, *args, **kwargs):
        asset = Asset()
        asset.asset = request.data['asset']
        asset.title = request.data['title']
        asset.description = request.data['description']
        asset.employer = request.user.employer

        try:
            emp = Employee.objects.get(user__email = request.data['assigned'])
        except Employee.DoesNotExist:
            return Response({
                'success': False,
                'message': 'No Such Employee To Assgin The Asset'
            })
        assigned_asset = AssignedAsset()
        assigned_asset.asset = asset
        assigned_asset.employee = emp

        with transaction.atomic():
            asset.save()
            assigned_asset.save()
        
        return Response({'success': True})
    


from employee_dashboard.serializers.SectionSerializer import SectionSerializer, Section
class SectionViewSet(ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]


from employee_dashboard.serializers.BankAccountSerializer import BankAccountSerializer, Bank_Account
class BankViewSet(ModelViewSet):
    queryset = Bank_Account.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)



from employee_dashboard.serializers.ShiftSerializer import ShiftSerializer, Shift
from employee_dashboard.models.Shift_Subscription import Shift_Subscription
class ShiftViewSet(ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]


    def create(self, request):
        import json
        from datetime import time
        data = request.data
        shift = Shift()
        shift.days_of_week = data['days_of_week']
        shift.name = data['name']
        shift.polygon = json.dumps(data['polygon'])
        shift._from = data['_from']
        shift.to = data['to']
        subs = []
        for employee_email in data['employees']:
        
            try:
                emp = Employee_Extra_Info.objects.get(employee__user__email = employee_email)
            except Employee_Extra_Info.DoesNotExist:
                return Response({
                    'success': False,
                    'message': f'Employee with email {employee_email} does not exist'
                })
            
            sub = Shift_Subscription()
            sub.employee_extra_info = emp
            sub.shift = shift
            subs.append(sub)
    
        with transaction.atomic():
            shift.save()
            for sub in subs:
                sub.save()
        

        return Response({
            'success': True
        })   


from employee_dashboard.serializers.AttendanceSerlizer import Attendance, AttendanceSerializer
class AttendanceListView(ListAPIView):
    queryset = Attendance.objects.all().order_by('-attendance_date')
    serializer_class = AttendanceSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated, IsEmployer]
