import React from 'react';
import { 
  GraduationCap, Award, CheckCircle2, Sparkles, 
  Globe, Users, Trophy, Clock, MapPin, Phone
} from 'lucide-react';

export default function FormationsComplete() {
  // Les parcours de formation
  const parcours = [
    {
      icon: "🎓",
      title: "STAGE PROFESSIONNEL",
      description: "Immersion pratique en institut pour une expérience réelle du métier."
    },
    {
      icon: "♻️",
      title: "RECYCLAGE PROFESSIONNEL",
      description: "Perfectionnez vos compétences et restez à jour avec les nouvelles techniques."
    },
    {
      icon: "✨",
      title: "MINI FORMATIONS SPÉCIALISÉES",
      description: "Formations ciblées pour maîtriser des techniques précises."
    },
    {
      icon: "👑",
      title: "CARRIÈRE COMPLÈTE EN ESTHÉTIQUE",
      description: "Devenez une professionnelle qualifiée, polyvalente et indépendante."
    }
  ];

  // Durée des formations
  const durees = [
    {
      mois: "6 MOIS",
      subtitle: "Formation intensive",
      description: "pour une insertion rapide dans le métier"
    },
    {
      mois: "1 AN",
      subtitle: "Parcours complet",
      description: "pour acquérir les bases solides et professionnelles"
    },
    {
      mois: "2 ANS",
      subtitle: "Formation approfondie",
      description: "pour devenir une experte polyvalente"
    },
    {
      mois: "3 ANS",
      subtitle: "Parcours d'excellence",
      description: "pour maîtriser l'esthétique générale & médicale"
    }
  ];

  // Spécialités qu'on apprend
  const specialites = [
    "SOINS DU VISAGE",
    "SOINS CORPORELS",
    "ÉPILATIONS",
    "MAQUILLAGE",
    "ONGLES",
    "MASSAGES & BIEN-ÊTRE",
    "TECHNOLOGIES ESTHÉTIQUES",
    "HYGIÈNE & SÉCURITÉ"
  ];

  // Points forts
  const pointsForts = [
    "FORMATRICES EXPERTES",
    "PRATIQUE 100%",
    "SUIVI PERSONNALISÉ",
    "MATÉRIEL PROFESSIONNEL",
    "ATTESTATION RECONNUE",
    "ACCOMPAGNEMENT À L'INSERTION PROFESSIONNELLE"
  ];

  // Pour qui
  const pourQui = [
    "Passionnées de beauté",
    "Étudiantes ou professionnelles souhaitant se perfectionner",
    "Celles qui veulent lancer leur propre institut",
    "Celles qui rêvent d'une carrière stable et épanouissante"
  ];

  return (
    <section id="formations" className="py-20 px-4 bg-gradient-to-b from-white via-salon-softBg to-white">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Titre Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold font-serif">
            <span className="text-salon-accent">Faites de votre passion</span>
            <br />
            <span className="text-primary-900">VOTRE MÉTIER !</span>
          </h2>
          <div className="w-20 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-lg font-semibold text-salon-accent">
            DEVENEZ UNE EXPERTE RECONNUE EN ESTHÉTIQUE GÉNÉRALE & MÉDICALE
          </p>
        </div>

        {/* Les 4 Parcours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parcours.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 border-2 border-salon-gold shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-primary-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-salon-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* POUR QUI ? */}
        <div className="bg-white rounded-xl p-8 border-2 border-salon-gold">
          <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">POUR QUI ?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pourQui.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-salon-gold shrink-0" />
                <span className="text-salon-text font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DURÉE DES FORMATIONS */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary-900 text-center">DURÉE DES FORMATIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {durees.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border-2 border-salon-gold text-center space-y-3"
              >
                <div className="inline-block bg-salon-gold bg-opacity-20 px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 text-salon-gold mx-auto mb-2" />
                  <p className="font-bold text-primary-900 text-lg">{item.mois}</p>
                </div>
                <p className="font-semibold text-primary-900">{item.subtitle}</p>
                <p className="text-xs text-salon-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VOUS APPRENDREZ */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary-900 text-center">VOUS APPRENDREZ</h3>
          <div className="bg-gradient-to-r from-salon-accent to-salon-gold rounded-xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {specialites.map((item, idx) => (
                <div key={idx} className="text-center text-white">
                  <div className="text-4xl mb-2">
                    {idx === 0 && "👃"}
                    {idx === 1 && "💆"}
                    {idx === 2 && "✂️"}
                    {idx === 3 && "💄"}
                    {idx === 4 && "💅"}
                    {idx === 5 && "🧖"}
                    {idx === 6 && "⚙️"}
                    {idx === 7 && "🛡️"}
                  </div>
                  <p className="text-xs font-bold leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LES + DE NOS FORMATIONS */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary-900 text-center">LES + DE NOS FORMATIONS</h3>
          <div className="bg-white rounded-xl p-8 border-2 border-salon-gold">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {pointsForts.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-salon-gold bg-opacity-15 rounded-lg p-4 mb-3 h-full flex flex-col items-center justify-center">
                    <Trophy className="w-6 h-6 text-salon-gold mb-2" />
                    <p className="text-xs font-bold text-primary-900 leading-tight">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIPLÔMES CERTIFIANTS */}
        <div className="bg-gradient-to-r from-salon-accent to-salon-gold rounded-xl p-8 text-white">
          <div className="flex items-center gap-4 justify-center">
            <Award className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-xl">DIPLÔMES CERTIFIANTS</h3>
              <p className="text-sm opacity-90">Formations certifiées et reconnues par le Diplôme d'État et CQM</p>
            </div>
          </div>
        </div>

        {/* CTA + Infos */}
        <div className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <p className="text-xl font-bold text-primary-900">INVESTISSEZ EN VOUS, CHANGEZ VOTRE AVENIR !</p>
            <p className="text-salon-accent font-italic">Votre réussite, notre mission ❤️</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a 
              href="#contact"
              className="block bg-primary-900 hover:bg-salon-accent text-white px-8 py-4 rounded-full text-center font-bold shadow-lg hover:shadow-xl transition-all"
            >
              🎓 PRENDRE RENDEZ-VOUS POUR PLUS D'INFORMATIONS
            </a>
            <div className="bg-white border-2 border-salon-gold rounded-full px-8 py-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-primary-900 font-bold">
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}