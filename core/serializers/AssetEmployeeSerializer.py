from rest_framework.serializers import ModelSerializer
from core.models import Asset
class AssetEmployeeSerializer(ModelSerializer):

    class Meta:
        model = Asset
        fields = ['description', 'title', 'id', 'asset']