import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

function LandingPage() {
  const [kostCount, setKostCount] = useState(0);

  useEffect(() => {
    const fetchKostCount = async () => {
      const { count, error } = await supabase
        .from('kost')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching kost count:', error);
      } else {
        setKostCount(count || 0);
      }
    };
    fetchKostCount();
  }, []);
  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans">
      <Header currentPage="landing" />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-black uppercase leading-tight mb-6">
                PLATFORM #1
                <br />
                <span className="text-ocean-blue">CARI KOST</span>
                <br />
                DI INDONESIA
              </h1>
              <p className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed">
                Temukan kost impian dengan mudah, aman, dan terpercaya. Kostku
                menghubungkan mahasiswa dengan pemilik kost terbaik di seluruh
                Semarang.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/daftar-kost"
                  className="bg-ocean-blue text-white px-8 py-4 text-lg font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 inline-block text-center"
                >
                  CARI KOST SEKARANG
                </Link>
                <button className="bg-pale-sky text-midnight-blue px-8 py-4 text-lg font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
                  DAFTARKAN KOST ANDA
                </button>
              </div>
            </div>
            <div className="bg-midnight-blue p-8 brutalist-border brutalist-shadow">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-4 uppercase">
                  STATISTIK CHEKOST
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Kost Tersedia:</span>
                    <span className="font-black text-xl">{kostCount}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Mahasiswa Aktif:</span>
                    <span className="font-black text-xl">1000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Kota:</span>
                    <span className="font-black text-xl">1+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Rating Rata-rata:</span>
                    <span className="font-black text-xl">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-black uppercase text-center mb-12">
            MASALAH YANG KITA SELESAIKAN
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white text-midnight-blue p-8 brutalist-border">
              <h3 className="text-2xl font-bold uppercase mb-4 text-ocean-blue">
                UNTUK MAHASISWA
              </h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Informasi kost tidak lengkap & tidak standar
                </li>
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Risiko penipuan tinggi
                </li>
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Proses pencarian yang melelahkan
                </li>
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Harus survei banyak tempat secara fisik
                </li>
              </ul>
            </div>
            <div className="bg-white text-midnight-blue p-8 brutalist-border">
              <h3 className="text-2xl font-bold uppercase mb-4 text-ocean-blue">
                UNTUK PEMILIK KOST
              </h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Pemasaran terbatas pada area sekitar
                </li>
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Manajemen booking masih manual
                </li>
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Kesulitan menjaga okupansi kamar
                </li>
                <li className="flex items-start">
                  <span className="font-black mr-2">×</span>
                  Tidak ada cara membangun reputasi online
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-black uppercase mb-8">
            <span className="text-ocean-blue">CHEKOST</span> ADALAH SOLUSINYA
          </h2>
          <p className="text-xl lg:text-2xl font-medium mb-12 max-w-4xl mx-auto leading-relaxed">
            Platform digital dua sisi yang menghubungkan mahasiswa dan pemilik
            kost dengan cara yang aman, transparan, dan efisien.
          </p>
          <div className="bg-ocean-blue text-white p-12 brutalist-border brutalist-shadow">
            <h3 className="text-2xl font-bold uppercase mb-6">
              SEPERTI AIRBNB, TAPI UNTUK KOST MAHASISWA
            </h3>
            <p className="text-xl font-medium">
              Sistem terpusat • Terverifikasi • Mudah digunakan • Terpercaya
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-pale-sky">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-black uppercase text-center mb-12">
            FITUR UTAMA
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 brutalist-border brutalist-shadow">
              <div className="w-16 h-16 bg-ocean-blue brutalist-border mb-6 flex items-center justify-center">
                <span className="text-white font-black text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-4">
                PENCARIAN LENGKAP
              </h3>
              <p className="text-lg">
                Filter berdasarkan lokasi, harga, fasilitas, dan tipe kost.
                Temukan kost yang sesuai dengan kebutuhan Anda.
              </p>
            </div>
            <div className="bg-white p-8 brutalist-border brutalist-shadow">
              <div className="w-16 h-16 bg-ocean-blue brutalist-border mb-6 flex items-center justify-center">
                <span className="text-white font-black text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-4">
                LISTING TERVERIFIKASI
              </h3>
              <p className="text-lg">
                Semua kost telah diverifikasi dengan foto asli, informasi
                detail, dan ulasan dari penghuni sebelumnya.
              </p>
            </div>
            <div className="bg-white p-8 brutalist-border brutalist-shadow">
              <div className="w-16 h-16 bg-ocean-blue brutalist-border mb-6 flex items-center justify-center">
                <span className="text-white font-black text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold uppercase mb-4">
                DASHBOARD MODERN
              </h3>
              <p className="text-lg">
                Kelola booking, pembayaran, dan komunikasi dengan mudah melalui
                dashboard yang user-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-midnight-blue text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-black uppercase text-center mb-12">
            CARA KERJA
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold uppercase mb-8 text-ocean-blue">
                UNTUK MAHASISWA
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">1</span>
                  </div>
                  <p className="text-lg">
                    Cari kost berdasarkan lokasi dan preferensi
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">2</span>
                  </div>
                  <p className="text-lg">
                    Lihat detail lengkap dan ulasan kost
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">3</span>
                  </div>
                  <p className="text-lg">
                    Hubungi pemilik atau langsung booking
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">4</span>
                  </div>
                  <p className="text-lg">Bayar dan dapatkan konfirmasi</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">5</span>
                  </div>
                  <p className="text-lg">Check-in dan berikan ulasan</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold uppercase mb-8 text-ocean-blue">
                UNTUK PEMILIK KOST
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">1</span>
                  </div>
                  <p className="text-lg">Daftar dan buat profil pemilik</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">2</span>
                  </div>
                  <p className="text-lg">Upload foto dan detail kost</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">3</span>
                  </div>
                  <p className="text-lg">
                    Terima notifikasi booking dari mahasiswa
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">4</span>
                  </div>
                  <p className="text-lg">Konfirmasi atau tolak permintaan</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-ocean-blue brutalist-border flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-black">5</span>
                  </div>
                  <p className="text-lg">
                    Koordinasi check-in dan terima pembayaran
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-black uppercase mb-8">
            SIAP MEMULAI?
          </h2>
          <p className="text-xl lg:text-2xl font-medium mb-12">
            Bergabunglah dengan ribuan mahasiswa dan pemilik kost yang sudah
            mempercayai Kostku
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/daftar-kost"
              className="bg-ocean-blue text-white px-12 py-6 text-xl font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 inline-block text-center"
            >
              DAFTAR SEBAGAI MAHASISWA
            </Link>
            <button className="bg-midnight-blue text-white px-12 py-6 text-xl font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
              DAFTAR SEBAGAI PEMILIK KOST
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
