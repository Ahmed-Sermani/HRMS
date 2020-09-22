from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from uuid import uuid4
import os


# rename uploaded Images
def _path_and_rename_profile_img(instance, filename):
    upload_to = 'profile_imgs'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)


# rename uploaded file
def _path_and_rename_contract_file(instance, filename):
    upload_to = 'contracts'
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
    days_of_week = '1234567'
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
        polygon = json.loads
    except json.JSONDecodeError:
        raise ValidationError('Please provide valid JSON data for polygon')
    try:
        if isinstance(polygon.points, list):
            for point in polygon.points:
                if not (isinstance(point, list) and len(point) == 2):
                    raise ValidationError()
                validate_longitude(point[1])
                validate_latitude(point[0])
        else:
            raise ValidationError()
    except:
        raise ValidationError("""please provide correct data structure for polygon note
                                 note that it has to container attribute [points] which is
                                 array of points where each point is array of length 2 with
                                 string data that convertable to float and valid [long,lat]""")
