# Base image olarak Node.js kullanıyoruz
FROM node:14

# Çalışma dizinini ayarlıyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# Bağımlılıkları yüklüyoruz
RUN npm install

# Uygulama kodunu kopyalıyoruz
COPY . .

# Uygulamayı derliyoruz
RUN npm run build

# Uygulamanın çalışacağı portu belirtiyoruz
EXPOSE 3000

# Uygulamayı başlatıyoruz
CMD ["npx", "serve", "-s", "build"]
