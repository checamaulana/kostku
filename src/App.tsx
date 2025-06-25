import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DaftarKostPage from './pages/DaftarKostPage';
import KostDetailPage from './pages/KostDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AddKostPage from './pages/AddKostPage';
import EditKostPage from './pages/EditKostPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/daftar-kost" element={<DaftarKostPage />} />
      <Route path="/kost/:id" element={<KostDetailPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/tambah-kost" element={<AddKostPage />} />
      <Route path="/admin/edit-kost/:id" element={<EditKostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
