from django.db import models
from ..utils import media_uploader
class Request(models.Model):
    employee_extra_info = models.ForeignKey('Employee_Extra_Info' , on_delete=models.CASCADE)

    type_enum = [
        ('Leave', 'Leave'),
        ('Overtime', 'Overtime'),
        ('Loan', 'Loan'),
        ('Financial Transaction', 'Financial Transaction'),
        ('Air Ticket', 'Air Ticket'),
        ('Timeoff', 'Timeoff')
    ]

    request_type = models.CharField(
        choices = type_enum,
        max_length = 30
    )

    description = models.TextField()

    attachment = models.FileField(
        upload_to= media_uploader('requests')
    )

    is_resolved = models.BooleanField(default= False)


    def __str__(self):
        return self.id