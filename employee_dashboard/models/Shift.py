from django.db import models
from employee_dashboard.utils import days_of_week_string_validator , validate_polygon
from shapely.geometry import Point , Polygon
import json

class Shift(models.Model):

    name = models.CharField(max_length = 300)

    _from = models.TimeField()

    to  = models.TimeField()
    
    
    """
    this will be like '0123456'
    0 = Saturday
    1 = Sunday
    2 = Monday
    3 = Tuesday
    4 = Wensday
    5 = Thursday
    6 = Friday
    

    will validate this by field validator
    """
    days_of_week = models.CharField(
        max_length=7,
        validators=[days_of_week_string_validator]
        )
    
    # the zone that the employee had to attend at
    # stored as string of JSON of polygon points
    polygon = models.TextField(
        validators=[validate_polygon]
    )

    def is_point_within_polygon(self , longitude , latitude):
        point = Point(latitude , longitude )

        polygon = Polygon(json.loads(self.polygon))

        return point.within(polygon.points)





    def __str__(self):
        return str(self.id)
