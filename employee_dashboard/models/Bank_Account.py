from django.db import models

class Bank_Account(models.Model):
    employee_extra_info = models.ForeignKey('Employee_Extra_Info' , on_delete=models.CASCADE)

    bank = models.CharField(max_length = 50)

    card_number = models.CharField(max_length = 30)

    def __str__(self):
        self.id