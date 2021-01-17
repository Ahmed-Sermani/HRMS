from rest_framework.serializers import ModelSerializer, StringRelatedField
from ..models.Bank_Account import Bank_Account
from employee_dashboard.models.Employee_Extra_Info import Employee_Extra_Info
from rest_framework.response import Response
class BankAccountSerializer(ModelSerializer):

    employee = StringRelatedField(source = 'employee_extra_info.__str__')

    class Meta:
        model = Bank_Account
        fields = ['bank', 'card_number', 'id', 'employee']

    def create(self, validated_data):
        employee_email  = self.initial_data.get('employee')

        emp = Employee_Extra_Info.objects.get(employee__user__email = employee_email)

        bank = Bank_Account(**validated_data)
        bank.employee_extra_info = emp
        bank.save()

        return bank
    