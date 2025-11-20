# Node.js 20 sürümünü temel al
FROM node:20-alpine

# Çalışma klasörünü ayarla
WORKDIR /app

# Paket listesini kopyala ve yükle
COPY package.json .
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# Vite sunucusunu başlat (--host parametresi Docker için şarttır)
CMD ["npm", "run", "dev", "--", "--host"]