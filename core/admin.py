from django.contrib import admin

from core.models import User, Employer, Employee, Asset, AssignedAsset

class UserAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.set_password(obj.password)
        super().save_model(request, obj, form, change)


admin.site.register(User, UserAdmin)
admin.site.register(Employer)
admin.site.register(Employee)
admin.site.register(Asset)
admin.site.register(AssignedAsset)