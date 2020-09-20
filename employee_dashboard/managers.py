from django.db import models
from datetime import datetime
from django.utils import timezone


class Attendance_Manager(models.Manager):
    def checkout_all_attendance(self):
        super().get_queryset().filter(check_out__exact = None).update(check_out = datetime.now().time())
    
    def get_checked_in(self , day = timezone.now().date()):
        """return all checked in attendance in specific day

        Args:
            day (datetime.date, optional):  Defaults to timezone.now().date().
        """
        return self.get_queryset().filter(attendance_date = day)
    
    