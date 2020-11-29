# Generated by Django 3.0.9 on 2020-11-17 17:41

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import employee_dashboard.utils
import functools


class Migration(migrations.Migration):

    dependencies = [
        ('employee_dashboard', '0016_auto_20201117_1952'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee_extra_info',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=functools.partial(employee_dashboard.utils.upload, *(), **{'directory': 'profile_imgs'})),
        ),
        migrations.AlterField(
            model_name='notification',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 17, 20, 41, 15, 775838)),
        ),
        migrations.AlterField(
            model_name='report',
            name='employee_extra_info',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='employee_dashboard.Employee_Extra_Info'),
        ),
        migrations.AlterField(
            model_name='report',
            name='submission_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]