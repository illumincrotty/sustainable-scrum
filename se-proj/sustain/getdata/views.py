from django.shortcuts import render
from django.db.models import Sum, Max
from .models import *
from .serializers import *
from rest_framework import generics
# Create your views here.




class susListCreate(generics.ListCreateAPIView):
    queryset = All.objects.all()
    serializer_class = AllSerializer
