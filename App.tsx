
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { IdealForYou } from './sections/IdealForYou';
import { Benefits } from './sections/Benefits';
import { BeforeAfter } from './sections/BeforeAfter';
import { Testimonials } from './sections/Testimonials';
import { Packages } from './sections/Packages';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { OrderModal } from './components/OrderModal';
import { AdminDashboard } from './admin/AdminDashboard';
import { LoginForm } from './admin/LoginForm';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOrderClick={() => setIsModalOpen(true)} />
      <main>
        <Hero onOrderClick={() => setIsModalOpen(true)} />
        <IdealForYou onOrderClick={() => setIsModalOpen(true)} />
        <Benefits onOrderClick={() => setIsModalOpen(true)} />
        <BeforeAfter />
        <Testimonials />
        <Packages onOrderClick={() => setIsModalOpen(true)} />
        <FAQ />
      </main>
      <Footer />
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const AdminContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Use a simple session storage for admin persistence in this demo
  useEffect(() => {
    const auth = sessionStorage.getItem('nexa_admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (password: string) => {
    // Basic password check - in real app use Supabase Auth
    if (password === 'nexa2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nexa_admin_auth', 'true');
    } else {
      alert('Senha incorreta.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nexa_admin_auth');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminContainer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
