from django.db import models

# Create your models here.

class sus(models.Model):
    building = models.CharField(max_length = 200)
    year = models.IntegerField()
    util = models.CharField(max_length = 50)
    meas = models.FloatField()
