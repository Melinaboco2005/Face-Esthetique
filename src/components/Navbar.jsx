import React, { useState } from 'react';
import { Menu, X, Settings, Phone } from 'lucide-react';

export default function Navbar({ onNavigate, currentTab, settings }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Visite 360°", href: "#gallery" },
    { name: "Offres", href: "#promotions" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    onNavigate('home', href);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Bonjour ! Je souhaite avoir des informations sur vos prestations et planifier un rendez-vous.");
    window.open(`https://wa.me/${settings.phone}?text=${message}`, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-40 border-b border-salon-lightAccent transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => handleLinkClick('#home')} 
              className="text-left font-serif text-xl sm:text-2xl tracking-widest text-primary-900 font-bold focus:outline-none"
            >
              L'ÉCRIN DE BEAUTÉ
              <span className="block text-[9px] font-sans tracking-[0.25em] text-salon-gold uppercase font-semibold">Salon d'Esthétique & Spa</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-salon-text hover:text-salon-gold transition-colors focus:outline-none px-1 py-2"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => onNavigate('admin')}
              className={`p-2 rounded-full hover:bg-salon-softBg text-salon-accent hover:text-primary-900 transition-colors focus:outline-none ${currentTab === 'admin' ? 'bg-salon-softBg text-primary-900' : ''}`}
              title="Espace Administration"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-primary-900 text-white hover:bg-salon-accent px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none"
            >
              <Phone className="w-4 h-4" />
              Réserver
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('admin')}
              className="p-2 rounded-full text-salon-accent hover:bg-salon-softBg focus:outline-none"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-salon-text hover:bg-salon-softBg focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-salon-lightAccent px-4 pt-2 pb-6 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-salon-text hover:bg-salon-softBg hover:text-salon-gold transition-colors focus:outline-none"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-salon-lightAccent">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-primary-900 text-white px-5 py-3 rounded-full text-base font-semibold shadow-md focus:outline-none"
            >
              <Phone className="w-5 h-5" />
              Réserver via WhatsApp
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
