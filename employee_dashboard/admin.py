from django.contrib import admin
from .models import Attendance ,\
   Notification ,\
   Employee_Extra_Info ,\
   Contract ,\
   Salary ,\
   Shift ,\
   Shift_Subscription,\
   Report


# Register models to admin board
admin.site.register(Notification.Notification)
admin.site.register(Employee_Extra_Info.Employee_Extra_Info)
admin.site.register(Contract.Contract)
admin.site.register(Salary.Salary)
admin.site.register(Attendance.Attendance)
admin.site.register(Shift.Shift)
admin.site.register(Shift_Subscription.Shift_Subscription)
admin.site.register(Report.Report)