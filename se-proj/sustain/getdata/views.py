from django.shortcuts import render
from django.db.models import Sum, Max
from .models import sus
from .serializers import susSerializer
from rest_framework import generics
# Create your views here.




class susListCreate(generics.ListCreateAPIView):
    queryset = sus.objects.all()
    serializer_class = susSerializer

class WaterListCreate(generics.ListCreateAPIView):
    queryset = sus.objects.filter(util="Water").values('year').annotate(meas=Sum('meas'),building=Max('building'),util=Max('util')).order_by('year')
    serializer_class = susSerializer

class GasListCreate(generics.ListCreateAPIView):
    queryset = sus.objects.filter(util="Gas").values('year').annotate(meas=Sum('meas'),building=Max('building'),util=Max('util')).order_by('year')
    serializer_class = susSerializer
