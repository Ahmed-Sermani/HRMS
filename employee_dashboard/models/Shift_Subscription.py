from django.db import models
from employee_dashboard.utils import map_dayweek
from datetime import date

class Shift_Subscription(models.Model):
    shift = models.ForeignKey(
        'Shift',
        on_delete=models.CASCADE
    )

    employee_extra_info = models.ForeignKey(
        'Employee_Extra_Info',
        on_delete=models.CASCADE
    )

    def is_off_today(self):
        weekday = map_dayweek(date.today().weekday())
        return str(weekday) not in self.shift.days_of_week

    def __str__(self):
        return str(self.id)