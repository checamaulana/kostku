import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { supabase } from "../lib/supabaseClient";

interface HeaderProps {
  currentPage?: "landing" | "daftar-kost";
}

function Header({ currentPage }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Dapatkan status user dari context

  // Tentukan halaman saat ini berdasarkan path URL jika tidak disediakan secara eksplisit
  const actualCurrentPage =
    currentPage ||
    (location.pathname === "/daftar-kost" ? "daftar-kost" : "landing");

  // Fungsi untuk menangani klik pada tombol "CARI KOST"
  const handleCariKostClick = () => {
    // Jika user belum login, arahkan ke halaman login
    if (!user) {
      navigate("/login");
    } else {
      // Jika sudah login, arahkan ke halaman daftar kost
      navigate("/daftar-kost");
    }
  };

  return (
    <header className="border-b-2 border-midnight-blue bg-pale-sky sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-black uppercase tracking-tight">
          <Link to="/">CHEKOST</Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          {actualCurrentPage === "landing" ? (
            <>
              <a
                href="/#features"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                FITUR
              </a>
              <a
                href="/#how-it-works"
                className="font-bold hover:text-ocean-blue transition-colors"
              >
                CARA KERJA
              </a>
              <a
                href="/#contact"
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
          {actualCurrentPage === "landing" && (
            // Menggunakan onClick untuk logika kondisional
            <button
              onClick={handleCariKostClick}
              className="bg-pale-sky text-midnight-blue px-6 py-2 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
            >
              CARI KOST
            </button>
          )}

          {/* Logika kondisional untuk menampilkan tombol Masuk atau Keluar */}
          {!user ? (
            // Jika tidak ada user (belum login) -> Tampilkan tombol MASUK
            <Link
              to="/login"
              className="bg-ocean-blue text-white px-6 py-2 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
            >
              MASUK
            </Link>
          ) : (
            // Jika ada user (sudah login) -> Tampilkan tombol KELUAR
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/");
              }}
              className="bg-red-500 text-white px-6 py-2 font-bold brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
            >
              KELUAR
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
