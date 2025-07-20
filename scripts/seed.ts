import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Konfigurasi Supabase dari environment variables
// Pastikan Anda membuat file .env di root proyek dengan variabel ini
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL and Service Key must be defined in .env file');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const kostData = [
  {
    nama: 'Kost Sari Asih',
    alamat: 'Tembalang, Semarang',
    harga: 1200000,
    tipe: 'putri' as const,
    rating: 4.8,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Dapur Bersama', 'Parkir Motor'],
    deskripsi: 'Kost putri eksklusif dengan fasilitas lengkap di lokasi strategis Tembalang.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Ibu Sari',
    telepon_pemilik: '081234567890',
  },
  {
    nama: 'Kost Mandiri Jaya',
    alamat: 'Undip, Semarang',
    harga: 1500000,
    tipe: 'putra' as const,
    rating: 4.6,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Laundry'],
    deskripsi: 'Kost putra modern dekat kampus Undip, cocok untuk mahasiswa.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Bapak Jaya',
    telepon_pemilik: '081234567891',
  },
  {
    nama: 'Kost Graha Indah',
    alamat: 'Pleburan, Semarang',
    harga: 900000,
    tipe: 'campur' as const,
    rating: 4.3,
    fasilitas: ['WiFi', 'Kamar Mandi Luar', 'Dapur Bersama'],
    deskripsi: 'Kost campur nyaman dan terjangkau di pusat kota Pleburan.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Ibu Indah',
    telepon_pemilik: '081234567892',
  },
  {
    nama: 'Kost Mawar Putih',
    alamat: 'Ngaliyan, Semarang',
    harga: 1100000,
    tipe: 'putri' as const,
    rating: 4.7,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Security 24 Jam'],
    deskripsi: 'Kost putri aman dan nyaman dengan keamanan 24 jam di Ngaliyan.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Ibu Mawar',
    telepon_pemilik: '081234567893',
  },
  {
    nama: 'Kost Putra Bangsa',
    alamat: 'Banyumanik, Semarang',
    harga: 1300000,
    tipe: 'putra' as const,
    rating: 4.5,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Gym', 'Parkir Motor'],
    deskripsi: 'Kost putra dengan fasilitas gym di area Banyumanik yang sejuk.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Bapak Bangsa',
    telepon_pemilik: '081234567894',
  },
  {
    nama: 'Kost Keluarga Bahagia',
    alamat: 'Gayamsari, Semarang',
    harga: 800000,
    tipe: 'campur' as const,
    rating: 4.2,
    fasilitas: ['WiFi', 'Dapur Bersama', 'Parkir Motor'],
    deskripsi: 'Kost campur dengan suasana kekeluargaan di Gayamsari.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Keluarga Bahagia',
    telepon_pemilik: '081234567895',
  },
  {
    nama: 'Kost Sejahtera',
    alamat: 'Pedurungan, Semarang',
    harga: 1400000,
    tipe: 'putri' as const,
    rating: 4.9,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'CCTV', 'Laundry', 'Cleaning Service'],
    deskripsi: 'Kost putri premium dengan layanan lengkap untuk kenyamanan maksimal.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Ibu Sejahtera',
    telepon_pemilik: '081234567896',
  },
  {
    nama: 'Kost Merdeka',
    alamat: 'Semarang Tengah, Semarang',
    harga: 1600000,
    tipe: 'putra' as const,
    rating: 4.4,
    fasilitas: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Rooftop'],
    deskripsi: 'Kost putra di pusat kota dengan akses mudah dan rooftop santai.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Bapak Merdeka',
    telepon_pemilik: '081234567897',
  },
  {
    nama: 'Kost Harmoni',
    alamat: 'Candisari, Semarang',
    harga: 1000000,
    tipe: 'campur' as const,
    rating: 4.6,
    fasilitas: ['WiFi', 'Kamar Mandi Dalam', 'Parkir Motor', 'Minimarket'],
    deskripsi: 'Kost campur strategis dengan minimarket di dalam area kost.',
    foto: 'default-kost.jpg',
    nama_pemilik: 'Ibu Harmoni',
    telepon_pemilik: '081234567898',
  }
];

async function seedDatabase() {
  console.log('Starting to seed database...');

  // Hapus data lama untuk menghindari duplikat
  const { error: deleteError } = await supabase.from('kost').delete().neq('id', 0);
  if (deleteError) {
    console.error('Error deleting old data:', deleteError);
    return;
  }
  console.log('Old data deleted successfully.');

  // Masukkan data baru
  const { data, error } = await supabase.from('kost').insert(kostData).select();

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Database seeded successfully with', data.length, 'records.');
  }
}

seedDatabase();
