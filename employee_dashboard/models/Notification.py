from django.db import models
from datetime import datetime


class Notification(models.Model):
    sources = [
        ('System' , 'System'),
        ('Employer' ,'Employer')
    ]

    employee = models.ForeignKey('Employee_Extra_Info' , on_delete=models.CASCADE)

    title = models.TextField(max_length=100)

    body = models.TextField()

    seen = models.BooleanField(default=False)

    date_time = models.DateTimeField(default=datetime.now())

    comes_from = models.CharField(
        max_length=20,
        choices=sources,
        default='System'
    )

    def is_from_system(self):
        return self.comes_from == 'System' 

        
    def is_from_employer(self):
        return self.comes_from == 'Employer'

    def __str__(self):
        return self.title


