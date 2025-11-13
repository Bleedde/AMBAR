import { Link } from 'react-router-dom';
import notFoundPageGif from '../assets/404gif.gif';
import { FadeIn } from '../components/ScrollAnimations';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <FadeIn delay={0.1}>
        <h1 className="text-6xl font-bold mb-4">404</h1>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <p className="text-xl mb-8">Página no encontrada</p>
      </FadeIn>
      
      <FadeIn delay={0.3}>
        <img src={notFoundPageGif} alt="404 Not Found" className="w-64 h-64 mb-8" />
      </FadeIn>
      
      <FadeIn delay={0.4}>
        <Link to="/" className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105">
          Volver al inicio
        </Link>
      </FadeIn>
    </section>
  );
};

export default NotFoundPage;