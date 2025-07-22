import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminKostCard from '../components/AdminKostCard';
import { getAllKost, searchKost } from '../lib/kostService';
import { type Kost } from '../lib/supabaseClient';

function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'putra' | 'putri' | 'campur'>('all');
  const [kostData, setKostData] = useState<Kost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data dari Supabase
  useEffect(() => {
    loadKostData();
  }, []);

  const loadKostData = async () => {
    try {
      setLoading(true);
      const data = await getAllKost();
      setKostData(data);
      setError(null);
    } catch (err) {
      console.error('Error loading kost data:', err);
      setError('Gagal memuat data kost');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim()) {
        try {
          const filteredData = await searchKost(
            searchQuery,
            typeFilter !== 'all' ? typeFilter : undefined
          );
          setKostData(filteredData);
        } catch (err) {
          console.error('Error searching kost:', err);
          setError('Gagal mencari data kost');
        }
      } else {
        // Jika tidak ada pencarian, ambil semua data dan filter berdasarkan tipe
        const allData = await getAllKost();
        const filtered = typeFilter === 'all' ? allData : allData.filter(kost => kost.tipe === typeFilter);
        setKostData(filtered);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, typeFilter]);

  // Calculate stats
  const totalKost = kostData.length;
  const filteredKost = kostData;

  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 bg-midnight-blue text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-6xl font-black uppercase mb-4">
                ADMIN DASHBOARD
              </h1>
              <p className="text-xl lg:text-2xl font-medium">
                Kelola semua kost di platform Kostku
              </p>
            </div>
            <Link 
              to="/admin/tambah-kost"
              className="bg-white text-midnight-blue px-8 py-4 font-bold text-xl brutalist-border brutalist-shadow rounded-full transition-all hover:translate-x-1 hover:translate-y-1 uppercase text-center"
            >
              + TAMBAH KOST BARU
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white p-6 brutalist-border brutalist-shadow rounded-xl max-w-md w-full">
              <div className="text-3xl font-black text-midnight-blue mb-2">{totalKost}</div>
              <div className="text-sm font-bold uppercase">TOTAL KOST</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b-2 border-midnight-blue">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="CARI KOST ATAU LOKASI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 font-bold text-lg placeholder-gray-500 brutalist-border brutalist-shadow rounded-full focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all uppercase"
              />
            </div>


            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'putra' | 'putri' | 'campur')}
                className="w-full px-4 py-3 font-bold text-lg brutalist-border brutalist-shadow rounded-full focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all uppercase"
              >
                <option value="all">SEMUA TIPE</option>
                <option value="putra">PUTRA</option>
                <option value="putri">PUTRI</option>
                <option value="campur">CAMPUR</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-bold text-lg">
              MENAMPILKAN {filteredKost.length} DARI {totalKost} KOST
            </span>
            {searchQuery && (
              <span className="bg-ocean-blue text-white px-3 py-1 font-bold text-sm brutalist-border uppercase">
                PENCARIAN: {searchQuery}
              </span>
            )}
            {typeFilter !== 'all' && (
              <span className="bg-green-600 text-white px-3 py-1 font-bold text-sm brutalist-border uppercase">
                TIPE: {typeFilter}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Kost Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="text-4xl animate-spin">⏳</div>
              <p className="mt-4 text-xl font-bold">Memuat data kost...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-100 text-red-700 p-8 brutalist-border">
              <div className="text-4xl">😭</div>
              <h3 className="text-2xl font-black uppercase mt-4">Terjadi Kesalahan</h3>
              <p className="mt-2 text-lg">{error}</p>
            </div>
          ) : filteredKost.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredKost.map((kost) => (
                <AdminKostCard
                  key={kost.id}
                  id={kost.id?.toString() || ''}
                  name={kost.nama}
                  location={kost.alamat}
                  pricePerMonth={kost.harga}
                  type={kost.tipe}
                  rating={kost.rating}
                  facilities={kost.fasilitas}
                  image={kost.foto}
                  onDelete={loadKostData}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white p-12 brutalist-border brutalist-shadow max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-black uppercase mb-4">
                  KOST TIDAK DITEMUKAN
                </h3>
                <p className="text-lg font-medium mb-6">
                  Coba ubah kata kunci pencarian atau filter yang Anda gunakan.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setTypeFilter('all');
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

      <Footer />
    </div>
  );
}

export default AdminDashboard;
