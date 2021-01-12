from rest_framework.serializers import ModelSerializer, SerializerMethodField
from employee_dashboard.models.Shift_Subscription import Shift_Subscription
from employee_dashboard.models.Attendance import Attendance
from .ShiftSerializer import ShiftSerializer
from django.utils.timezone import now, localdate

class ShiftSubscriptionSerializer(ModelSerializer):
    shift = ShiftSerializer()
    checking_info_for_today = SerializerMethodField()

    class Meta:
        model =  Shift_Subscription
        fields = ('is_off_today', 'shift', 'checking_info_for_today')
    
    def get_checking_info_for_today(self, obj):
        result = {
            'checked_in': False,
            'checked_out': False,
            'checked_in_time': None,
            'checked_out_time': None
        }

        try:
            att = Attendance.objects.get(employee_extra_info_id = obj.employee_extra_info_id, attendance_date =localdate(now()) )
            result['checked_in'] = True
            result['checked_in_time'] = att.check_in.strftime('%H:%M:%S')

            if att.check_out is not None:
                result['checked_out'] = True
                result['checked_out_time'] = att.check_out.strftime('%H:%M:%S')
            return result

        except Attendance.DoesNotExist: 
            return result

