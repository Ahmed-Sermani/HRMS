import os
from celery import Celery
import django
from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrms.settings')
django.setup() 

app = Celery('hrms', broker = settings.BROKER_URL, include=['employer_dashboard.tasks'])

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
    
