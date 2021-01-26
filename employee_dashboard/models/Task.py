from django.db import models
from django.utils.timezone import now
class Task(models.Model):
    assigned_to = models.ForeignKey('Employee_Extra_info' , on_delete=models.CASCADE)

    title = models.CharField(max_length = 50)



    assigned_at = models.DateTimeField(default = now, null= True)

    deadline = models.DateTimeField()

    description = models.TextField()

    status_enum = [
        ('New', 'New'),
        ('In Progress', 'In Progress'),
        ('Failed', 'Failed'),
        ('Done', 'Done'),
    ]

    status = models.CharField(
        choices = status_enum,
        max_length = 20,
        default = 'New'
    )

    task_enum = [
        ('Scheduled', 'Scheduled'),
        ('Instant', 'Instant'),
    ]

    task_type = models.CharField(
        choices = task_enum,
        max_length = 20,
        default = 'Instant'
    )

    send_at = models.DateTimeField(default = now, null= True)