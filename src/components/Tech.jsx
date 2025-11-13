import n8n from '../assets/n8n-icon.webp';
import openai from '../assets/openai.png';
import gemini from '../assets/gemini-color.png';
import meta from '../assets/meta.png';
import microsoft from '../assets/microsoft.png';
import google from '../assets/google.webp';
import IBM from '../assets/IBM.png';

const Tech = () => {
  const techPartners = [
    { name: "OpenAI", icon: openai },
    { name: "Gemini", icon: gemini },
    { name: "n8n", icon: n8n },
    { name: "Meta", icon: meta },
    { name: "Microsoft", icon: microsoft },
    { name: "Google", icon: google },
    { name: "IBM", icon: IBM }
  ];

  return (
    <div className="mt-24 w-full overflow-hidden select-none">
      <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-wider">
        Aliados Tecnológicos
      </p>

      <div className="marquee-container py-4">
        <div className="marquee flex whitespace-nowrap">
          {[...Array(4)].map((_, groupIndex) => (
            techPartners.map((tech, idx) => (
              <div
                key={`${groupIndex}-${idx}`}
                className="shrink-0 min-w-[180px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 mx-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2"
              >
                <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tech;