import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

export default function Hero({ settings }) {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Bonjour ! Je souhaite planifier un rendez-vous dans votre salon.");
    window.open(`https://wa.me/${settings.phone}?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="relative min-height-[90vh] flex items-center justify-center pt-24 pb-16 px-4 bg-gradient-to-br from-[#FAF6F0] via-[#FCF9F5] to-[#F5EFEB] overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-salon-rose/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-salon-gold/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Area */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-salon-rose/10 text-salon-accent text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-salon-rose animate-ping"></span>
            Votre parenthèse bien-être
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif text-primary-900">
            Révélez votre beauté naturelle dans notre <span className="italic text-salon-gold font-normal">écrin de douceur</span>
          </h1>
          
          <p className="text-base sm:text-lg text-salon-text max-w-xl mx-auto lg:mx-0 font-light">
            Découvrez nos soins du visage haute technologie, nos massages enveloppants et notre service d'onglerie d'exception. Un havre de paix conçu pour sublimer votre bien-être.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 bg-primary-900 text-white hover:bg-salon-accent px-8 py-4 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Réserver via WhatsApp
            </button>
            
            <button
              onClick={() => handleScrollTo('services')}
              className="flex items-center justify-center gap-2 bg-transparent border border-salon-accent text-salon-accent hover:bg-salon-softBg px-8 py-4 rounded-full text-base font-semibold transition-all"
            >
              Découvrir nos soins
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="relative w-full max-w-[400px] sm:max-w-[450px] mx-auto">
            {/* Elegant double borders / backgrounds */}
            <div className="absolute inset-0 border border-salon-gold rounded-2xl transform translate-x-4 translate-y-4 pointer-events-none"></div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white aspect-[3/4]">
              <img 
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop" 
                alt="Ambiance Soin Esthétique" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating details banner */}
            <div className="absolute bottom-6 left-[-20px] bg-white p-4 rounded-lg shadow-lg border border-salon-lightAccent max-w-[200px] hidden sm:block">
              <p className="text-xs text-salon-accent uppercase tracking-widest font-bold mb-1">Salon Pro</p>
              <p className="text-sm font-serif font-semibold text-primary-900">Élu meilleur institut de beauté local 2026</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
