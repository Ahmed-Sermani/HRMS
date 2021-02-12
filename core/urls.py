from django.urls import path , include
from django.contrib.auth import views as auth_views
from core.views import LoginManager, EmployeeView, logoutView, PasswordResetView 

from . import views as core_views

app_name = 'core'
urlpatterns = [

    path('employee/<int:uid>/setpassword/', core_views.employee_set_password, name='employee_set_password'),
    
    path('core/api/get_user_info/', EmployeeView.as_view(), name='get_user_info'),
    path('core/api/password_reset/', PasswordResetView.as_view(), name='reset_password'),

    # all users
    path('login/', LoginManager.as_view(), name='login'),
    path('login_redirect', core_views.login_redirect, name='login_redirect'),
    path('logout/',logoutView, name='logout'),
    path('activate/account/<slug:uidb64>/<slug:token>/', core_views.activate_account, name='activate_account'),
    path('account/activation/sent/', core_views.account_activation_sent, name='account_activation_sent'),
        
]