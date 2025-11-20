from rest_framework import serializers
from .models import Photo, Rating

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        # DİKKAT: Köşeli parantezler sadece bir kat olmalı
        fields = ['id', 'title', 'image', 'uploaded_at']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'photo', 'score']