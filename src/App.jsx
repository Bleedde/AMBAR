import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, Zap, TrendingUp, MessageSquare, Bot, Settings, Menu, X, Phone, Mail, Instagram, Facebook, CheckCircle, ArrowRight, Sparkles, Globe, Target, Send, User, Building2, Video } from 'lucide-react';
import icon from './assets/ambarlogo.svg'; 
import n8n from './assets/n8n-icon.webp'
import openai from './assets/openai.png'
import gemini from './assets/gemini-color.png'
import emailjs from '@emailjs/browser';
import meta from './assets/meta.png'
import microsoft from './assets/microsoft.png'
import google from './assets/google.webp'
import IBM from './assets/IBM.png'
import notFoundPageGif from './assets/404gif.gif';

// Navigation Component
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

// Home Page
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative w-full">
          <div className="text-center">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fadeIn px-4" style={{ animationDelay: '0.2s' }}>
              Transforma tu empresa con Inteligencia Artificial
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn px-4" style={{ animationDelay: '0.3s' }}>
              Creamos soluciones inteligentes a medida que impulsan tu productividad, aumentan tus ganancias y optimizan la gestión de tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn px-4" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => navigate('/contacto')} className="group bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105 flex items-center justify-center space-x-2">
                <span>Comenzar ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/servicios')} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm">
                Ver servicios
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, text: 'Soluciones personalizadas', delay: '0.5s' },
              { icon: Zap, text: 'Implementación rápida', delay: '0.6s' },
              { icon: TrendingUp, text: 'Resultados medibles', delay: '0.7s' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: item.delay }}>
                <item.icon className="w-8 h-8 text-gray-300 mb-3" />
                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Tech Partners */}
          <Tech />

          {/* Video Section */}
          <div className="mt-24">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/[0.05] hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Video className="w-6 h-6 text-gray-300" />
                <h3 className="text-2xl font-bold text-white">Descubre cómo funciona</h3>
              </div>
              <div className="aspect-video bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/IhBdyEGy3aw?si=00CRd6turgjwiX04"
                  title="Ambar AI Solutions Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-400 text-center mt-6">Mira cómo nuestras soluciones transforman negocios reales</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Tech Partners 
const Tech = () => {
 const techPartners = [
    { name: "OpenAI", icon: openai },
    { name: "Gemini", icon: gemini },
    { name: "n8n", icon: n8n },
    {name: "Meta", icon: meta},
    {name: "Microsoft", icon: microsoft},
    {name: "Google", icon: google},
    {name: "IBM", icon: IBM}
  ];
  return (
    <div className="mt-24 w-full overflow-hidden select-none">
      <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-wider">
        Aliados Tecnologicos
      </p>

      <div className="marquee-container py-4">
        <div className="marquee flex whitespace-nowrap">
          {techPartners.map((tech, idx) => (
            <div
              key={`first-${idx}`}
              className="shrink-0 min-w-[180px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 mx-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2"
            >
              <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
              <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
            </div>
          ))}
          {(techPartners).map((tech, idx) => (
            <div
              key={`second-${idx}`}
              className="shrink-0 min-w-[180px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 mx-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2"
            >
              <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
              <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
            </div>
            
          ))}
          {(techPartners).map((tech, idx) => (
            <div
              key={`second-${idx}`}
              className="shrink-0 min-w-[180px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 mx-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2"
            >
              <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
              <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
            </div>
          ))}
          {(techPartners).map((tech, idx) => (
            <div
              key={`second-${idx}`}
              className="shrink-0 min-w-[180px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 mx-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2"
            >
              <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
              <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

// Services Page
const ServicesPage = () => {
  const services = [
    {
      icon: Bot,
      title: 'Agentes de IA Personalizados',
      description: 'Agentes inteligentes que gestionan clientes, finanzas y operaciones. Bots disponibles 24/7 que atienden, llaman y responden. Asistentes que agendán reuniones y optimizan tu tiempo.',
      features: ['Gestión automatizada', 'Disponibilidad 24/7', 'Adaptados a tu negocio']
    },
    {
      icon: Settings,
      title: 'Automatización de Procesos',
      description: 'Eliminamos tareas repetitivas y creamos flujos de trabajo automáticos. Integramos tus herramientas actuales con automatizaciones inteligentes para reducir errores y ahorrar tiempo.',
      features: ['Elimina tareas manuales', 'Reduce errores', 'Integración completa']
    },
    {
      icon: MessageSquare,
      title: 'Bots Comerciales y Soporte',
      description: 'Sistemas que abren y cierran ventas automáticamente. Atienden mensajes en redes sociales y WhatsApp. Gestionan reservas y seguimiento sin intervención humana.',
      features: ['Ventas automáticas', 'Soporte multicanal', 'Gestión de clientes']
    },
    {
      icon: Sparkles,
      title: 'Soluciones IA a Medida',
      description: 'Desarrollo de modelos inteligentes específicos para tu negocio. Implementación de IA en marketing, atención al cliente y análisis. Integraciones personalizadas con tus plataformas.',
      features: ['Totalmente personalizado', 'Tecnología avanzada', 'Soporte continuo']
    }
  ];

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-neutral-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.03),transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Nuestros <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Servicios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Soluciones de IA y automatización diseñadas para hacer crecer tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <div className="space-y-3">
                {service.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Page
const AboutPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.03),transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              ¿Por qué elegir <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">AMBAR?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Somos un equipo apasionado por la innovación y el crecimiento empresarial, especializados en crear soluciones inteligentes que transforman negocios.
            </p>
            <div className="space-y-4">
              {[
                { icon: Target, text: 'Soluciones completamente personalizadas' },
                { icon: Zap, text: 'Implementación rápida y soporte continuo' },
                { icon: TrendingUp, text: 'Enfoque en aumentar ventas y optimizar recursos' },
                { icon: MessageSquare, text: 'Comunicación directa con expertos' },
                { icon: Brain, text: 'Tecnología de vanguardia que evoluciona contigo' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:translate-x-2 border border-white/0 hover:border-white/10">
                  <div className="bg-white/10 rounded-lg p-2.5">
                    <item.icon className="w-6 h-6 text-gray-300" />
                  </div>
                  <span className="text-gray-300 pt-1.5">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.15] transition-all duration-300 hover:scale-105">
              <Globe className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Nuestra Visión</h3>
              <p className="text-gray-400 leading-relaxed">
                Ser la empresa líder en desarrollo de agentes de IA y automatización empresarial en Latinoamérica, transformando la forma en que las empresas operan y crecen con tecnología.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.15] transition-all duration-300 hover:scale-105">
              <Target className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Nuestra Misión</h3>
              <p className="text-gray-400 leading-relaxed">
                Impulsar la transformación digital mediante soluciones inteligentes personalizadas, optimizando tareas y generando mayor eficiencia y rentabilidad con IA estratégica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
e.preventDefault();
  const ahora = new Date(); 
  const año = ahora.getFullYear();
  const mes = ahora.getMonth() + 1; // Suma 1 porque enero es 0
  const dia = ahora.getDate();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  const segundos = ahora.getSeconds();
  const time = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
  try {
    await emailjs.send(
      'service_ps5ui66',    
      'template_9w96mov',    
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        time: time
      },
      '8nvWxb0NlZmaRU69I'     
    );
    
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', company: '', message: '', time: '' });
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un error al enviar el mensaje');
  }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-950 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            ¿Listo para <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">transformar</span> tu empresa?
          </h2>
          <p className="text-xl text-gray-400">
            Contáctanos y descubre cómo la IA puede llevar tu negocio al siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center space-x-2">
              <Send className="w-6 h-6" />
              <span>Envíanos tus datos</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Nombre completo *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Teléfono *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Enviar mensaje</span>
                <Send className="w-5 h-5" />
              </button>

              {submitted && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 text-center">
                  ¡Mensaje enviado! Te contactaremos pronto.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 text-white">Información de contacto</h3>
              <div className="space-y-4">
                <a
                  href="mailto:support@ambardev.com"
                  className="group flex items-center space-x-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <div className="bg-white/10 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-white group-hover:text-gray-200 transition-colors text-sm">support@ambardev.com</p>
                  </div>
                </a>

                <a
                  href="tel:+573209590302"
                  className="group flex items-center space-x-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <div className="bg-white/10 rounded-lg p-3">
                    <Phone className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Teléfono / WhatsApp</p>
                    <p className="text-white group-hover:text-gray-200 transition-colors">+57 320 959 0302</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-center mb-6 text-gray-300">Síguenos en redes sociales</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://instagram.com/synapse.ai.solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10 hover:border-white/20"
                >
                  <Instagram className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581158897634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10 hover:border-white/20"
                >
                  <Facebook className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.tiktok.com/@synapse.ai.solutions1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-110 border border-white/10 hover:border-white/20"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
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

// 404 Page
const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Página no encontrada</p>
      <img src={notFoundPageGif} alt="404 Not Found" className="w-64 h-64 mb-8" />
      <Link to="/" className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105">
        Volver al inicio
      </Link>
    </section>
  );
}

// Main App Component
const AmbarLanding = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
    </Router>
  );
};


export default AmbarLanding;