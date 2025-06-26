import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  currentPage?: 'landing' | 'daftar-kost';
}

function Header({ currentPage }: HeaderProps) {
  const location = useLocation();
  
  // Determine current page from location if not explicitly provided
  const actualCurrentPage = currentPage || (location.pathname === '/daftar-kost' ? 'daftar-kost' : 'landing');

  return (
    <header className="border-b-2 border-midnight-blue bg-pale-sky sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-black uppercase tracking-tight">
          <Link to="/">
            KOSTKU
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          {actualCurrentPage === 'landing' ? (
            <>
              <a
                href="#features"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                FITUR
              </a>
              <a
                href="#how-it-works"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                CARA KERJA
              </a>
              <a
                href="#contact"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                KONTAK
              </a>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                BERANDA
              </Link>
              <Link
                to="/daftar-kost"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                DAFTAR KOST
              </Link>
            </>
          )}
        </nav>
        <div className="flex gap-4">
          {actualCurrentPage === 'landing' && (
            <Link 
              to="/daftar-kost"
              className="bg-pale-sky text-midnight-blue px-6 py-2 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
            >
              CARI KOST
            </Link>
          )}
          <button className="bg-ocean-blue text-white px-6 py-2 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1">
            MASUK
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
