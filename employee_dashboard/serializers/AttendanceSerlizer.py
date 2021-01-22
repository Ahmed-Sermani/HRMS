from employee_dashboard.models.Attendance import Attendance
from rest_framework.serializers import ModelSerializer, StringRelatedField

class AttendanceSerializer(ModelSerializer):
    
    employee = StringRelatedField(source = 'employee_extra_info.__str__')

    class Meta: 
        model = Attendance
        fields = '__all__'