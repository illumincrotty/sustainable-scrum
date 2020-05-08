from django.db import models

# Create your models here.

class All(models.Model):
    date = models.CharField(max_length=50)
    elec = models.IntegerField()
    water = models.IntegerField()
    gas = models.IntegerField()
