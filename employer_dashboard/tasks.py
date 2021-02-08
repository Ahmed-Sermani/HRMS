from employee_dashboard.models.Task import Task
from django.core.management import call_command
import datetime
from hrms.celery import app

@app.task
def push_scheduled_tasks():
    tasks_to_push = Task.objects.filter(task_type = 'Scheduled')\
        .filter(send_at__isnull = False, assigned_at__isnull = True)\
        .filter(send_at__lte = datetime.datetime.now() )
    
    tasks_to_push.update(assigned_at = datetime.datetime.now())

@app.task
def record_attendance():
    call_command('resolve_absence')