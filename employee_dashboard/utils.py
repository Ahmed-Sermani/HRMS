from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from uuid import uuid4
import os
import functools


def media_uploader(directory: str):
    directory = directory
    
    return functools.partial(upload , directory = directory)

def upload(instance, filename , directory):
        upload_to = directory
        ext = filename.split('.')[-1]
        # get filename
        if instance.pk:
            filename = '{}.{}'.format(instance.pk, ext)
        else:
            # set filename as random string
            filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(upload_to, filename)




def positive_validator(value):
    if value < 0.0:
        raise ValidationError(
            _('%(value)s is not an positive number'),
            params={'value': value},
        )


def days_of_week_string_validator(value):
    days_of_week = '0123456'
    if not value.isdecimal():
        raise ValidationError(
            "invalid days_of_week the allowed charactor is {0}".format(days_of_week))
    for x in value:
        if int(x) > 7:
            raise ValidationError(
                "invalid days_of_week the allowed charactor is {0}".format(days_of_week))


def map_dayweek(dayweek):
    return (dayweek + 2) % 7


def validate_longitude(value):
    try:
        lo = float(value)
        if not(lo <= 180.0 and lo > -180.0):
            raise ValidationError('the longitude must be between 180 and -180')
    except ValueError as e:
        raise ValidationError('plesae provide flat number for longitude')


def validate_latitude(value):
    try:
        lo = float(value)
        if not(lo <= 90.0 and lo > -90.0):
            raise ValidationError('the longitude must be between 90 and -90')
    except ValueError as e:
        raise ValidationError('plesae provide float number for latitude')


def validate_polygon(value):
    import json
    try:
        polygon = json.loads(value)
    except json.JSONDecodeError:
        raise ValidationError('Please provide valid JSON data for polygon')
    try:
        if isinstance(polygon, list):
            for point in polygon:
                if not (isinstance(point, dict) and len(point) == 2):
                    raise ValidationError()
                validate_longitude(point['lng'])
                validate_latitude(point['lat'])
        else:
            raise ValidationError()
    except:
        raise ValidationError("""please provide correct data structure for polygon note
                                 that it has to contain attribute [points] which is
                                 array of points where each point is dict consisting 
                                 of two fields lng and lat""")
