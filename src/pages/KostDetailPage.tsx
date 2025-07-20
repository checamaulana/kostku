import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getKostById } from "../lib/kostService";
import { type Kost } from "../lib/supabaseClient";

function KostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [kost, setKost] = useState<Kost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [duration, setDuration] = useState("1");

  useEffect(() => {
    const fetchKostDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getKostById(parseInt(id));
        setKost(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching kost detail:", err);
        setError("Gagal memuat detail kost.");
      } finally {
        setLoading(false);
      }
    };
    fetchKostDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pale-sky flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin">⏳</div>
          <p className="mt-4 text-xl font-bold">Memuat detail kost...</p>
        </div>
      </div>
    );
  }

  if (error || !kost) {
    return (
      <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans">
        <Header currentPage="daftar-kost" />
        <div className="py-20 text-center">
          <h1 className="text-4xl font-black uppercase mb-4">
            KOST TIDAK DITEMUKAN
          </h1>
          <p className="text-xl">Silakan kembali ke halaman daftar kost.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "putra":
        return "bg-ocean-blue text-white";
      case "putri":
        return "bg-pink-500 text-white";
      case "campur":
        return "bg-green-500 text-white";
      default:
        return "bg-midnight-blue text-white";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    const monthlyPrice = kost.harga * parseInt(duration);
    return monthlyPrice;
  };

  const safeFacilities = Array.isArray(kost.fasilitas) ? kost.fasilitas : [];

  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans">
      <Header currentPage="daftar-kost" />

      {/* Image Gallery */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3">
              <div className="h-96 lg:h-[500px] brutalist-border brutalist-shadow overflow-hidden">
                <img
                  src={kost.foto}
                  alt={`${kost.nama} - Gambar ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml;charset=UTF-8,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' dy='.3em' fill='%236b7280'%3EGambar Kost%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 lg:grid-cols-1 gap-4">
              {[
                kost.foto,
                "/placeholder-room-2.jpg",
                "/placeholder-room-3.jpg",
                "/placeholder-common-area.jpg",
              ].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-24 lg:h-28 brutalist-border brutalist-shadow overflow-hidden transition-all hover:translate-x-1 hover:translate-y-1 ${
                    selectedImage === index ? "border-ocean-blue border-4" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${kost.nama} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;charset=UTF-8,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' dy='.3em' fill='%236b7280'%3E${
                        index + 1
                      }%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <div className="bg-white p-8 brutalist-border brutalist-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-black uppercase mb-2">
                      {kost.nama}
                    </h1>
                    <p className="text-xl font-medium text-gray-700 flex items-center">
                      <span className="mr-2">📍</span>
                      {kost.alamat}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div
                      className={`px-3 py-1 font-bold text-sm brutalist-border uppercase ${getTypeColor(
                        kost.tipe
                      )}`}
                    >
                      {kost.tipe}
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-1">⭐</span>
                      <span className="font-bold text-lg">{kost.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-gray-800">
                  {kost.deskripsi}
                </p>
              </div>

              {/* Facilities */}
              <div className="bg-white p-8 brutalist-border brutalist-shadow">
                <h2 className="text-2xl font-black uppercase mb-6">
                  FASILITAS
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {safeFacilities.map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-pale-sky p-4 brutalist-border"
                    >
                      <span className="text-2xl mr-3">
                        {facility === "WiFi"
                          ? "📶"
                          : facility === "AC"
                          ? "❄️"
                          : facility === "Kamar Mandi Dalam"
                          ? "🚿"
                          : facility === "Dapur Bersama"
                          ? "🍳"
                          : facility === "Parkir Motor"
                          ? "🏍️"
                          : "✅"}
                      </span>
                      <span className="font-bold text-sm uppercase">
                        {facility.replace(/[\[\]"]/g, "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              {/* Rules are not in the database model, so this section is removed or commented out */}
              {/* 
              <div className="bg-white p-8 brutalist-border brutalist-shadow">
                <h2 className="text-2xl font-black uppercase mb-6">PERATURAN KOST</h2>
                <ul className="space-y-3">
                  {kost.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="font-black mr-3 text-ocean-blue">•</span>
                      <span className="text-lg">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              */}
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 brutalist-border brutalist-shadow sticky top-8">
                <div className="mb-6">
                  <div className="text-3xl font-black text-ocean-blue mb-2">
                    {formatPrice(kost.harga)}
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase">
                    PER BULAN
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      TANGGAL CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      DURASI SEWA
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    >
                      <option value="1">1 BULAN</option>
                      <option value="3">3 BULAN</option>
                      <option value="6">6 BULAN</option>
                      <option value="12">1 TAHUN</option>
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-pale-sky p-4 brutalist-border">
                    <h3 className="font-bold uppercase mb-3">RINCIAN BIAYA</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Sewa {duration} bulan:</span>
                        <span className="text-ocean-blue">
                          {formatPrice(calculateTotal())}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button className="w-full bg-ocean-blue text-white py-4 font-bold text-lg uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
                      BOOKING SEKARANG
                    </button>
                    <button className="w-full bg-midnight-blue text-white py-4 font-bold text-lg uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
                      HUBUNGI PEMILIK
                    </button>
                  </div>

                  {/* Owner Info */}
                  <div className="bg-gray-100 p-4 brutalist-border">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-ocean-blue brutalist-border flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">
                          {kost.nama_pemilik?.charAt(0) || "P"}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold">
                          {kost.nama_pemilik || "Pemilik"}
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">
                            Pemilik
                          </span>
                          <span className="text-green-600 text-sm">
                            ✓ Terverifikasi
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default KostDetailPage;
