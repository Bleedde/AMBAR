import { Target, Zap, TrendingUp, MessageSquare, Brain, Globe } from 'lucide-react';
import { FadeIn } from '../components/ScrollAnimations';

const AboutPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.03),transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                ¿Por qué elegir <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">AMBAR?</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Somos un equipo apasionado por la innovación y el crecimiento empresarial, especializados en crear soluciones inteligentes que transforman negocios.
              </p>
            </FadeIn>
            
            <div className="space-y-4">
              {[
                { icon: Target, text: 'Soluciones completamente personalizadas', delay: 0.3 },
                { icon: Zap, text: 'Implementación rápida y soporte continuo', delay: 0.4 },
                { icon: TrendingUp, text: 'Enfoque en aumentar ventas y optimizar recursos', delay: 0.5 },
                { icon: MessageSquare, text: 'Comunicación directa con expertos', delay: 0.6 },
                { icon: Brain, text: 'Tecnología de vanguardia que evoluciona contigo', delay: 0.7 }
              ].map((item, idx) => (
                <FadeIn key={idx} delay={item.delay}>
                  <div className="flex items-start space-x-4 bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:translate-x-2 border border-white/0 hover:border-white/10">
                    <div className="bg-white/10 rounded-lg p-2.5">
                      <item.icon className="w-6 h-6 text-gray-300" />
                    </div>
                    <span className="text-gray-300 pt-1.5">{item.text}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.3} direction="left">
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.15] transition-all duration-300 hover:scale-105">
                <Globe className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Nuestra Visión</h3>
                <p className="text-gray-400 leading-relaxed">
                  Ser la empresa líder en desarrollo de agentes de IA y automatización empresarial en Latinoamérica, transformando la forma en que las empresas operan y crecen con tecnología.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="left">
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.15] transition-all duration-300 hover:scale-105">
                <Target className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Nuestra Misión</h3>
                <p className="text-gray-400 leading-relaxed">
                  Impulsar la transformación digital mediante soluciones inteligentes personalizadas, optimizando tareas y generando mayor eficiencia y rentabilidad con IA estratégica.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;