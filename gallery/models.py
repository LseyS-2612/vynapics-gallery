from django.db import models

class Photo(models.Model):
    title = models.CharField(max_length=100, verbose_name="Fotoğraf Başlığı")
    image = models.ImageField(upload_to='photos/', verbose_name="Fotoğraf Dosyası")
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Yüklenme Tarihi")

    def __str__(self):
        return self.title
    


class Rating(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='ratings')
    score = models.IntegerField(choices=[(i, i) for i in range(1, 6)]) # 1-5 arası puan
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.photo.title} - {self.score} Puan"