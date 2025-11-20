from django.contrib import admin
from django.db.models import Avg, Count
from .models import Photo, Rating

class PhotoAdmin(admin.ModelAdmin):
    # Listede hangi sütunlar görünsün?
    list_display = ('title', 'uploaded_at', 'average_score_display', 'total_votes_display')
    
    # Hesaplamayı veritabanı seviyesinde yap (Performans için çok önemli)
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        # Her fotoğraf için 'ratings' tablosundaki 'score'ların ortalamasını al ve sayısını bul
        queryset = queryset.annotate(
            _average_score=Avg('ratings__score'),
            _total_votes=Count('ratings')
        )
        return queryset

    # Ortalama Puan Sütunu
    def average_score_display(self, obj):
        if obj._average_score:
            return round(obj._average_score, 1) # 4.6666 yerine 4.7 göster
        return 0
    average_score_display.short_description = "Ortalama Puan" # Sütun başlığı
    average_score_display.admin_order_field = '_average_score' # Tıklayınca sıralama yapabilsin

    # Toplam Oy Sütunu
    def total_votes_display(self, obj):
        return obj._total_votes
    total_votes_display.short_description = "Toplam Oy"
    total_votes_display.admin_order_field = '_total_votes'

# Modeli özel admin sınıfıyla kaydet
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Rating)