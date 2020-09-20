from django.urls import path
from .views import main

app_name='employee_dashboard'

urlpatterns = [
    path('' , main , name='main_employee_dashboard')    
]
