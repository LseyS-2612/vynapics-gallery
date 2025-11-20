# Python 3.13 sürümünü temel al
FROM python:3.13-slim

# Çalışma klasörünü ayarla
WORKDIR /app

# Gerekli kütüphaneleri kopyala ve yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Tüm proje dosyalarını kopyala
COPY . .

# ZORUNLU DEĞİŞİKLİK: Migrate yap, Admin oluştur ve Gunicorn'u başlat
CMD sh -c "python manage.py migrate && python manage.py shell -c 'from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username=\"admin\").exists() or User.objects.create_superuser(\"admin\", \"admin@example.com\", \"admin123\")' && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"git