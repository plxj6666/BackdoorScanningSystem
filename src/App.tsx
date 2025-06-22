import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import UploadModel from './pages/UploadModel';
import ScanModel from './pages/ScanModel';
import ScanHistory from './pages/ScanHistory';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/*" element={<MainLayout />}>
            <Route path="upload" element={<UploadModel />} />
            <Route path="scan" element={<ScanModel />} />
            <Route path="history" element={<ScanHistory />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="/upload" replace />} />
            <Route path="*" element={<Navigate to="/upload" replace />} />
          </Route>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
