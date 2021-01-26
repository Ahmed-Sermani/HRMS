from employee_dashboard.models.Task import Task
from rest_framework.serializers import ModelSerializer, StringRelatedField
from django.utils.timezone import get_current_timezone, now, localtime, localdate, make_aware, make_naive

class TaskSerializer(ModelSerializer):
    employee = StringRelatedField(source = 'assigned_to.__str__')

    class Meta:
        model = Task
        fields = '__all__'
