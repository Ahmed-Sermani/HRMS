# Generated by Django 3.0.9 on 2020-11-17 17:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee_dashboard', '0017_auto_20201117_2041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 17, 20, 42, 56, 917127)),
        ),
    ]
