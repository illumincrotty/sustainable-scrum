from django.urls import path, include
from . import views

urlpatterns = [
    path('api/getdata/', views.susListCreate.as_view() ),
    path('api/getdata/Water', views.WaterListCreate.as_view() ),
    path('api/getdata/Gas', views.GasListCreate.as_view() ),
]
