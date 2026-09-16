import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact({ settings }) {
  return (
    <section id="contact" className="py-20 px-4 bg-salon-beige relative border-t border-salon-lightAccent">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Horaires & Contact
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Retrouvez-nous au salon ou contactez-nous pour toute demande de renseignements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Coordinates & Hours */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Info Column */}
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-serif text-primary-900 mt-0">Nos coordonnées</h3>
                <p className="text-xs text-salon-accent font-light">Pour toute question ou demande particulière, vous pouvez nous joindre par téléphone, Snapchat ou sur nos réseaux sociaux.</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-salon-lightAccent rounded-xl shadow-sm h-fit">
                    <MapPin className="w-5 h-5 text-salon-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary-900">Adresse</h4>
                    <p className="text-sm text-salon-text/80 font-light mt-0.5">{settings.address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-salon-lightAccent rounded-xl shadow-sm h-fit">
                    <Phone className="w-5 h-5 text-salon-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary-900">Téléphone (WhatsApp)</h4>
                    <p className="text-sm text-salon-text/80 font-light mt-0.5">+{settings.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-salon-lightAccent rounded-xl shadow-sm h-fit">
                    <svg className="w-5 h-5 fill-salon-gold" viewBox="0 0 24 24">
                      <path d="M12 2C7.5 2 5 5 5 9v3.5c0 .9-.4 1.7-1.1 2.3l-.7.6c-.5.4-.2 1.2.4 1.2h1.9c.3 1.7 1.8 3 3.6 3h.4c.4 1.2 1.5 2 2.5 2s2.1-.8 2.5-2h.4c1.8 0 3.3-1.3 3.6-3h1.9c.6 0 .9-.8.4-1.2l-.7-.6C18.4 14.2 18 13.4 18 12.5V9c0-4-2.5-7-6-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary-900">Snapchat</h4>
                    
                    <a  href={settings.snapchatUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-salon-text/80 font-light mt-0.5 hover:text-salon-accent transition-colors"
                    >
                      fmakeup34
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold text-salon-text uppercase tracking-widest">Suivez-nous</h4>
                <div className="flex gap-3">
                  <a 
                    href={settings.instagramUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white border border-salon-lightAccent hover:border-salon-gold hover:text-salon-gold text-salon-accent rounded-full transition-all shadow-sm focus:outline-none"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href={settings.facebookUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white border border-salon-lightAccent hover:border-salon-gold hover:text-salon-gold text-salon-accent rounded-full transition-all shadow-sm focus:outline-none"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Hours Column */}
            <div className="bg-white p-6 rounded-2xl border border-salon-lightAccent shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-salon-gold" />
                <h3 className="text-xl font-bold font-serif text-primary-900 my-0">Horaires d'ouverture</h3>
              </div>
              <ul className="divide-y divide-salon-softBg text-sm font-light">
                {settings.hours.map((h, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <span className="font-semibold text-primary-900">{h.day}</span>
                    <span className="text-salon-text/80">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Map Area */}
          <div className="lg:col-span-5 relative w-full h-87.5 bg-white border border-salon-lightAccent rounded-2xl overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-salon-lightAccent/20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <MapPin className="w-12 h-12 text-salon-gold animate-bounce" />
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-primary-900 text-lg">{settings.salonName}</h4>
                <p className="text-sm text-salon-text/80 max-w-xs">{settings.address}</p>
              </div>
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`, '_blank')}
                className="bg-primary-900 hover:bg-salon-accent text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all focus:outline-none"
              >
                Ouvrir dans Google Maps
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
