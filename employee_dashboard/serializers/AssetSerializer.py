from core.models import Asset, AssignedAsset
from rest_framework.serializers import ModelSerializer, SerializerMethodField

class AssetSerializer(ModelSerializer):
    assigned = SerializerMethodField()
    class Meta:
        model = Asset
        fields = '__all__'

    
    def get_assigned(self, obj):
        
        return obj.assignedasset.employee.user.email
