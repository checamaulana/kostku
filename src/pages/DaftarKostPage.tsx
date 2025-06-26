import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import KostCard from '../components/KostCard';

// Dummy data for kost listings
const kostData = [
  {
    id: '1',
    name: 'Kost Sari Asih',
    location: 'Tembalang, Semarang',
    pricePerMonth: 1200000,
    type: 'putri' as const,
    rating: 4.8,
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Dapur Bersama', 'Parkir Motor']
  },
  {
    id: '2',
    name: 'Kost Mandiri Jaya',
    location: 'Undip, Semarang',
    pricePerMonth: 1500000,
    type: 'putra' as const,
    rating: 4.6,
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Laundry']
  },
  {
    id: '3',
    name: 'Kost Graha Indah',
    location: 'Pleburan, Semarang',
    pricePerMonth: 900000,
    type: 'campur' as const,
    rating: 4.3,
    facilities: ['WiFi', 'Kamar Mandi Luar', 'Dapur Bersama']
  },
  {
    id: '4',
    name: 'Kost Mawar Putih',
    location: 'Ngaliyan, Semarang',
    pricePerMonth: 1100000,
    type: 'putri' as const,
    rating: 4.7,
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Security 24 Jam']
  },
  {
    id: '5',
    name: 'Kost Putra Bangsa',
    location: 'Banyumanik, Semarang',
    pricePerMonth: 1300000,
    type: 'putra' as const,
    rating: 4.5,
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Gym', 'Parkir Motor']
  },
  {
    id: '6',
    name: 'Kost Keluarga Bahagia',
    location: 'Gayamsari, Semarang',
    pricePerMonth: 800000,
    type: 'campur' as const,
    rating: 4.2,
    facilities: ['WiFi', 'Dapur Bersama', 'Parkir Motor']
  },
  {
    id: '7',
    name: 'Kost Sejahtera',
    location: 'Pedurungan, Semarang',
    pricePerMonth: 1400000,
    type: 'putri' as const,
    rating: 4.9,
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'CCTV', 'Laundry', 'Cleaning Service']
  },
  {
    id: '8',
    name: 'Kost Merdeka',
    location: 'Semarang Tengah, Semarang',
    pricePerMonth: 1600000,
    type: 'putra' as const,
    rating: 4.4,
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Rooftop']
  },
  {
    id: '9',
    name: 'Kost Harmoni',
    location: 'Candisari, Semarang',
    pricePerMonth: 1000000,
    type: 'campur' as const,
    rating: 4.6,
    facilities: ['WiFi', 'Kamar Mandi Dalam', 'Parkir Motor', 'Minimarket']
  }
];

function DaftarKostPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'putra' | 'putri' | 'campur'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  // Filter kost data based on search and filters
  const filteredKost = kostData.filter(kost => {
    const matchesSearch = kost.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kost.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || kost.type === selectedType;
    
    const matchesPrice = () => {
      switch (priceRange) {
        case 'low': return kost.pricePerMonth < 1000000;
        case 'mid': return kost.pricePerMonth >= 1000000 && kost.pricePerMonth <= 1400000;
        case 'high': return kost.pricePerMonth > 1400000;
        default: return true;
      }
    };

    return matchesSearch && matchesType && matchesPrice();
  });

  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans">
      <Header currentPage="daftar-kost" />

      {/* Page Header */}
      <section className="py-12 bg-midnight-blue text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-black uppercase mb-4">
            DAFTAR KOST
          </h1>
          <p className="text-xl lg:text-2xl font-medium">
            Temukan kost impian Anda di Semarang
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b-2 border-midnight-blue">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="CARI KOST ATAU LOKASI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 font-bold text-lg placeholder-gray-500 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all uppercase"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-4 py-3 font-bold text-lg brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all uppercase"
              >
                <option value="all">SEMUA TIPE</option>
                <option value="putra">PUTRA</option>
                <option value="putri">PUTRI</option>
                <option value="campur">CAMPUR</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full px-4 py-3 font-bold text-lg brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all uppercase"
              >
                <option value="all">SEMUA HARGA</option>
                <option value="low">&lt; 1 JUTA</option>
                <option value="mid">1 - 1.4 JUTA</option>
                <option value="high">&gt; 1.4 JUTA</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <span className="font-bold text-lg">
              MENAMPILKAN {filteredKost.length} KOST
            </span>
            {searchQuery && (
              <span className="bg-ocean-blue text-white px-3 py-1 font-bold text-sm brutalist-border uppercase">
                PENCARIAN: {searchQuery}
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="bg-midnight-blue text-white px-3 py-1 font-bold text-sm brutalist-border uppercase">
                TIPE: {selectedType}
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="bg-green-600 text-white px-3 py-1 font-bold text-sm brutalist-border uppercase">
                HARGA: {priceRange === 'low' ? '< 1 JUTA' : priceRange === 'mid' ? '1-1.4 JUTA' : '> 1.4 JUTA'}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Kost Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredKost.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredKost.map((kost) => (
                <KostCard
                  key={kost.id}
                  id={kost.id}
                  name={kost.name}
                  location={kost.location}
                  pricePerMonth={kost.pricePerMonth}
                  type={kost.type}
                  rating={kost.rating}
                  facilities={kost.facilities}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white p-12 brutalist-border brutalist-shadow max-w-md mx-auto">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-black uppercase mb-4">
                  KOST TIDAK DITEMUKAN
                </h3>
                <p className="text-lg font-medium mb-6">
                  Coba ubah kata kunci pencarian atau filter yang Anda gunakan.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                    setPriceRange('all');
                  }}
                  className="bg-ocean-blue text-white px-6 py-3 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 uppercase"
                >
                  RESET FILTER
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black uppercase mb-6">
            TIDAK MENEMUKAN KOST YANG COCOK?
          </h2>
          <p className="text-xl font-medium mb-8">
            Hubungi tim kami untuk mendapatkan rekomendasi kost yang sesuai dengan kebutuhan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-midnight-blue px-8 py-4 font-bold text-lg brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 uppercase">
              HUBUNGI TIM KOSTKU
            </button>
            <button className="bg-midnight-blue text-white px-8 py-4 font-bold text-lg brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 uppercase">
              DAFTARKAN KOST ANDA
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DaftarKostPage;
