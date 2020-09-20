from django.contrib import admin
from .models import Notification,\
    Employee_Extra_Info ,\
    Contract ,\
    Salary , \
    Attendance ,\
    Shift ,\
    Shift_Subscription


# Register models to admin board
admin.site.register(Notification)
admin.site.register(Employee_Extra_Info)
admin.site.register(Contract)
admin.site.register(Salary)
admin.site.register(Attendance)
admin.site.register(Shift)
admin.site.register(Shift_Subscription)