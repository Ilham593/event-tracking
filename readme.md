# 🎟️ TiketinAja - Backend API

Aplikasi RESTful API untuk pembelian tiket event (konser, seminar, dll) menggunakan stack **Node.js, Express, MongoDB**.

---

## 📌 Fitur Utama

- Register & Login User (JWT)
- Lihat daftar event dan detail event
- Pesan tiket sesuai tipe (VIP, Reguler)
- Riwayat pesanan user

---

## 🧰 Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + Bcrypt
- **Testing:** Postman / Thunder Client
- **Deploy:** (opsional) Render / Railway / Vercel serverless API

---

## 🗂️ Struktur Proyek

```

/backend
/models          # Skema database (User, Event, Order)
/controllers     # Logika bisnis untuk API
/routes          # Endpoint Express
/middleware      # JWT Auth, error handler
/config          # Setup MongoDB
server.js        # Entry point aplikasi

````

---

## ⚙️ Instalasi & Setup

1. **Clone repo**
   ```bash
   git clone ""
   cd ""
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Buat file `.env`**

   ```env
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Jalankan server**

   ```bash
   npm run dev
   ```

---

## 🔑 Autentikasi (JWT)

Setelah login, token harus dikirim lewat header:

```
Authorization: Bearer <your_token>
```

---

## 📬 API Endpoint

### 🔐 Auth

| Method | URL           | Deskripsi       |
| ------ | ------------- | --------------- |
| POST   | /api/register | Register user   |
| POST   | /api/login    | Login user      |
| GET    | /api/profile  | Lihat data user |

---

### 🎫 Event

| Method | URL              | Deskripsi            |
| ------ | ---------------- | -------------------- |
| GET    | /api/events      | Ambil semua event    |
| GET    | /api/events/\:id | Ambil detail event   |
| POST   | /api/events      | Tambah event (admin) |

---

### 📦 Order

| Method | URL            | Deskripsi          |
| ------ | -------------- | ------------------ |
| POST   | /api/orders    | Pesan tiket        |
| GET    | /api/orders/me | Riwayat order user |

---

## 📄 Contoh Skema MongoDB

### 🔹 User

```js
{
  name: String,
  email: String,
  password: String (hashed),
  role: String ("user" | "admin")
}
```

### 🔹 Event

```js
{
  title: String,
  description: String,
  date: Date,
  location: String,
  price: Number,
  quota: Number,
  image: String
}

```

### 🔹 Order

```js
{
  userId: ObjectId,
  eventId: ObjectId,
  ticketType: String,
  quantity: Number,
  totalPrice: Number,
  status: String, // "pending" | "paid"
  createdAt: Date
}
```

---

## 🧪 Tes API

Gunakan [Postman](https://www.postman.com/) atau \[Thunder Client (VSCode)] untuk menguji endpoint. Token JWT harus disertakan untuk endpoint yang butuh autentikasi.

---

## 🚀 Deployment

Untuk deploy ke Render:

* Tambahkan environment variable di dashboard
* Jalankan `npm start` di Production

---

## 🧑‍💻 Author

Made with ❤️ by \[ilham593]

---

## 📃 Lisensi

MIT License
