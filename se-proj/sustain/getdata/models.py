from django.db import models

# Create your models here.

class sus(models.Model):
    building = models.CharField(max_length = 200)
    year = models.IntegerField()
    util = models.CharField(max_length = 50)
    meas = models.FloatField()


class All(models.Model):
    date = models.CharField(max_length=50)
    elec = models.IntegerField()
    water = models.IntegerField()
    gas = models.IntegerField()

class Building(models.Model):
    building = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    electric = models.IntegerField()
    water = models.IntegerField()
    gas = models.IntegerField()
