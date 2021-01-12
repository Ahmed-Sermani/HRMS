from rest_framework.serializers import ModelSerializer
from ..models.Bank_Account import Bank_Account
class BankAccountSerializer(ModelSerializer):

    class Meta:
        model = Bank_Account
        fields = ['bank', 'card_number']

    