from django.db import models
from core.models import Employee
from datetime import datetime ,date
from django.core.exceptions import ValidationError
from django.utils import timezone
from .managers import Attendance_Manager
from .utils import \
    _path_and_rename_contract_file ,\
    _path_and_rename_profile_img ,\
    positive_validator ,\
    days_of_week_string_validator ,\
    map_dayweek


class Employee_Extra_Info(models.Model):
   


    work_types = [
        ('Full Time' , 'Full Time'),
        ('Part Time' , 'Part Time'),
        ('Remotely' , 'Remotely')
    ]


    employee = models.OneToOneField(Employee , on_delete=models.CASCADE)


    img = models.ImageField(
        upload_to = _path_and_rename_profile_img,
        blank = True,
        null = True,
        height_field = 100,
        width_field = 100,
        )


    work_type = models.CharField(
        max_length = 20,
        choices=work_types,
        default='Full Time'
        )


    direct_manager = models.ForeignKey(
        Employee,
        on_delete = models.SET_NULL,
        blank = True,
        null = True,
        related_name = 'direct_manager'
        )

    
    supervisor = models.ForeignKey(
        Employee,
        on_delete = models.SET_NULL,
        blank = True,
        null = True,
        related_name = 'supervisor'
        )

    work_location = models.CharField(
        max_length = 100,
        blank = True,
        null = True
        )
    

    birth_date = models.DateField()

    hiring_date = models.DateField()

    end_of_contract = models.DateField()


    def save(self, *args, **kwargs):
        if self.end_of_contract < self.hiring_date or self.birth_date > self.hiring_date:
            raise ValidationError('the dates are not rational')

        super().save(*args, **kwargs)  
        

    marital_status_options = [
        ('Married' , 'Married'),
        ('Single' , 'Single')
    ]

    marital_status = models.CharField(
        max_length = 10,
        choices = marital_status_options,
        default='Single'
    )

    base_salary = models.FloatField(
        validators=[positive_validator]
        )



    @property
    def age(self):
        today = date.today()
        return int(today.year - self.birth_date.year)


    @property
    def years_of_hiring(self):
        return int(date.today().year - self.hiring_date.year)
   



    def __str__(self):
        return self.employee.user.email




class Contract(models.Model):
    employee_extra_info = models.OneToOneField(
        Employee_Extra_Info,
        on_delete=models.CASCADE
    )
    file = models.FileField(
        upload_to=_path_and_rename_contract_file
        )

    def __str__(self):
        return str(self.employee_extra_info.id)
    





class Notification(models.Model):
    sources = [
        ('System' , 'System'),
        ('Employer' ,'Employer')
    ]

    employee = models.ForeignKey(Employee , on_delete=models.CASCADE)

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




class Salary(models.Model):

    employee_extra_info = models.ForeignKey(
        Employee_Extra_Info,
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
    
class Attendance(models.Model):

    # overwrites the default manager
    objects = Attendance_Manager()
    
    attendance_date = models.DateField(default = timezone.datetime.now)

    employee_extra_info = models.ForeignKey(
        Employee_Extra_Info,
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

    def __str__(self):
        return str(self.id)


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

class Shift_Subscription(models.Model):
    shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE
    )

    employee_extra_info = models.ForeignKey(
        Employee_Extra_Info,
        on_delete=models.CASCADE
    )

    def is_off_today(self):
        weekday = map_dayweek(date.today().weekday())
        return str(weekday) not in self.shift.days_of_week

    def __str__(self):
        return str(self.id)