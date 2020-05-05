from django.shortcuts import render
from django.db.models import Sum, Max
from .models import *
from .serializers import *
from rest_framework import generics
# Create your views here.




class susListCreate(generics.ListCreateAPIView):
    queryset = All.objects.all()
    serializer_class = AllSerializer

class WaterListCreate(generics.ListCreateAPIView):
    queryset = All.objects.values('date', 'water')
    serializer_class = AllSerializer

class GasListCreate(generics.ListCreateAPIView):
    queryset = All.objects.values('date', 'gas')
    serializer_class = AllSerializer

class ElecListCreate(generics.ListCreateAPIView):
    #queryset = All.objects.filter(util="Electric").values('date').annotate(meas=Sum('meas'),util=Max('util')).order_by('date')
    queryset = All.objects.values('date', 'elec')
    serializer_class = AllSerializer
