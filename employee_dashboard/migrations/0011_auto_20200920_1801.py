# Generated by Django 3.0.9 on 2020-09-20 15:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee_dashboard', '0010_auto_20200920_1801'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2020, 9, 20, 18, 1, 32, 57917)),
        ),
    ]