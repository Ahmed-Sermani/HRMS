from rest_framework.serializers import ModelSerializer, StringRelatedField
from ..models.Bank_Account import Bank_Account
from employee_dashboard.models.Employee_Extra_Info import Employee_Extra_Info
class BankAccountSerializer(ModelSerializer):

    employee = StringRelatedField()

    class Meta:
        model = Bank_Account
        fields = ['bank', 'card_number', 'id', 'employee']

    def create(self, validated_data):
        employee_email  = self.initial_data.get('employee')

        try:
            emp = Employee_Extra_Info.objects.get(employee__user__email = employee_email)
        except Employee_Extra_Info.DoesNotExit:
            return {
                'success': False,
                'message': 'No Such Employee'
            }
        bank = Bank_Account(**validated_data)
        bank.employee_extra_info = emp
        bank.save()

        return bank
    