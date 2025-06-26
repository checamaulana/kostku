import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white p-12 brutalist-border brutalist-shadow">
            <h1 className="text-9xl font-black text-ocean-blue mb-4">404</h1>
            <h2 className="text-4xl font-bold uppercase mb-2">Halaman Tidak Ditemukan</h2>
            <p className="text-lg mb-8">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>
            <Link
              to="/"
              className="inline-block bg-midnight-blue text-white px-8 py-4 font-bold text-lg uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
