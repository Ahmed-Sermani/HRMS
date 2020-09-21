from django.db import models
from employee_dashboard.utils import days_of_week_string_validator
class Shift(models.Model):

    _from = models.TimeField()

    to  = models.TimeField()
    
    
    """
    this will be like '1234567'
    1 = Sunday
    2 = Monday
    3 = Tuesday
    4 = Wensday
    5 = Thursday
    6 = Friday
    7 = Saturday

    will validate this by field validator
    """
    days_of_week = models.CharField(
        max_length=7,
        validators=[days_of_week_string_validator]
        )

    def __str__(self):
        return str(self.id)
