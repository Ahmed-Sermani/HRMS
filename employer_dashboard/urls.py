from django.urls import path, include
from .views.dashboard import serve_dashboard
from .views.dashboard import optain_token
from .views.dashboard import EmployeeAddUpdateView
app_name = 'employer_dashboard'

urlpatterns = [
    path('' , serve_dashboard , name='employer_dashboard'),
    path('api/get_token', optain_token, name= 'optain_token'),
    path('api/add_update_employee', EmployeeAddUpdateView.as_view(), name='add_update_employee')
]
