from django.db import models
from django.core.exceptions import ValidationError
from employee_dashboard.utils import media_uploader , positive_validator
from datetime import date
from .Section import Section
class Employee_Extra_Info(models.Model):
       


    work_types = [
        ('Full Time' , 'Full Time'),
        ('Part Time' , 'Part Time'),
        ('Remotely' , 'Remotely')
    ]


    employee = models.OneToOneField('core.Employee' , on_delete=models.CASCADE)

    nationality = models.CharField(max_length = 40, null = True)

    job_title = models.CharField(max_length = 30, null = True)
    
    img = models.ImageField(
        upload_to = media_uploader('profile_imgs'),
        blank = True,
        null = True
        )


    work_type = models.CharField(
        max_length = 20,
        choices=work_types,
        default='Full Time'
        )


    direct_manager = models.ForeignKey(
        'core.Employee',
        on_delete = models.SET_NULL,
        blank = True,
        null = True,
        related_name = 'direct_manager'
        )

    
    supervisor = models.ForeignKey(
        'core.Employee',
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
    

    section = models.ForeignKey(Section ,models.CASCADE, null = True)

    birth_date = models.DateField()

    hiring_date = models.DateField()

    end_of_contract = models.DateField()

    end_of_probation = models.DateField(null = True)

    branch = models.CharField(max_length = 40, null = True)

    sick_day_balance = models.IntegerField(null = True)

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
    
    GOSI_salary = models.FloatField(
        validators=[positive_validator],
        null= True
        )
    
    available_annual_vacation_balance = models.IntegerField(null = True)


    #TODO: add this when the employer side is implemented 
    # job_applicant = models.ForeignKey('job_application')


    gender = models.CharField(
        max_length = 10,
        choices = [
            ('Male' , 'Male'),
            ('Female' , 'Female')
        ],
        default = 'Male'
        )

    salutation_prefix = [
        ('Prof','Prof'),
        ('Master','Master'),
        ('Miss','Madam'),
        ('Mrs','Mrs'),
        ('Dr','Dr'),
        ('Mr','Mr'),
        ('Ms','Ms'),
        ('Eng','Eng'),
        ('Dev','Dev')
    ]

    salutation = models.CharField(
        max_length = 10,
        choices = salutation_prefix,
        null = True , 
        blank = True
    )


    status = models.CharField(
        max_length = 10,
        choices = [
            ('Active' , 'Actice'),
            ('Left' , 'Left')
        ],
        default = 'Actice'
        )
    @property
    def age(self):
        today = date.today()
        return int(today.year - self.birth_date.year)


    @property
    def years_of_hiring(self):
        return int(date.today().year - self.hiring_date.year)
   
    @property
    def period_of_employment(self):
        return 'months ' +  str(int( self.hiring_date.month - date.today().month ))

    @property
    def available_vacation_balance_up_to_end_of_year(self):
        from datetime import date
        today = date.today()
        f_date = date( today.year + 1, 1, 1)
        delta = f_date - today
        return str(self.available_annual_vacation_balance - delta.days) if delta.days < self.available_annual_vacation_balance else str(self.available_annual_vacation_balance)

    @property
    def sick_day_balance_up_to_end_of_the_year(self):
        from datetime import date
        today = date.today()
        f_date = date( today.year + 1, 1, 1)
        delta = f_date - today
        return str(self.sick_day_balance - delta.days) if delta.days < self.sick_day_balance else str(self.sick_day_balance)


    def __str__(self):
        return self.employee.user.email


