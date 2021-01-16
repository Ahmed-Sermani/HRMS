from rest_framework.serializers import ModelSerializer, SerializerMethodField
from employee_dashboard.models.Employee_Extra_Info import Employee_Extra_Info

class EmployeeExtraInfoSerializer(ModelSerializer):
    full_name = SerializerMethodField()
    class Meta:
        model = Employee_Extra_Info
        fields = '__all__'
        dept = 1
    
    def get_full_name(self, obj):
        return obj.employee.user.full_name