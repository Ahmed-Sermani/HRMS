# Generated by Django 3.0.9 on 2020-09-20 15:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee_dashboard', '0008_auto_20200919_1836'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='attendance_date',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='notification',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2020, 9, 20, 18, 1, 11, 887887)),
        ),
    ]