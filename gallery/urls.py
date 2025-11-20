from django.urls import path
from .views import PhotoList , RatingCreate

urlpatterns = [
    path('photos/', PhotoList.as_view(), name='photo-list'),
    path('rate/', RatingCreate.as_view(), name='rating-create'), # Yeni yol
]