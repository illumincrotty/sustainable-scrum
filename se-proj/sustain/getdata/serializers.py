from rest_framework import serializers
from .models import *


class susSerializer(serializers.ModelSerializer):
    class Meta:
        model = sus
        fields = ('building', 'year', 'util', 'meas')

class AllSerializer(serializers.ModelSerializer):
    class Meta:
        model = All
        fields = ('date', 'elec', 'water', 'gas')
