from django.urls import path
from .views.dashboard import serve_dashboard

app_name='employee_dashboard'

urlpatterns = [
    path('' , serve_dashboard , name='employee_dashboard')    
]
