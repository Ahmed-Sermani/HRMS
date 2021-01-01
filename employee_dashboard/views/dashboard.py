from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from core.decorators import  employee_required
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from ..models.Employee_Extra_Info import Employee_Extra_Info
@login_required
@employee_required
def serve_dashboard(request):
    print(request.user.id)
    return render(request , 'index.html' )

@login_required
@employee_required
def optain_token(request):
    refresh = RefreshToken.for_user(request.user)
    return JsonResponse({
        'refresh': str(refresh),
        'access_token': str(refresh.access_token),
        'name': request.user.first_name +' ' + request.user.last_name
    })


class ProfileView(APIView):
    permission_classes  = [IsAuthenticated] 
    @method_decorator([employee_required])
    def get(self, request, *args, **kwargs):
        user = request.user
        employee_extra_info = Employee_Extra_Info.objects.get(employee__user_id = user.id)
        result = {
            'img': '/media/' + str(employee_extra_info.img),
            'name': str(employee_extra_info.salutation)+ '.' + user.first_name + ' ' + user.last_name,
            'employeeId': str(employee_extra_info.employee_id),
            'gender': str(employee_extra_info.gender),
            'birthDay': str(employee_extra_info.birth_date), 
            'maritalStatus': str(employee_extra_info.marital_status),
            'nationality': str(employee_extra_info.nationality),
            'age': int(employee_extra_info.age),
            'nationalId': str(employee_extra_info.employee.user.national_id),
            'email': str(employee_extra_info.employee.user.email),
            'mobile': str(employee_extra_info.employee.user.phone_number),
            'phone': str(employee_extra_info.employee.user.office_phone),
            'jobTitle': str(employee_extra_info.job_title),
            'workType': str(employee_extra_info.work_type),
            'directManager': employee_extra_info.direct_manager.user.full_name if employee_extra_info.direct_manager else '',
            'workLocation': str(employee_extra_info.work_location),
            'branch': str(employee_extra_info.branch),
            'department': str(employee_extra_info.section.department.name) if employee_extra_info.section else '',
            'section': str(employee_extra_info.section.name) if employee_extra_info.section else '',
            'hiringDate': str(employee_extra_info.hiring_date),
            'periodOfEmployment': employee_extra_info.period_of_employment,
            'endOfProbation': employee_extra_info.end_of_probation,
            'basicSalary': float(employee_extra_info.base_salary),
            'GOSISalary': float(employee_extra_info.GOSI_salary or 0),
            'totalSalary': float(employee_extra_info.base_salary + (employee_extra_info.GOSI_salary or 0) ),
            'availableAnnualBalance': int(employee_extra_info.available_annual_vacation_balance),
            'upToEndOfTheYearBalance': int(employee_extra_info.available_vacation_balance_up_to_end_of_year),
            'sickDayBalance': int(employee_extra_info.sick_day_balance),
            'upToEndOfYearSickDayBalance': int(employee_extra_info.sick_day_balance_up_to_end_of_the_year)
        }

        return JsonResponse(result)
