from django.urls import path, include
from .views.dashboard import serve_dashboard ,optain_token, ProfileView, UploadImage,\
     BankAccountViewSet, AssetsViewSet, ShiftView, AttendanceListView, TaskViewSet
from rest_framework.routers import DefaultRouter

app_name='employee_dashboard'
router = DefaultRouter()
router.register('bank_accounts', BankAccountViewSet, basename= 'bank_accounts')
router.register('assets' , AssetsViewSet, basename='assets')
router.register('task_viewset' , TaskViewSet, basename='task_viewset')

urlpatterns = [
    path('' , serve_dashboard , name='employee_dashboard'),
    path('api/get_token', optain_token, name='optain_token'),
    path('api/get_profile_info', ProfileView.as_view(), name = 'profile_api'),
    path('api/upload_image', UploadImage.as_view(), name='upload_image'),
    path('api/', include(router.urls)),
    path('api/shift', ShiftView.as_view(), name='employee_shift'),
    path('api/attendance_list', AttendanceListView.as_view(), name = 'attendance_list')

]
