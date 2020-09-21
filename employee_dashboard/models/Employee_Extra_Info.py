from django.db import models
from django.core.exceptions import ValidationError
from employee_dashboard import utils
from datetime import date

class Employee_Extra_Info(models.Model):
       


    work_types = [
        ('Full Time' , 'Full Time'),
        ('Part Time' , 'Part Time'),
        ('Remotely' , 'Remotely')
    ]


    employee = models.OneToOneField('core.Employee' , on_delete=models.CASCADE)

    
    img = models.ImageField(
        upload_to = utils._path_and_rename_profile_img,
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
        validators=[utils.positive_validator]
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


