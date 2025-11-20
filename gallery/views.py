from rest_framework import generics
from .models import Photo, Rating
from .serializers import PhotoSerializer, RatingSerializer

# Mevcut PhotoList sınıfın burada kalsın...
class PhotoList(generics.ListAPIView):
    queryset = Photo.objects.all().order_by('-uploaded_at')
    serializer_class = PhotoSerializer

# YENİ EKLE: Puan Verme İşlemi
class RatingCreate(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer