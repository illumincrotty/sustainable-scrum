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
    queryset = All.objects.filter(util="Water").values('date').annotate(meas=Sum('meas'), util=Max('util')).order_by('date')
    serializer_class = AllSerializer

class GasListCreate(generics.ListCreateAPIView):
    queryset = All.objects.filter(util="Gas").values('date').annotate(meas=Sum('meas'),util=Max('util')).order_by('date')
    serializer_class = AllSerializer

class ElecListCreate(generics.ListCreateAPIView):
    queryset = All.objects.filter(util="Electric").values('date').annotate(meas=Sum('meas'),util=Max('util')).order_by('date')
    serializer_class = AllSerializer
