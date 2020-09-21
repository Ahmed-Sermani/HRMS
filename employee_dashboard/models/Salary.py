from django.db import models

from employee_dashboard.utils import positive_validator

class Salary(models.Model):

    employee_extra_info = models.ForeignKey(
        'Employee_Extra_Info',
        on_delete=models.DO_NOTHING
    )

    GOSI_salary = models.FloatField(
        validators=[positive_validator]
        )

    deductions = models.FloatField(
        validators=[positive_validator]
        )

    deductions_reason = models.TextField(
        blank=True,
        null=True
    )

    from_date = models.DateField()

    to_date = models.DateField()

    days_absent = models.PositiveIntegerField(default=0)


    @property
    def net_salary(self):
        net = 0.0

        base_salary = self.employee_extra_info.base_salary

        from calendar import monthrange

        number_of_days_in_month = monthrange(self.from_date.year , self.from_date.month)[1]

        daily_payment = float(base_salary / number_of_days_in_month)

        net = float((base_salary + self.GOSI_salary) - (daily_payment * self.days_absent) - self.deductions)

        return net

    def __str__(self):
        return str(self.id)
    