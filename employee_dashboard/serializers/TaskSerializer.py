from employee_dashboard.models.Task import Task
from rest_framework.serializers import ModelSerializer
from django.utils.timezone import get_current_timezone, now, localtime, localdate, make_aware, make_naive

class TaskSerializer(ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'
