from django.db import models
from employee_dashboard.utils import media_uploader


class Contract(models.Model):
    employee_extra_info = models.OneToOneField(
        'Employee_Extra_Info',
        on_delete=models.CASCADE
    )
    file = models.FileField(
        upload_to =  media_uploader('contracts')
    )

    def __str__(self):
        return str(self.employee_extra_info.id)
