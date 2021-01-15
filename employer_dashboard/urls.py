from django.urls import path, include
from .views.dashboard import serve_dashboard
from .views.dashboard import optain_token
app_name = 'employer_dashboard'

urlpatterns = [
    path('' , serve_dashboard , name='employer_dashboard'),
    path('api/get_token', optain_token, name= 'optain_token')
]
