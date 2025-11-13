import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import icon from '../assets/ambarlogo.svg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl shadow-2xl' : 'bg-black/50 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="relative">
              <img src={icon} alt="Ambar Logo" className="w-20 h-20 text-white transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 blur-xl bg-white/20 group-hover:bg-white/30 transition-all duration-300"></div>
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">AMBAR</span>
          </div>

          <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive(item.path) ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(item.path) ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;