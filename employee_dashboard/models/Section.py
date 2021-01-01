from django.db import models
from .Department import Department
class Section(models.Model):

    name = models.CharField(max_length = 30)

    department = models.ForeignKey(Department , models.CASCADE)

    def __str__(self):
        return self.name
