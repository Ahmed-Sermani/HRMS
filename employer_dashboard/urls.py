from django.urls import path, include
from .views.dashboard import serve_dashboard
from .views.dashboard import optain_token
from .views.dashboard import EmployeeAddUpdateView
from .views.dashboard import EmployeeListView
from rest_framework.routers import DefaultRouter
app_name = 'employer_dashboard'



urlpatterns = [
    path('' , serve_dashboard , name='employer_dashboard'),
    path('api/get_token', optain_token, name= 'optain_token'),
    path('api/add_update_employee', EmployeeAddUpdateView.as_view(), name='add_update_employee'),
    path('api/employees_list', EmployeeListView.as_view())
]
