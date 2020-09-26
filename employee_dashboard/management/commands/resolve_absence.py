from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from django.conf import settings
from employee_dashboard.models import Attendance, Shift_Subscription, Employee_Extra_Info


class Command(BaseCommand):
    help = """
    this command will resolve all the absence in attendance 
    according to each employee shift
    """

    def handle(self, *args, **options):

        call_command('checkout_all_attendance')

        # get all employee that checked in today
        checked_in = Attendance.objects.get_checked_in()

        # look to there shift to see if their are ok
        for attend in checked_in:

            shift_subscription = Shift_Subscription.objects.get(
                employee_extra_info=attend.employee_extra_info
                )
            _from = shift_subscription.shift._from
            to = shift_subscription.shift.to

        
            # check how many hours the employee is late and compare if with
            # the allowed number of hours from the settings
            # I considered the minutes as not important
            number_of_late_hours = (attend.check_in.hour - _from.hour) if attend.check_in >= _from else 0
            # zero then perfect timing or exceeded
            number_of_late_hours += (to.hour - attend.check_out.hour) if attend.check_out <= to else 0

            # now check for the number of hours allowed in the setting if exceeded then consider it absent

            if number_of_late_hours >= settings.HOURS_LATE and (not shift_subscription.is_off_today()):

                attend.status = 'Absent'
            else:
                attend.status = 'Present'
            attend.save()

        # lastly the employee the does not present in the list create attendance record and make then absent

        # TODO: when time off implemented add employee attendance record with 'on leave' status

        absent_employees = Employee_Extra_Info.objects.all().exclude(
            pk__in=checked_in.values_list('employee_extra_info', flat=True)
        )

        now = timezone.now().time()

        for employee in absent_employees:

            shift_subscription = Shift_Subscription.objects.get( employee_extra_info = employee )
            
            Attendance.objects.create(
                employee_extra_info = employee,
                check_in = now,
                check_out = now,
                status = 'Present' if shift_subscription.is_off_today() else 'Absent'

            )

        self.stdout.write(self.style.SUCCESS('Successfully All Absence Scheduled'))
