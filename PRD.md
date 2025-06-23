# Product Requirements Document (PRD): Kostku

## 1. Pendahuluan & Latar Belakang
Mencari kamar kost yang sesuai adalah salah satu tantangan terbesar bagi jutaan mahasiswa di Indonesia setiap tahun ajaran baru, terutama bagi mereka yang berasal dari luar kota. Proses pencarian saat ini sangat terfragmentasi, tidak efisien, dan kurang transparan. Mahasiswa seringkali bergantung pada informasi dari mulut ke mulut, spanduk fisik, atau grup media sosial yang tidak terverifikasi.

Di sisi lain, pemilik kost juga menghadapi kesulitan dalam memasarkan properti mereka secara efektif dan mengelola penyewa dengan cara yang modern.

**Kostku** hadir sebagai platform digital yang dirancang untuk menjembatani kesenjangan ini. Dengan mengadopsi model bisnis yang terbukti sukses dari Airbnb, **Kostku** bertujuan menjadi platform terpusat, terpercaya, dan mudah digunakan bagi mahasiswa untuk menemukan dan memesan kamar kost, serta bagi pemilik kost untuk mengelola dan memasarkan properti mereka.

---

## 2. Identifikasi Masalah

### 2.1. Untuk Mahasiswa (Pencari Kost)
- **Informasi Tidak Lengkap & Tidak Standar**  
  Sulit menemukan informasi detail seperti foto asli, fasilitas lengkap, harga pasti, dan ketersediaan kamar.
- **Risiko Penipuan**  
  Tidak ada jaminan bahwa informasi yang diberikan akurat, meningkatkan risiko penipuan atau "kost tidak sesuai ekspektasi".
- **Proses yang Melelahkan**  
  Harus mengunjungi banyak lokasi secara fisik (survei) yang memakan waktu, tenaga, dan biaya.

### 2.2. Untuk Pemilik Kost
- **Pemasaran Terbatas**  
  Jangkauan pemasaran hanya terbatas pada area sekitar atau metode konvensional (spanduk, calo) yang tidak efisien.
- **Manajemen Manual**  
  Proses pemesanan, pembayaran, dan komunikasi dengan calon penyewa dilakukan secara manual melalui telepon atau WhatsApp, yang rentan terhadap kesalahan.
- **Kesulitan Menjaga Okupansi**  
  Kamar seringkali kosong karena kesulitan menjangkau target pasar yang lebih luas.
- **Tidak Ada Cara Membangun Reputasi**  
  Sulit untuk menunjukkan bahwa mereka adalah pemilik kost yang baik dan terpercaya secara online.

---

## 3. Solusi yang Diusulkan
**Kostku** adalah sebuah platform web dua sisi (*two-sided marketplace*) yang menyediakan:

- **Mesin Pencari Kost yang Komprehensif**  
  Memungkinkan mahasiswa mencari kost berdasarkan lokasi (universitas, area), harga, fasilitas, tipe kost (putra/putri/campur), dan lainnya.
  
- **Halaman Properti yang Terverifikasi**  
  Setiap listing akan memiliki foto, deskripsi detail, daftar fasilitas terstandar, dan peta lokasi yang jelas.
  
- **Dashboard Manajemen untuk Pemilik Kost**  
  Alat yang mudah digunakan bagi pemilik kost untuk mengelola listing, ketersediaan kamar, pesanan, dan pendapatan mereka.

---

## 4. Target Pengguna (User Personas)

### 4.1. Persona Mahasiswa: Budi Santoso
- **Demografi:** 18 tahun, calon mahasiswa baru dari luar kota.
- **Tujuan:** Mencari kost yang aman, bersih, dekat dengan kampus, dengan budget Rp 800.000 - Rp 1.500.000 per bulan.
- **Frustrasi:** "Saya tidak kenal siapa-siapa di kota ini. Saya takut salah pilih kost atau ditipu. Saya butuh informasi yang jujur dan lengkap."

### 4.2. Persona Pemilik Kost: Ibu Aisyah
- **Demografi:** 52 tahun, memiliki 12 kamar kost di dekat kampus besar.
- **Tujuan:** Memastikan semua kamarnya terisi oleh penyewa yang baik dan pembayaran sewa selalu lancar.
- **Frustrasi:** "Capek menjawab pertanyaan yang sama berulang-ulang di WhatsApp. Kadang ada yang sudah janji mau lihat, tapi tidak datang. Saya ingin cara yang lebih praktis."

---

## 5. Fitur Utama (Features)

### 5.1. Untuk Mahasiswa (Pencari Kost)

**Pendaftaran & Profil Pengguna:**
- Mendaftar menggunakan email atau akun Google.
- Profil dasar (nama, foto, universitas).

**Pencarian & Filter:**
- Bar pencarian berdasarkan nama universitas atau area.
- Filter: Harga (min-max), Tipe Kost (Putra, Putri, Campur), Fasilitas (AC, WiFi, Kamar Mandi Dalam, dll.), Durasi Sewa (Bulanan, Tahunan).

**Halaman Detail Kost:**
- Galeri foto dan video (jika ada).
- Deskripsi lengkap dari pemilik.
- Rincian harga (per bulan, per tahun, biaya tambahan).
- Kalender ketersediaan kamar.
- Aturan kost.
- Profil singkat pemilik kost.
- Ulasan dan rating dari penghuni sebelumnya.

**Proses Booking:**
- Tombol "Booking Sekarang" atau "Hubungi Pemilik".
- Formulir pemesanan (pilih tanggal masuk).
- Status booking (Menunggu Konfirmasi, Dikonfirmasi, Ditolak).

**Fitur Pendukung:**
- Sistem perpesanan (messaging) untuk berkomunikasi dengan pemilik kost.
- Notifikasi (email/push) untuk status booking dan pesan baru.

### 5.2. Untuk Pemilik Kost

**Pendaftaran & Profil Pemilik:**
- Profil pemilik (nama, foto, nomor telepon terverifikasi).

**Dashboard Manajemen:**
- Manajemen Booking: Melihat, menerima, atau menolak permintaan booking dari mahasiswa.

**Fitur Pendukung:**
- Sistem perpesanan (messaging) untuk menjawab pertanyaan calon penyewa.

---

## 6. Alur Pengguna (User Flow)

### Alur Mahasiswa:
1. Cari Kost  
2. Filter  
3. Lihat Detail Kost  
4. *(Opsional)* Kirim Pesan ke Pemilik  
5. Klik Booking  
6. Bayar  
7. Dapatkan Konfirmasi  
8. Check-in  
9. Beri Ulasan

### Alur Pemilik Kost:
1. Daftar  
2. Buat Listing Kost  
3. Dapatkan Notifikasi Permintaan Booking  
4. Terima Permintaan  
5. Dapatkan Notifikasi Pembayaran Sukses  
6. Koordinasi Check-in dengan Mahasiswa  
7. Terima Dana

---

## 7. Rilis Awal (Minimum Viable Product - MVP)

### Fitur MVP untuk Mahasiswa:
- Pencarian dengan filter dasar (lokasi, harga, tipe).
- Lihat halaman detail kost.
- Login/Register.

### Fitur MVP untuk Pemilik Kost:
- Login/Register.
- Membuat dan mengedit listing kost.
- Menerima dan menolak permintaan booking.
