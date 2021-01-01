from django.urls import path
from .views.dashboard import serve_dashboard
from .views.dashboard import optain_token, ProfileView
app_name='employee_dashboard'

urlpatterns = [
    path('' , serve_dashboard , name='employee_dashboard'),
    path('api/get_token', optain_token, name='optain_token'),
    path('api/get_profile_info', ProfileView.as_view(), name = 'profile_api')
]
