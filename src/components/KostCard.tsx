import { Link } from 'react-router-dom';

interface KostCardProps {
  id: string;
  name: string;
  location: string;
  pricePerMonth: number;
  image?: string;
  type: 'putra' | 'putri' | 'campur';
  rating?: number;
  facilities?: string[];
}

function KostCard({ 
  id,
  name, 
  location, 
  pricePerMonth, 
  image, 
  type, 
  rating = 4.5,
  facilities = []
}: KostCardProps) {
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
        return 'bg-blue-500 text-white';
      case 'putri':
        return 'bg-pink-500 text-white';
      case 'campur':
        return 'bg-green-500 text-white';
      default:
        return 'bg-midnight-blue text-white';
    }
  };

  return (
    <div className="bg-white brutalist-border brutalist-shadow rounded-lg transition-all hover:translate-x-1 hover:translate-y-1 cursor-pointer">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 brutalist-border relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-4xl">🏠</span>
          </div>
        )}
        {/* Type badge */}
        <div
          className={`absolute top-4 left-4 px-2 py-1 text-sm font-bold uppercase brutalist-border ${getTypeColor(
            type
          )}`}
        >
          {type}
        </div>
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white text-midnight-blue px-2 py-1 text-sm font-bold brutalist-border">
          ⭐ {rating}
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
                  {facility.replace(/[\[\]"]/g, "")}
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

        <Link
          to={`/kost/${id}`}
          className="w-full bg-midnight-blue text-white py-3 font-bold text-lg uppercase brutalist-border brutalist-shadow rounded-full transition-all hover:translate-x-1 hover:translate-y-1 block text-center"
        >
          LIHAT DETAIL
        </Link>
      </div>
    </div>
  );
}

export default KostCard;
