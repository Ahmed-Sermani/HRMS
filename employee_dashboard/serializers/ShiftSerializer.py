from rest_framework.serializers import ModelSerializer
from employee_dashboard.models.Shift import Shift

class ShiftSerializer(ModelSerializer):

    class Meta:
        model = Shift
        fields = '__all__'
    
    
