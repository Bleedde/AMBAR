import icon from '../assets/ambarlogo.svg';

const Footer = () => {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <img src={icon} alt="Ambar Logo" className="w-7 h-7" />
          <span className="text-xl font-bold text-white">AMBAR</span>
        </div>
        <p className="text-gray-400 mb-2">Deja que AMBAR sea el puente entre tu negocio y el futuro</p>
        <p className="text-gray-600 text-sm">© 2025 AMBAR. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;