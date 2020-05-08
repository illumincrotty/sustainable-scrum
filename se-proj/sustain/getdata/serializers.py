from rest_framework import serializers
from .models import *



class AllSerializer(serializers.ModelSerializer):
    class Meta:
        model = All
        fields = ('date', 'elec', 'water', 'gas')
