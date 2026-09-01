import React, { useState } from 'react';
import { Clock, Phone, X, AlertCircle } from 'lucide-react';

export default function Services({ services, settings }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  
  // Booking Form State
  const [visitorName, setVisitorName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous les Soins' },
    { id: 'visage', name: 'Soins Visage' },
    { id: 'corps', name: 'Soins Corps' },
    { id: 'ongles', name: 'Ongles & Spa' },
    { id: 'coiffure', name: 'Coiffure' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const handleOpenBooking = (service) => {
    setSelectedService(service);
    setIsSubmitted(false);
    // Reset form fields
    setVisitorName('');
    setBookingDate('');
    setBookingTime('');
  };

  const handleCloseBooking = () => {
    setSelectedService(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !bookingDate || !bookingTime) return;

    const formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(selectedService.price);
    const dateFormatted = new Date(bookingDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    // Format message for WhatsApp
    const message = `Bonjour, je souhaite réserver la prestation "${selectedService.name}" (${selectedService.duration} min - ${formattedPrice}) le ${dateFormatted} à ${bookingTime} au nom de ${visitorName}. Merci !`;
    const whatsappUrl = `https://wa.me/${settings.phone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <section id="services" className="py-20 px-4 bg-salon-beige relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Nos Prestations & Tarifs
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Parcourez notre carte de soins et réservez votre moment privilégié en quelques clics.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none ${
                activeCategory === cat.id 
                  ? 'bg-primary-900 text-white shadow-md' 
                  : 'bg-white text-salon-text border border-salon-lightAccent hover:border-salon-gold/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl overflow-hidden border border-salon-lightAccent shadow-sm hover:shadow-lg hover:border-salon-gold/30 transition-all flex flex-col h-full group"
            >
              {/* Image with zoom effect */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-salon-accent uppercase tracking-wider">
                  {service.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-serif text-primary-900 group-hover:text-salon-gold transition-colors mt-0">
                    {service.name}
                  </h3>
                  <p className="text-sm text-salon-text/80 font-light line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-salon-softBg flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-salon-accent font-semibold">
                    <Clock className="w-4 h-4" />
                    {service.duration} min
                  </div>
                  <div className="text-lg font-serif font-bold text-primary-900">
                    {formatCurrency(service.price)}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(service)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-salon-softBg hover:bg-primary-900 text-primary-900 hover:text-white py-3 rounded-xl font-semibold transition-all focus:outline-none"
                >
                  <Phone className="w-4 h-4" />
                  Réserver via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-salon-lightAccent">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseBooking}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-salon-softBg text-salon-accent transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="bg-salon-softBg p-6 border-b border-salon-lightAccent">
              <span className="text-xs font-bold text-salon-gold uppercase tracking-widest">Réservation Express</span>
              <h3 className="text-xl font-bold font-serif text-primary-900 mt-1 mb-0">
                {selectedService.name}
              </h3>
              <p className="text-xs text-salon-accent mt-1">
                Prestation de {selectedService.duration} min — {formatCurrency(selectedService.price)}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1.5">
                      Votre Nom & Prénom
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Hilary Cole"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent focus:border-salon-gold focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1.5">
                        Date Souhaitée
                      </label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent focus:border-salon-gold focus:outline-none text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1.5">
                        Heure Souhaitée
                      </label>
                      <input 
                        type="time" 
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent focus:border-salon-gold focus:outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 space-y-1">
                      <p className="font-semibold">Réservation en attente de confirmation</p>
                      <p className="font-light">En cliquant sur le bouton, vous serez redirigé vers WhatsApp pour envoyer la demande. Le salon devra confirmer manuellement votre créneau.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-900 hover:bg-salon-accent text-white py-3 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none"
                  >
                    <Phone className="w-4 h-4" />
                    Envoyer sur WhatsApp
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-inner">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-primary-900">Demande envoyée !</h4>
                  <p className="text-sm text-salon-text font-light max-w-xs mx-auto">
                    Votre message a été généré. Si la conversation WhatsApp ne s'est pas ouverte automatiquement, veuillez vérifier vos fenêtres pop-up.
                  </p>
                  <p className="text-xs text-salon-accent italic">
                    Statut : En attente de confirmation par l'esthéticienne.
                  </p>
                  <button
                    onClick={handleCloseBooking}
                    className="mt-4 px-6 py-2 border border-salon-lightAccent hover:bg-salon-softBg text-salon-text rounded-lg text-sm font-semibold transition-all focus:outline-none"
                  >
                    Fermer la fenêtre
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
