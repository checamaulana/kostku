import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getKostById, updateKost, uploadKostImage, type KostFormData } from '../lib/kostService';

function EditKostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerMonth: '',
    type: 'putra' as 'putra' | 'putri' | 'campur',
    rating: '',
    description: '',
    ownerName: '',
    ownerPhone: '',
    images: [] as File[],
  });
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchKostData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const kost = await getKostById(parseInt(id));
        if (kost) {
          setFormData({
            name: kost.nama,
            location: kost.alamat,
            pricePerMonth: formatPrice(kost.harga.toString()),
            type: kost.tipe,
            rating: kost.rating.toString(),
            description: kost.deskripsi,
            ownerName: kost.nama_pemilik || '',
            ownerPhone: kost.telepon_pemilik || '',
            images: [], // Initialize with empty array
          });
          setSelectedFacilities(Array.isArray(kost.fasilitas) ? kost.fasilitas : []);
        }
      } catch (error) {
        console.error("Failed to fetch kost data:", error);
        alert("Gagal memuat data kost.");
      } finally {
        setLoading(false);
      }
    };
    fetchKostData();
  }, [id]);
  
  const availableFacilities = [
    'WiFi',
    'Kipas Angin',
    'Kasur',
    'Meja belajar',
    'Kursi',
    'Bantal',
    'Guling',
    'Jemuran',
    'Sprei',
    'Dapur Umum',
    'Parkir Motor',
    'Parkir Mobil',
    'AC',
    'Lemari',
    'Rak Sepatu',
    'Kulkas',
    'TV',
    'Mesin Cuci',
    'Kamar Mandi Dalam',
    'Kamar Mandi Luar',
    'Dapur Bersama',
    'Parkir Motor',
    'Laundry',
    'Security 24 Jam',
    'CCTV',
    'Cleaning Service',
    'Gym',
    'Rooftop',
    'Minimarket'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev => {
      if (prev.includes(facility)) {
        return prev.filter(f => f !== facility);
      } else {
        return [...prev, facility];
      }
    });
  };

  // Rules are not part of the schema, so these functions are removed.

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    try {
      let imageUrl;
      // If a new image is selected, upload it
      if (formData.images && formData.images.length > 0) {
        const uploadedUrl = await uploadKostImage(formData.images[0]);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const priceNumber = parseInt(formData.pricePerMonth.replace(/\./g, ''));
      const ratingNumber = parseFloat(formData.rating);

      const updatedData: Partial<KostFormData> = {
        nama: formData.name,
        alamat: formData.location,
        harga: priceNumber,
        tipe: formData.type,
        rating: ratingNumber,
        deskripsi: formData.description,
        fasilitas: selectedFacilities,
        nama_pemilik: formData.ownerName,
        telepon_pemilik: formData.ownerPhone,
      };

      // Only add 'foto' to the update if a new image was uploaded
      if (imageUrl) {
        updatedData.foto = imageUrl;
      }

      const success = await updateKost(parseInt(id), updatedData);

      if (success) {
        alert('Data kost berhasil diperbarui!');
        navigate('/admin');
      } else {
        alert('Gagal memperbarui data kost.');
      }
    } catch (error) {
      console.error('Error updating kost:', error);
      alert('Terjadi kesalahan saat memperbarui data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Add thousand separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    setFormData(prev => ({
      ...prev,
      pricePerMonth: formatted
    }));
  };

  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 bg-midnight-blue text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-6xl font-black uppercase mb-4">
                EDIT KOST
              </h1>
              <p className="text-xl lg:text-2xl font-medium">
                Perbarui detail untuk kost: {formData.name}
              </p>
            </div>
            <Link 
              to="/admin"
              className="bg-white text-midnight-blue px-6 py-3 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 uppercase"
            >
              ← KEMBALI KE DASHBOARD
            </Link>
          </div>
        </div>
      </section>

      {/* Add New Kost Form */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-8 brutalist-border brutalist-shadow">
            <h2 className="text-3xl font-black uppercase mb-8">FORMULIR EDIT KOST</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    NAMA KOST *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    placeholder="Masukkan nama kost..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    LOKASI *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    placeholder="Contoh: Tembalang, Semarang"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    HARGA PER BULAN (RP) *
                  </label>
                  <input
                    type="text"
                    name="pricePerMonth"
                    value={formData.pricePerMonth}
                    onChange={handlePriceChange}
                    required
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    placeholder="1.200.000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    TIPE KOST *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                  >
                    <option value="putra">PUTRA</option>
                    <option value="putri">PUTRI</option>
                    <option value="campur">CAMPUR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    RATING KOST (BINTANG) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    placeholder="4.5"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold uppercase mb-2">
                  DESKRIPSI KOST *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all resize-none"
                  placeholder="Deskripsikan kost Anda secara detail..."
                />
              </div>

              {/* Facilities */}
              <div>
                <label className="block text-sm font-bold uppercase mb-4">
                  FASILITAS KOST
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableFacilities.map((facility) => (
                    <button
                      key={facility}
                      type="button"
                      onClick={() => handleFacilityToggle(facility)}
                      className={`p-3 text-sm font-bold brutalist-border brutalist-shadow rounded-full transition-all hover:translate-x-1 hover:translate-y-1 ${
                        selectedFacilities.includes(facility)
                          ? 'bg-ocean-blue text-white'
                          : 'bg-white text-midnight-blue'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rules section removed as it's not in the DB schema */}

              {/* Images */}
              <div>
                <label className="block text-sm font-bold uppercase mb-4">
                  FOTO KOST
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-midnight-blue border-dashed cursor-pointer bg-white hover:bg-gray-50 brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-midnight-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm font-bold uppercase">
                          KLIK UNTUK UPLOAD FOTO
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG atau JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <div className="h-32 bg-gray-200 brutalist-border overflow-hidden">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Owner Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    NAMA PEMILIK *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    placeholder="Nama lengkap pemilik..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    NOMOR TELEPON PEMILIK *
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link
                  to="/admin"
                  className="px-8 py-4 bg-gray-500 text-white font-bold text-lg uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 text-center"
                >
                  BATAL
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`px-8 py-4 font-bold text-lg uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 ${
                    isSubmitting || loading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-ocean-blue text-white'
                  }`}
                >
                  {isSubmitting ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EditKostPage;
