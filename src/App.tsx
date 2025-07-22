import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext"; // Import
import ProtectedRoute from "./components/ProtectedRoute"; // Import
import LandingPage from "./pages/LandingPage";
import DaftarKostPage from "./pages/DaftarKostPage";
import KostDetailPage from "./pages/KostDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddKostPage from "./pages/AddKostPage";
import EditKostPage from "./pages/EditKostPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/kost/:id" element={<KostDetailPage />} />
        <Route path="/daftar-kost" element={<DaftarKostPage />} />

        
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tambah-kost" element={<AddKostPage />} />
          <Route path="/admin/edit-kost/:id" element={<EditKostPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
