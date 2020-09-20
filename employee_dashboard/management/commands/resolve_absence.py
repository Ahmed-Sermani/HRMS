from django.core.management import call_command
from django.core.management.base import BaseCommand , CommandError
from django.utils import timezone
from employee_dashboard.models import Attendance , Shift_Subscription

class Command(BaseCommand):
    help="""
    this command will resolve all the absence in attendance 
    according to each employee shift
    """

    def handle(self, *args, **options):
        
        call_command('checkout_all_attendance')

        #get all employee that checked in today
        checked_in = Attendance.objects.get_checked_in()

        #look to there shift to see of their ok
        for attend in checked_in:
            
            shift = Shift_Subscription.objects.get(employee_extra_info = attend.employee_extra_info)
            if attend.checked_in > 