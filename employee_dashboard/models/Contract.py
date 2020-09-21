from django.db import models
from employee_dashboard.utils import _path_and_rename_contract_file

class Contract(models.Model):
    employee_extra_info = models.OneToOneField(
        'Employee_Extra_Info',
        on_delete=models.CASCADE
    )
    file = models.FileField(
        upload_to=_path_and_rename_contract_file
        )

    def __str__(self):
        return str(self.employee_extra_info.id)
    

