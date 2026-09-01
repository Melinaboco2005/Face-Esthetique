import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Soin sur Mesure",
      description: "Chaque peau est unique. Nous réalisons un diagnostic personnalisé avant chaque prestation pour adapter nos techniques et produits."
    },
    {
      icon: <Award className="w-6 h-6 text-salon-gold" />,
      title: "Expertise & Innovation",
      description: "Formées en continu aux dernières tendances de l'esthétique, nous allions gestuelle ancestrale et technologies innovantes."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-salon-gold" />,
      title: "Hygiène & Confort",
      description: "Une hygiène irréprochable et un confort absolu. Nos cabines sont stérilisées et préparées avec le plus grand soin pour chaque visite."
    },
    {
      icon: <Heart className="w-6 h-6 text-salon-gold" />,
      title: "Produits Premium",
      description: "Nous sélectionnons rigoureusement nos marques partenaires pour leur efficacité prouvée et le respect de votre peau."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            L'Institut d'Esthétique & de Bien-être
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Découvrez un espace hors du temps dédié à votre détente. Fondé par Hilary, notre salon allie professionnalisme et passion pour sublimer votre beauté naturelle.
          </p>
        </div>

        {/* Story Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-primary-900">Notre Philosophie</h3>
            <p className="text-salon-text leading-relaxed text-justify">
              Depuis notre ouverture, nous plaçons le bien-être au cœur de notre démarche. Nous pensons que prendre soin de soi n'est pas un luxe, mais une nécessité pour équilibrer le corps et l'esprit. L'Écrin de Beauté est pensé comme une retraite apaisante, où chaque détail — des senteurs d'huiles essentielles à la douceur des draps — est conçu pour votre confort.
            </p>
            <div className="p-5 border-l-4 border-salon-gold bg-salon-softBg rounded-r-lg">
              <p className="italic text-primary-900 font-serif">
                "Nous ne transformons pas nos clientes, nous révélons l'éclat qui est déjà en elles grâce à des soins ciblés et des moments de déconnexion totale."
              </p>
              <p className="text-xs text-salon-accent font-bold mt-2 uppercase">— Hilary, Fondatrice & Esthéticienne en chef</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video lg:aspect-auto lg:h-[350px]">
            <img 
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop" 
              alt="Espace détente institut" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className="bg-salon-beige p-6 rounded-xl border border-salon-lightAccent hover:shadow-md transition-all space-y-4 hover:border-salon-gold/50"
            >
              <div className="p-3 bg-white w-fit rounded-lg shadow-sm">
                {val.icon}
              </div>
              <h4 className="text-lg font-serif font-bold text-primary-900">{val.title}</h4>
              <p className="text-sm text-salon-text font-light leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
