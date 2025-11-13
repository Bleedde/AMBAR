import { Bot, Settings, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
import { FadeIn } from '../components/ScrollAnimations';

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
        <FadeIn delay={0.1}>
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Nuestros <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Servicios</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Soluciones de IA y automatización diseñadas para hacer crecer tu negocio
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={0.2 + idx * 0.1}>
              <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;