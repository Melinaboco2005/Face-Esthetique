import React, { useState } from 'react';
import { Clock, Phone, X, AlertCircle, Check } from 'lucide-react';

// Couleurs par type de service
const CATEGORY_STYLES = {
  visage: {
    label: 'Visage',
    badge: 'bg-white border border-primary-900 text-primary-900',
    dot: 'bg-white border border-primary-900',
  },
  corps: {
    label: 'Corps',
    badge: 'bg-salon-rose text-white',
    dot: 'bg-salon-rose',
  },
  intimite: {
    label: 'Intimité',
    badge: 'bg-salon-gold text-white',
    dot: 'bg-salon-gold',
  },
  'soins-beaute': {
    label: 'Soins & Beauté',
    badge: 'bg-primary-900 text-white',
    dot: 'bg-primary-900',
  },
};

const DEFAULT_CATEGORY_STYLE = {
  label: 'Autre',
  badge: 'bg-salon-softBg text-primary-900',
  dot: 'bg-salon-softBg',
};

export default function Services({ services, settings }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const [visitorName, setVisitorName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous les Soins' },
    { id: 'visage', name: 'Visage' },
    { id: 'corps', name: 'Corps' },
    { id: 'intimite', name: 'Intimité' },
    { id: 'soins-beaute', name: 'Soins & Beauté' }
  ];

  const filteredServices = activeCategory === 'all'
    ? services.filter(Boolean)
    : services.filter(service => service && service.category === activeCategory);

  const formatCurrency = (amount) => {
    if (!amount) return "Sur devis";
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(amount);
  };

  const getCardPrice = (service) => {
    if (service.variants && service.variants.length > 0) {
      const prices = service.variants.map(v => v.price).filter(Boolean);
      if (prices.length === 0) return "Sur devis";
      return `Dès ${formatCurrency(Math.min(...prices))}`;
    }
    return formatCurrency(service.price);
  };

  const handleOpenDetail = (service) => {
    setDetailService(service);
    setSelectedVariantIndex(0);
  };

  const handleCloseDetail = () => {
    setDetailService(null);
  };

  const buildBookingTarget = (service, variantIndex = null) => {
    if (service.variants && service.variants.length > 0) {
      const variant = service.variants[variantIndex ?? 0];
      return {
        name: `${service.name} — ${variant.name}`,
        price: variant.price,
        duration: variant.duration,
      };
    }
    return { name: service.name, price: service.price, duration: service.duration };
  };

  const handleOpenBooking = (service, variantIndex = null) => {
    setSelectedService(buildBookingTarget(service, variantIndex));
    setIsSubmitted(false);
    setVisitorName('');
    setBookingDate('');
    setBookingTime('');
  };

  const handleCloseBooking = () => {
    setSelectedService(null);
  };

  const handleBookFromDetail = () => {
    const service = detailService;
    setDetailService(null);
    handleOpenBooking(service, service.variants ? selectedVariantIndex : null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !bookingDate || !bookingTime) return;

    const dateFormatted = new Date(bookingDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const priceSegment = selectedService.price ? ` (${formatCurrency(selectedService.price)})` : '';

    const message = `Bonjour, je souhaite réserver la prestation "${selectedService.name}"${priceSegment} le ${dateFormatted} à ${bookingTime} au nom de ${visitorName}. Merci !`;
    const whatsappUrl = `https://wa.me/${settings.phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="services" className="py-20 px-4 bg-salon-beige relative">
      <div className="max-w-7xl mx-auto space-y-12">

        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Nos Prestations & Tarifs
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Parcourez notre carte de soins et réservez votre moment privilégié en quelques clics.
          </p>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const style = CATEGORY_STYLES[service.category] || DEFAULT_CATEGORY_STYLE;
            return (
              <div
                key={service.id}
                onClick={() => handleOpenDetail(service)}
                className="bg-white rounded-2xl overflow-hidden border border-salon-lightAccent shadow-sm hover:shadow-lg hover:border-salon-gold/30 transition-all flex flex-col h-full group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-salon-softBg">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.badge}`}>
                    {style.label}
                  </span>
                  {service.variants && (
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white">
                      {service.variants.length} options
                    </span>
                  )}
                </div>

                <div className="p-5 grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold font-serif text-primary-900 group-hover:text-salon-gold transition-colors mt-0">
                      {service.name}
                    </h3>
                    <p className="text-xs text-salon-text/80 font-light line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-salon-softBg flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                      <span className="text-[11px] text-salon-text/70 font-semibold">{style.label}</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-primary-900">
                      {getCardPrice(service)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleOpenDetail(service); }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-salon-softBg hover:bg-primary-900 text-primary-900 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none"
                  >
                    Voir la fiche
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {detailService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative border border-salon-lightAccent max-h-[90vh] overflow-y-auto">

            <button
              onClick={handleCloseDetail}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/90 hover:bg-salon-softBg text-salon-accent transition-colors focus:outline-none z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-3/4 sm:aspect-video overflow-hidden bg-salon-softBg">
              <img
                src={detailService.image}
                alt={detailService.name}
                className="w-full h-full object-contain"
              />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${(CATEGORY_STYLES[detailService.category] || DEFAULT_CATEGORY_STYLE).badge}`}>
                {(CATEGORY_STYLES[detailService.category] || DEFAULT_CATEGORY_STYLE).label}
              </span>
            </div>

            <div className="p-6 space-y-5">
              <h3 className="text-2xl font-bold font-serif text-primary-900 mt-0">
                {detailService.name}
              </h3>

              <p className="text-sm text-salon-text leading-relaxed">
                {detailService.description}
              </p>

              {detailService.variants && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-salon-text uppercase tracking-wider">Choisissez une option</p>
                  <div className="flex flex-col gap-2">
                    {detailService.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 focus:outline-none ${
                          selectedVariantIndex === idx
                            ? 'border-salon-gold bg-salon-softBg'
                            : 'border-salon-lightAccent hover:border-salon-gold/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selectedVariantIndex === idx ? 'border-salon-gold bg-salon-gold' : 'border-salon-lightAccent'}`}>
                            {selectedVariantIndex === idx && <Check className="w-3 h-3 text-white" />}
                          </span>
                          <span className="text-sm font-semibold text-primary-900">{variant.name}</span>
                        </div>
                        <span className="text-sm font-serif font-bold text-primary-900 whitespace-nowrap">
                          {formatCurrency(variant.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-salon-text/70 italic pt-1">
                    {detailService.variants[selectedVariantIndex].description}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-salon-softBg">
                <div className="flex items-center gap-1.5 text-sm text-salon-accent font-semibold">
                  {(detailService.variants ? detailService.variants[selectedVariantIndex].duration : detailService.duration) ? (
                    <>
                      <Clock className="w-4 h-4" />
                      {(detailService.variants ? detailService.variants[selectedVariantIndex].duration : detailService.duration)} min
                    </>
                  ) : (
                    <span className="text-salon-text/60 italic">Durée sur devis</span>
                  )}
                </div>
                <div className="text-2xl font-serif font-bold text-primary-900">
                  {formatCurrency(detailService.variants ? detailService.variants[selectedVariantIndex].price : detailService.price)}
                </div>
              </div>

              <button
                onClick={handleBookFromDetail}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-900 hover:bg-salon-accent text-white py-3 rounded-xl font-semibold shadow-md transition-all focus:outline-none"
              >
                <Phone className="w-4 h-4" />
                Réserver via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-salon-lightAccent">

            <button
              onClick={handleCloseBooking}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-salon-softBg text-salon-accent transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-salon-softBg p-6 border-b border-salon-lightAccent">
              <span className="text-xs font-bold text-salon-gold uppercase tracking-widest">Réservation Express</span>
              <h3 className="text-xl font-bold font-serif text-primary-900 mt-1 mb-0">
                {selectedService.name}
              </h3>
              <p className="text-xs text-salon-accent mt-1">
                {selectedService.duration ? `${selectedService.duration} min — ` : ''}{formatCurrency(selectedService.price)}
              </p>
            </div>

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
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 space-y-1">
                      <p className="font-semibold">Réservation en attente de confirmation</p>
                      <p className="font-light">En cliquant sur le bouton, vous serez redirigé vers WhatsApp pour envoyer la demande. Le salon devra confirmer manuellement votre créneau{selectedService.price ? '' : ' et vous communiquer le tarif'}.</p>
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