import { useNavigate } from 'react-router-dom';
import { Target, Zap, TrendingUp, Video, ArrowRight } from 'lucide-react';
import Tech from '../components/Tech';
import Logo3D from '../components/Logo3D';
import { FadeIn } from '../components/ScrollAnimations';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section with 3D Logo */}
      <section className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative w-full">
          
          {/* 3D Logo Section */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
              <Logo3D />
            </div>
          </FadeIn>

          <div className="text-center">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight px-4">
                Transforma tu empresa con Inteligencia Artificial
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Creamos soluciones inteligentes a medida que impulsan tu productividad, aumentan tus ganancias y optimizan la gestión de tu negocio.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <button onClick={() => navigate('/contacto')} className="group bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Comenzar ahora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/servicios')} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm">
                  Ver servicios
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, text: 'Soluciones personalizadas', delay: 0.5 },
              { icon: Zap, text: 'Implementación rápida', delay: 0.6 },
              { icon: TrendingUp, text: 'Resultados medibles', delay: 0.7 }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={item.delay}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <item.icon className="w-8 h-8 text-gray-300 mb-3" />
                  <p className="text-gray-300">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Tech Partners */}
          <FadeIn delay={0.8}>
            <Tech />
          </FadeIn>

          {/* Video Section */}
          <FadeIn delay={0.9}>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default HomePage;