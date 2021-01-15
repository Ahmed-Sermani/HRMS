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
                'message': f'The Section {} Does Not Exist'.format(data['section'])
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
        
    
        return Response({'success': True})


        
