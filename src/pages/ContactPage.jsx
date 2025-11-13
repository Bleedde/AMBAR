import { useState } from 'react';
import { Send, User, Mail, Phone, Building2, Instagram, Facebook } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { FadeIn } from '../components/ScrollAnimations';

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
    const mes = ahora.getMonth() + 1;
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
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      <div className="max-w-6xl mx-auto relative">
        <FadeIn delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              ¿Listo para <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">transformar</span> tu empresa?
            </h2>
            <p className="text-xl text-gray-400">
              Contáctanos y descubre cómo la IA puede llevar tu negocio al siguiente nivel
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div className=" bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
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
          </FadeIn>

          {/* Contact Info */}
          <div className="space-y-6">
            <FadeIn delay={0.3} direction="left">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
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
            </FadeIn>

            {/* Social Media */}
            <FadeIn delay={0.4} direction="left">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
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
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;