from django.urls import path , include
from django.contrib.auth import views as auth_views
from core.views import LoginManager, EmployeeView, logoutView, PasswordResetView 

from . import views as core_views

app_name = 'core'
urlpatterns = [    
    # employer only
    path('employer/signup/', core_views.employer_signup, name='employer_signup'),
    path('employer/dashboard/', core_views.employer_dashboard, name='employer_dashboard'),
    path('employer/employees/', core_views.employees_list, name='employees_list'),
    path('employer/assets/', core_views.employer_assets, name='employer_assets'),
    path('employer/notifications/', core_views.employer_notifications, name='employer_notifications'),
    path('employer/profile/', core_views.employer_profile, name='employer_profile'),
    path('employee/add/', core_views.employee_add, name='employee_add'),
    path('asset/add/', core_views.asset_add, name='asset_add'),
    path('asset/assign/', core_views.asset_assign, name='asset_assign'),
    path('asset/reclaim/', core_views.asset_reclaim, name='asset_reclaim'),
    path('edit/employee/position/', core_views.employee_position_edit, name='employee_position_edit'),
    
    # employee only
    path('employee/dashboard/', core_views.employee_dashboard, name='employee_dashboard'),
    path('employee/assigned-assets/', core_views.employee_assigned_assets, name='employee_assigned_assets'),
    path('employee/profile/', core_views.employee_profile, name='employee_profile'),
    path('employee/<int:uid>/setpassword/', core_views.employee_set_password, name='employee_set_password'),
    path('employee/dashboard/main/' , include(('employee_dashboard.urls' , 'employee_dashboard'), namespace='employee_dashboard') ),
    
    path('core/api/get_user_info/', EmployeeView.as_view(), name='get_user_info'),
    path('core/api/password_reset/', PasswordResetView.as_view(), name='reset_password'),

    # all users
    path('login/', LoginManager.as_view(), name='login'),
    path('login_redirect', core_views.login_redirect, name='login_redirect'),
    path('logout/',logoutView, name='logout'),
    path('activate/account/<slug:uidb64>/<slug:token>/', core_views.activate_account, name='activate_account'),
    path('account/activation/sent/', core_views.account_activation_sent, name='account_activation_sent'),
        
]