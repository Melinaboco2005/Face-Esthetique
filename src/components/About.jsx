import React from 'react';
import { Sparkles, ShieldCheck, Heart, Lock, GraduationCap, Users, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-salon-gold" />,
      title: "Professionnalisme",
      description: "Chaque prestation est réalisée avec sérieux, précision et responsabilité."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-salon-gold" />,
      title: "Hygiène",
      description: "Le respect des règles d'hygiène est essentiel dans les métiers de l'esthétique et de la beauté."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-salon-gold" />,
      title: "Qualité",
      description: "Nous accordons une grande importance à la qualité du travail et à la satisfaction de la clientèle."
    },
    {
      icon: <Heart className="w-6 h-6 text-salon-gold" />,
      title: "Respect",
      description: "Chaque cliente est accueillie avec respect, attention et considération."
    },
    {
      icon: <Lock className="w-6 h-6 text-salon-gold" />,
      title: "Discrétion",
      description: "La confidentialité et le respect de l'intimité de la clientèle font partie de nos principes essentiels."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-salon-gold" />,
      title: "Formation continue",
      description: "Le secteur de la beauté évolue constamment : nous continuons à apprendre et à perfectionner nos techniques."
    },
    {
      icon: <Users className="w-6 h-6 text-salon-gold" />,
      title: "Transmission",
      description: "Le savoir-faire acquis au fil des années est transmis à la nouvelle génération de professionnelles."
    }
  ];

  const domaines = [
    "Esthétique générale",
    "Esthétique médicale",
    "Soins & Beauté",
    "Maquillage",
    "Formation professionnelle",
    "Formation certifiante"
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            L'Institut Face Esthétique
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Make Up, Soins & Beauté — un institut spécialisé dans les métiers de la beauté, des soins esthétiques et de la formation professionnelle.
          </p>
        </div>

        {/* Story Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-primary-900">Notre Histoire</h3>
            <p className="text-salon-text leading-relaxed text-justify">
              FACE ESTHÉTIQUE a été créé le 4 novembre 2017 par Faton Grâce, à partir d'une passion pour l'esthétique, la beauté et la mise en valeur de la femme. Depuis sa création, l'institut a évolué autour de deux axes principaux : la prestation de services dans le domaine de la beauté et la transmission des compétences professionnelles.
            </p>
            <p className="text-salon-text leading-relaxed text-justify">
              L'institut propose ainsi différentes prestations en esthétique générale, esthétique médicale, soins & beauté et maquillage, tout en développant une activité de formation professionnelle et certifiante.
            </p>

            {/* Name origin callout */}
            <div className="p-5 border-l-4 border-salon-gold bg-salon-softBg rounded-r-lg">
              <p className="text-xs text-salon-accent font-bold uppercase tracking-widest mb-2">L'origine du nom</p>
              <p className="text-primary-900 font-serif text-lg">
                <span className="font-bold">FA</span>TON + GRÂ<span className="font-bold">CE</span> = <span className="italic">FACE</span>
              </p>
              <p className="text-sm text-salon-text mt-2">
                Un nom né de l'identité de la fondatrice, et qui renvoie symboliquement au visage — au cœur de l'univers de l'esthétique.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video lg:aspect-auto lg:h-100">
            <img
              src="/images/802245299_1585931339578689_1630081412672311993_n.jpg"
              alt="Espace détente de l'institut Face Esthétique"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Founder */}
        <div className="bg-salon-softBg rounded-2xl p-8 lg:p-10 space-y-4">
          <h3 className="text-2xl font-serif text-primary-900">Faton Grâce, Fondatrice</h3>
          <p className="text-salon-text leading-relaxed text-justify max-w-4xl">
            Formatrice professionnelle et esthéticienne, Faton Grâce possède un parcours diversifié : diplômes en Esthétique Générale, Soins et Beauté, Coiffure Générale et CQM, ainsi qu'une attestation en Esthétique Médicale. Elle a développé des compétences spécialisées en extension de cils, microblading et micropigmentation des lèvres.
          </p>
        </div>

        {/* Domaines d'activité */}
        <div className="flex flex-wrap justify-center gap-3">
          {domaines.map((d, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-white border border-salon-lightAccent text-sm font-medium text-salon-accent"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
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