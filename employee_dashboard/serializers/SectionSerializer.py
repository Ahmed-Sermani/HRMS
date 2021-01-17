from rest_framework.serializers import ModelSerializer, StringRelatedField
from employee_dashboard.models.Section import Section, Department
from django.db import transaction
class SectionSerializer(ModelSerializer):
    department = StringRelatedField()
    class Meta:
        model = Section
        fields = '__all__'
    
    def create(self, validated_data):
        dept_name = self.initial_data.get('department')
        
        dept = Department()
        dept.name = dept_name
        section = Section(**validated_data)
        section.department = dept

        with transaction.atomic():
            dept.save()
            section.save()
            
        return section