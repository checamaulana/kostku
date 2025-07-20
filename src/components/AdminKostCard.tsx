import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { deleteKost } from '../lib/kostService';

interface AdminKostCardProps {
  id: string;
  name: string;
  location: string;
  pricePerMonth: number;
  image?: string;
  type: 'putra' | 'putri' | 'campur';
  rating?: number;
  facilities?: string[];
  onDelete?: () => void;
}

function AdminKostCard({ 
  id,
  name, 
  location, 
  pricePerMonth, 
  image, 
  type, 
  rating = 4.5,
  facilities = [],
  onDelete
}: AdminKostCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const safeFacilities = Array.isArray(facilities) ? facilities : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'putra':
        return 'bg-ocean-blue text-white';
      case 'putri':
        return 'bg-pink-500 text-white';
      case 'campur':
        return 'bg-green-500 text-white';
      default:
        return 'bg-midnight-blue text-white';
    }
  };


  const handleDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const success = await deleteKost(parseInt(id));
      
      if (success) {
        alert(`Kost "${name}" berhasil dihapus!`);
        setIsDialogOpen(false);
        // Call parent component's onDelete callback to refresh data
        if (onDelete) {
          onDelete();
        }
      } else {
        alert('Gagal menghapus kost. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error deleting kost:', error);
      alert('Terjadi kesalahan saat menghapus kost.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="bg-white brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
        {/* Image placeholder */}
        <div className="h-48 bg-gray-200 brutalist-border relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-4xl">🏠</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className={`px-2 py-1 text-sm font-bold uppercase brutalist-border ${getTypeColor(type)}`}>
            {type}
          </div>
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white text-midnight-blue px-2 py-1 text-sm font-bold brutalist-border">
          ⭐ {rating}
        </div>
        
        {/* Kost ID */}
        <div className="absolute bottom-4 right-4 bg-midnight-blue text-white px-2 py-1 text-xs font-bold brutalist-border">
          ID: {id}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-black uppercase mb-2 text-midnight-blue">
          {name}
        </h3>
        
        <p className="text-lg font-medium text-gray-700 mb-3 flex items-center">
          <span className="mr-2">📍</span>
          {location}
        </p>

        <div className="mb-4">
          <p className="text-2xl font-black text-ocean-blue mb-1">
            {formatPrice(pricePerMonth)}
          </p>
          <p className="text-sm font-medium text-gray-600 uppercase">
            PER BULAN
          </p>
        </div>

        {/* Facilities */}
        {safeFacilities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {safeFacilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className="text-xs font-bold bg-pale-sky text-midnight-blue px-2 py-1 brutalist-border uppercase"
                >
                  {facility}
                </span>
              ))}
              {safeFacilities.length > 3 && (
                <span className="text-xs font-bold bg-gray-200 text-midnight-blue px-2 py-1 brutalist-border">
                  +{safeFacilities.length - 3} LAGI
                </span>
              )}
            </div>
          </div>
        )}

        {/* Admin Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to={`/kost/${id}`}
            className="bg-midnight-blue text-white py-3 font-bold text-center brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 block uppercase text-sm"
          >
            LIHAT DETAIL
          </Link>
          <Link
            to={`/admin/edit-kost/${id}`}
            className="bg-yellow-600 text-white py-3 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 uppercase text-sm text-center"
          >
            EDIT
          </Link>
        </div>
        
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className={`w-full mt-3 text-white py-3 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 uppercase text-sm ${
            isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600'
          }`}
        >
          {isDeleting ? 'MENGHAPUS...' : 'HAPUS KOST'}
        </button>
      </div>
    </div>
    <ConfirmDialog
      isOpen={isDialogOpen}
      title="Konfirmasi Hapus"
      message={`Apakah Anda yakin ingin menghapus kost "${name}"?`}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
    </>
  );
}

export default AdminKostCard;
