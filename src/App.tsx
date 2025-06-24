import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DaftarKostPage from './pages/DaftarKostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/daftar-kost" element={<DaftarKostPage />} />
    </Routes>
  );
}

export default App;
