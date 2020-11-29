from django.db import models

class Accountant(models.Model):

    employee_extra_info = models.OneToOneField('Employee_Extra_Info', on_delete=models.PROTECT)

    budgit = models.FloatField(null = True)

    last_recharge = models.DateField(null = True)

    last_recharge_amount = models.FloatField(null = True)

    def __str__(self):
        self.id

