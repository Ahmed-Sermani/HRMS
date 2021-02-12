from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout, views
views.PasswordChangeView
from django.contrib import messages
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse, HttpResponseRedirect
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.conf import settings
from django.contrib.auth.views import LoginView
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from employee_dashboard.models.Employee_Extra_Info import Employee_Extra_Info
from .models import Employee
from .models import User, Employer, Employee, Asset, AssignedAsset
from .tokens import account_activation_token
from .decorators import employer_required, employee_required


class LoginManager(LoginView):
   
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user)
            return redirect(self.get_success_url())
        return render(request, super().template_name, {'error': 'invalid credentials'})
        

# redirect employer to employer_dashboard and employee to employee_dashboard
@login_required
def login_redirect(request):
    if request.user.is_employer:
        return redirect('employer_dashboard:employer_dashboard')
    return redirect('employee_dashboard:employee_dashboard')
    

# activate account by clicking on activation email link
def activate_account(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        
        if user.is_employer:
            messages.success(request, 'You have successfully confirmed your email. Log in to proceed.')
            return redirect('core:login')
        else:
            messages.info(request, 'Set a password for your Employee account.')
            return redirect('core:employee_set_password', uid=user.id)
    
    # invalid link
    messages.error(request, 'Account activation link is invalid or has expired. Contact system administratior for assistance')
    return redirect('core:home')

# account activation email sent
def account_activation_sent(request):
    return HttpResponse('<p>An activation link has been sent to your Email</p>')



class EmployeeView(APIView):
    permission_classes  = [IsAuthenticated] 
    @method_decorator([employee_required])
    def get(self, request, *args, **kwargs):
        img = Employee_Extra_Info.objects.get(employee__user__id = request.user.id).img
        return JsonResponse(
            {
                'name': request.user.first_name + ' ' + request.user.last_name,
                'position': request.user.position,
                'phone_number': request.user.phone_number,
                'img': 'media/'+ str(img)
            }
        )


@login_required
def logoutView(request):
    logout(request)
    return redirect('login')


class PasswordResetView(APIView):
    permission_classes  = [IsAuthenticated]
    
    @method_decorator([employee_required])
    def post(self, request):
        user = User.objects.get(id = request.user.id)

        result = {
            'success': False,
            'message': ''
        }
        raw_password = request.data['password']
        password_confirmation = request.data['password-confirmation']
        new_password = request.data['new-password']

        if new_password != password_confirmation:
            result['message'] = 'the password does not match the password confirmation'
            return JsonResponse(result)
        
        if not user.check_password(raw_password):
            result['message'] = 'password not correct'
            return JsonResponse(result)
        user.set_password(request.data['new-password'])
        result['success'] = True
        result['message'] = 'Succeeded'
        user.save()
        login(request, user)
        return JsonResponse(result)

# upon activating account, employee should set password
def employee_set_password(request, uid):
    user = get_object_or_404(User, pk=uid)
    
    if request.method == 'POST':
        form = SetPasswordForm(user, request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            
            messages.success(request, 'Welcome '+user.email+'. Your account is now operational')
            return redirect('core:login_redirect')
    else:
        form = SetPasswordForm(user)
    
    return render (request, 'core/employee/set_password.html', {'set_password_form': form, 'user': user})