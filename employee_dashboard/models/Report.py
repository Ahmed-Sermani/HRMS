import django
from django.db import models
from employee_dashboard.utils import media_uploader

class Report(models.Model):
    employee_extra_info = models.ForeignKey(
        'Employee_Extra_Info',
        on_delete = models.SET_NULL,
        null = True
    )

    submission_date = models.DateField(default = django.utils.timezone.now)

    file = models.FileField(
        upload_to= media_uploader('reports')
    )

    