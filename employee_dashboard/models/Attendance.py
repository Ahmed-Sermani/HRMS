from django.db import models
from django.utils import timezone
from ..utils import validate_longitude , validate_latitude

from employee_dashboard.managers.Attendance_Manager import Attendance_Manager

class Attendance(models.Model):

    # overwrites the default manager
    objects = Attendance_Manager()
    
    attendance_date = models.DateField(default = timezone.datetime.now)

    employee_extra_info = models.ForeignKey(
        'Employee_Extra_Info',
        on_delete=models.CASCADE
    )
    
    check_in = models.TimeField()

    check_out = models.TimeField(
        blank = True,
        null  = True
    )

    status_types = [
        ('Present','Present'),
        ('Absent' , 'Absent'),
        ('On Leave' , 'On Leave')
    ]

    status = models.CharField(
        max_length = 20,
        choices = status_types,
        blank = True,
        null  = True
        )
    
    longitude = models.CharField(
        max_length = 150,
        validators=[validate_longitude]
        )
    
    latitude = models.CharField(
        max_length = 150,
        validators=[validate_latitude]
        )

    def __str__(self):
        return str(self.id)

