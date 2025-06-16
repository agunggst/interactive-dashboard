# Gunakan image Node resmi
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Salin semua file ke container
COPY . .

# Install dependencies
RUN npm install

# Build project
RUN npm run build

# Jalankan production server
EXPOSE 3000
CMD ["npm", "start"]