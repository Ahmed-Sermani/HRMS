from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from uuid import uuid4
import os




#rename uploaded Images
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



#rename uploaded file
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
   days_of_week = 'SMTWHFA'
   for day in value.upper():
       if day not in days_of_week:
           raise ValidationError("invalid days_of_week the allowed charactor is {0}".format(days_of_week))
    
    