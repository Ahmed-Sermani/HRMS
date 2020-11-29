from django.db import models
from django.utils.timezone import now
class Bill(models.Model):
    
    created_by = models.ForeignKey('Accountant', on_delete=models.PROTECT)

    entered_at = models.DateTimeField(default = now)

    updated_at = models.DateTimeField(null  = True)

    amount = models.FloatField()

    reason = models.TextField()

    def __str__(self):
        return self.id
    