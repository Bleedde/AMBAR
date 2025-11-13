import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Componente wrapper para animaciones de página
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-opacity duration-500 ${
        transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );
};

// Componente principal con rutas
const AppRoutes = () => {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
};

// Componente principal
const AmbarLanding = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <AppRoutes />
        <Footer />
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        
        body {
          overflow-x: hidden;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          overflow: hidden;
        }

        .marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        /* Animaciones de fade in mejoradas */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Smooth scroll para toda la aplicación */
        * {
          scroll-behavior: smooth;
        }

        /* Transiciones suaves para cambios de página */
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }

        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 500ms, transform 500ms;
        }

        .page-transition-exit {
          opacity: 1;
        }

        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 500ms;
        }
      `}</style>
    </Router>
  );
};

export default AmbarLanding;