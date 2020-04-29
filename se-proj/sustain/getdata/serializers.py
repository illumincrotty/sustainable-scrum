from rest_framework import serializers
from .models import sus


class susSerializer(serializers.ModelSerializer):
    class Meta:
        model = sus
        fields = ('building', 'year', 'util', 'meas')
