# Interactive Dashboard – Technical Test Submission

Ini adalah hasil pengerjaan Frontend Skill Test berupa **dashboard interaktif** menggunakan Next.js (App Router), TypeScript, dan Tailwind CSS. Data diambil dari DummyJSON API untuk visualisasi produk, resep, transaksi, dan post.

---

## ▶️ Cara Menjalankan Project

### **Via Local Development**
```bash
# 1. Clone repo
git clone https://github.com/username/interactive-dashboard-agung.git
cd interactive-dashboard-agung

# 2. Install dependencies
npm install

# 3. Jalankan dalam mode development
npm run dev

# Akses di: http://localhost:3000
```

### **Via Docker Compose**

Pertama-tama, buka docker terlebih dahulu di komputer anda. Lalu jalankan perintah berikut.
```bash
# 1. Build next app
docker compose build --no-cache

# 2. Run Docker
docker compose up

# Akses di: http://localhost:3000
```

---

## Halaman yang Sudah Selesai
| Halaman         | Status | Fitur                                                      |
| --------------- | ------ | ---------------------------------------------------------- |
| `/` (Dashboard) | ✅      | Summary Cards, Chart Visualisasi, Navigasi                 |
| `/produk`       | ✅      | Search produk (debounce), Sort harga & rating, Pagination  |
| `/recipes`      | ✅      | Total resep, filter by tag & meal, visualisasi by tag/meal |
| `/carts`        | ✅      | Detail transaksi: ID, item, harga, diskon                  |

---

## Teknologi Tambahan yang Digunakan

* **lucide-react**: Icon library untuk UI modern
* **lodash.debounce**: Untuk optimasi input pencarian (debounced search)

---

## 📦 Tech Stack Utama

* **Next.js 15 (App Router + TypeScript)**
* **Tailwind CSS**
* **Chart.js** (untuk visualisasi data)
* **Axios** (fetching API)
* **Docker + Docker Compose**

---

## Author

I Gusti Agung Agastya Tarumawijaya
[LinkedIn](https://www.linkedin.com/in/agunggst) | [GitHub](https://github.com/agunggst)

---