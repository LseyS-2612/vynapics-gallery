# Python 3.13 sürümünü temel al
FROM python:3.13-slim

# Çalışma klasörünü ayarla
WORKDIR /app

# Gerekli kütüphaneleri kopyala ve yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Tüm proje dosyalarını kopyala
COPY . .

# Sunucuyu başlat (0.0.0.0 dışarıdan erişime izin verir)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]