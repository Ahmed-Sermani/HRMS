from django.core.management.base import BaseCommand, CommandError
from employee_dashboard.models.Attendance import Attendance

class Command(BaseCommand):
    help = """
    check out all the attendance records this command intended to be 
    used by corn job to prepare to another corn job that will
    calculate the absence of the day
    """


    def handle(self, *args, **options):
        try:
            Attendance.objects.checkout_all_attendance()
        except:
            CommandError('Error in closing attendance records')

        self.stdout.write(self.style.SUCCESS('Successfully altered all attendance records'))

