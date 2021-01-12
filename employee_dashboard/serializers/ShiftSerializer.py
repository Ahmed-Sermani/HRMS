from rest_framework.serializers import ModelSerializer
from employee_dashboard.models.Shift import Shift

class ShiftSerializer(ModelSerializer):

    class Meta:
        model = Shift
        fields = ('_from', 'to', 'days_of_week', 'polygon')
