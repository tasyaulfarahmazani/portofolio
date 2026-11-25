# 👑 Royal Manhwa Portfolio — Tasya Ulfa Rahmazani (Sya)

> **Fullstack Software & Systems Engineer**  
> Mahasiswi D-IV Teknik Informatika — Politeknik Negeri Lhokseumawe (PNL)  
> Ketua Departemen Kesejahteraan Mahasiswa (KESMA) Himpunan Mahasiswa Jurusan TIK (2025–2026)

Portofolio web interaktif dengan perpaduan estetika **Korean Royal Webtoon (Manhwa Kerajaan)** berlatar istana emas & obsidian modern, dipadukan dengan standar portofolio profesional untuk rekrutmen HRD dan klien industri.

---

## 🏛️ Arsitektur Proyek (Fullstack Architecture)

Proyek ini dibangun dengan struktur modular yang memisahkan **Frontend** dan **Backend API**:

```
portofolio/
├── backend/                  # 🛡️ RESTful API Server (Node.js & Express)
│   ├── server.js             # API Endpoints (/api/contact, /api/health, /api/messages)
│   ├── messages.json         # Penyimpanan database pesan masuk HRD/Klien
│   ├── .env                  # Port dan konfigurasi environment backend
│   └── package.json          # Dependencies backend (express, cors, dotenv, nodemailer)
│
├── public/                   # 🎨 Aset Statis & Gambar
│   ├── images/
│   │   ├── tasya-almamater.png      # Foto resmi almamater kuning PNL (Hero Character)
│   │   └── tasya-cute-sticker.png   # Stiker chibi interaktif Sya (Reaction Badge)
│
├── src/                      # ⚡ Frontend Web Application (React + Tailwind)
│   ├── App.jsx               # Komponen utama portofolio & animasi interaktif
│   ├── index.css             # Tema Royal Gold, custom scrollbar & border manhwa
│   └── main.jsx              # Titik masuk React
│
├── index.html                # Tipografi Google Fonts (Cinzel, Plus Jakarta Sans, Bangers)
├── tailwind.config.js        # Konfigurasi palet warna Royal (#dfb15b, #080c14, dll.)
├── package.json              # Dependencies frontend (react, tailwindcss, lucide-react, confetti)
└── README.md                 # Dokumentasi proyek lengkap
```

---

## ✨ Fitur-Fitur Unggulan

1. **👑 Korean Royal Manhwa Theme (Editorial Webtoon)**:
   - Palet warna mewah: *Imperial Obsidian*, *Champagne Gold*, *Deep Emerald*, dan *Rose Velvet*.
   - Animasi partikel cahaya & kelopak bunga emas melayang (*Golden Ambient Sparkles*).
   - Efek teks kilau emas berjalan (*Shimmering Text Gradient*).
   - Tipografi serif istana (*Cinzel*) dipadu sans-serif modern (*Plus Jakarta Sans*) agar mudah dibaca recruiter.

2. **🎀 Interactive Chibi Sya Sticker (Reaction Bubble)**:
   - Stiker imut Sya melayang di pojok foto utama dengan animasi goyang (*wiggle*).
   - Balon dialog interaktif yang berganti-ganti pesan ramah setiap kali di-klik, disertai efek semburan konfeti emas (*golden confetti*).

3. **📊 Specialization Analysis (Jawaban Keahlian HRD)**:
   - **Core**: *Fullstack & Business Systems* (Laravel, PHP, MySQL, REST API, POS, CRUD).
   - **Infrastructure**: *Network Monitoring & Linux Server Administration* (SNMP, Server Hardening, Real-time Alerting).
   - **Applied Tech**: *Applied AI & Modern Mobile* (Python, YOLO Object Detection, Computer Vision, Flutter).

4. **💼 Showcase 8 Proyek Nyata & Terverifikasi (Interactive Filter Tabs)**:
   - *Sistem Monitoring Jaringan & Deteksi Gangguan (Internship)*
   - *Sistem Pendaftaran & Seleksi Anak Magang (Internship Portal)*
   - *Sistem Manajemen Penjualan & Kasir (Point of Sale - POS)*
   - *Beauty Store Platform (Laravel Web + Flutter Mobile App)*
   - *E-Archive School Web Application (CRUD Digitalization)*
   - *Seat Belt Detection System (YOLO Computer Vision + Audio Alert)*
   - *Tomato Leaf Disease Classification (Akurasi 97%)*
   - *Server & Security Infrastructure Management (Linux/Windows & IoT)*

5. **🏆 Timeline Organisasi Padat & Berbobot**:
   - Menyorot peran **Ketua Acara (Event Project Leader)** dan **Sekretaris Pelaksana (Lead Secretary)** dalam program kerja bernilai puluhan juta rupiah (seperti RevolTIK dengan anggaran Rp 44,5 Juta).

6. **📬 Form Kontak Terintegrasi ke Backend API**:
   - HRD dan klien dapat langsung mengirim pesan dari formulir di web.
   - Pesan langsung diproses oleh Express API dan dicatat ke `backend/messages.json`.

---

## 🚀 Panduan Menjalankan Proyek (Local Setup)

### 1. Menjalankan Frontend
Pastikan terminal berada di root folder `d:\project\portofolio`:
```bash
# Instalasi dependencies (jika belum)
npm install

# Jalankan server frontend Vite
npm run dev
```
Buka browser di: **`http://localhost:5173`**

### 2. Menjalankan Backend API
Buka terminal baru, masuk ke folder backend:
```bash
cd backend

# Instalasi dependencies backend
npm install

# Jalankan server Express
npm run dev
# atau: node server.js
```
Backend akan aktif di: **`http://localhost:5000`**  
Cek status API di: `http://localhost:5000/api/health`

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS 3, Lucide React, Canvas Confetti.
- **Backend**: Node.js, Express.js, CORS, Dotenv, File-system Storage.
- **Fonts**: *Cinzel* (Google Fonts), *Plus Jakarta Sans*, *Bangers*.
- **Tools**: Git, GitHub, VS Code, Postman.

---

## 👤 Kontak & Profil

- **Nama**: Tasya Ulfa Rahmazani (Sya)
- **Email**: [tasyaulfarahmazani03@gmail.com](mailto:tasyaulfarahmazani03@gmail.com)
- **LinkedIn**: [linkedin.com/in/syaa031104](https://www.linkedin.com/in/syaa031104)
- **GitHub**: [github.com/tasyaulfarahmazani](https://github.com/tasyaulfarahmazani)
- **Instagram**: [instagram.com/sya.lfarmdhni](https://www.instagram.com/sya.lfarmdhni/)
- **Kampus**: Politeknik Negeri Lhokseumawe — D-IV Teknik Informatika

---
*© 2026 Tasya Ulfa Rahmazani. Designed with Royal Manhwa Elegance & Engineering Rigor.*
