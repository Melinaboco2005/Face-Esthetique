import React, { useState, useMemo, useEffect } from 'react';
import { Clock, Phone, X, AlertCircle, Check, ShoppingBag, Trash2 } from 'lucide-react';

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

// Clé unique pour un item de panier : une prestation simple => "id::base",
// une variante précise d'une prestation => "id::indexDeLaVariante"
const getItemKey = (serviceId, variantIndex = 'base') => `${serviceId}::${variantIndex}`;

export default function Services({ services, settings }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [detailService, setDetailService] = useState(null);

  // Panier de sélection : chaque entrée = { key, serviceId, serviceName, itemLabel, price, duration }
  // Persisté dans le navigateur du client pour survivre à un rafraîchissement de page.
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('salon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('salon_cart', JSON.stringify(cart));
    } catch {
      // Stockage indisponible (navigation privée, quota plein...) : on ignore silencieusement.
    }
  }, [cart]);

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

  // --- Gestion du panier ---

  const isInCart = (key) => cart.some((item) => item.key === key);

  const countInCart = (serviceId) => cart.filter((item) => item.serviceId === serviceId).length;

  const toggleVariant = (service, variantIndex) => {
    const key = getItemKey(service.id, variantIndex);
    setCart((prev) => {
      if (prev.some((item) => item.key === key)) {
        return prev.filter((item) => item.key !== key);
      }
      const variant = service.variants[variantIndex];
      return [
        ...prev,
        {
          key,
          serviceId: service.id,
          serviceName: service.name,
          itemLabel: variant.name,
          price: variant.price,
          duration: variant.duration,
        },
      ];
    });
  };

  const toggleBaseService = (service) => {
    const key = getItemKey(service.id);
    setCart((prev) => {
      if (prev.some((item) => item.key === key)) {
        return prev.filter((item) => item.key !== key);
      }
      return [
        ...prev,
        {
          key,
          serviceId: service.id,
          serviceName: service.name,
          itemLabel: null,
          price: service.price,
          duration: service.duration,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + (item.price || 0), 0),
    [cart]
  );

  const hasQuoteOnlyItems = cart.some((item) => !item.price);

  // --- Fiche détail ---

  const handleOpenDetail = (service) => {
    setDetailService(service);
  };

  const handleCloseDetail = () => {
    setDetailService(null);
  };

  // --- Panier / Réservation ---

  const handleOpenCart = () => {
    setDetailService(null);
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    setIsSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !bookingDate || !bookingTime || cart.length === 0) return;

    const dateFormatted = new Date(bookingDate).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    const itemsList = cart
      .map((item) => {
        const label = item.itemLabel ? `${item.serviceName} — ${item.itemLabel}` : item.serviceName;
        const priceLabel = item.price ? formatCurrency(item.price) : 'sur devis';
        return `- ${label} (${priceLabel})`;
      })
      .join('\n');

    const totalLine = hasQuoteOnlyItems
      ? `Total (hors prestations sur devis) : ${formatCurrency(cartTotal)}`
      : `Total : ${formatCurrency(cartTotal)}`;

    const message = `Bonjour, je souhaite réserver les prestations suivantes :\n${itemsList}\n${totalLine}\nDate souhaitée : ${dateFormatted} à ${bookingTime}\nNom : ${visitorName}\nMerci !`;

    const whatsappUrl = `https://wa.me/${settings.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleStartNewSelection = () => {
    setCart([]);
    setIsCartOpen(false);
    setIsSubmitted(false);
    setVisitorName('');
    setBookingDate('');
    setBookingTime('');
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
            Sélectionnez une ou plusieurs prestations — et plusieurs options si besoin — puis envoyez votre demande en un clic.
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
            const selectedCount = countInCart(service.id);
            return (
              <div
                key={service.id}
                onClick={() => handleOpenDetail(service)}
                className={`bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all flex flex-col h-full group cursor-pointer ${
                  selectedCount > 0
                    ? 'border-salon-gold ring-1 ring-salon-gold/40'
                    : 'border-salon-lightAccent hover:border-salon-gold/30'
                }`}
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
                  {selectedCount > 0 && (
                    <span className="absolute top-3 left-3 bg-salon-gold px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {selectedCount} sélectionné{selectedCount > 1 ? 's' : ''}
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

      {/* Bouton flottant : panier de sélection */}
      {cart.length > 0 && !isCartOpen && !detailService && (
        <button
          onClick={handleOpenCart}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-primary-900 hover:bg-salon-accent text-white pl-4 pr-5 py-3 rounded-full shadow-xl transition-all focus:outline-none"
        >
          <span className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-salon-gold text-primary-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </span>
          <span className="text-sm font-semibold">Ma sélection</span>
        </button>
      )}

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

              {detailService.variants ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-salon-text uppercase tracking-wider">
                    Cochez une ou plusieurs options
                  </p>
                  <div className="flex flex-col gap-2">
                    {detailService.variants.map((variant, idx) => {
                      const key = getItemKey(detailService.id, idx);
                      const checked = isInCart(key);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleVariant(detailService, idx)}
                          className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 focus:outline-none ${
                            checked
                              ? 'border-salon-gold bg-salon-softBg'
                              : 'border-salon-lightAccent hover:border-salon-gold/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${checked ? 'border-salon-gold bg-salon-gold' : 'border-salon-lightAccent'}`}>
                              {checked && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <span className="text-sm font-semibold text-primary-900">{variant.name}</span>
                          </div>
                          <span className="text-sm font-serif font-bold text-primary-900 whitespace-nowrap">
                            {formatCurrency(variant.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleBaseService(detailService)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 focus:outline-none ${
                    isInCart(getItemKey(detailService.id))
                      ? 'border-salon-gold bg-salon-softBg'
                      : 'border-salon-lightAccent hover:border-salon-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${isInCart(getItemKey(detailService.id)) ? 'border-salon-gold bg-salon-gold' : 'border-salon-lightAccent'}`}>
                      {isInCart(getItemKey(detailService.id)) && <Check className="w-3 h-3 text-white" />}
                    </span>
                    <span className="text-sm font-semibold text-primary-900">Ajouter cette prestation à ma sélection</span>
                  </div>
                  <span className="text-sm font-serif font-bold text-primary-900 whitespace-nowrap">
                    {formatCurrency(detailService.price)}
                  </span>
                </button>
              )}

              {detailService.duration && !detailService.variants && (
                <div className="flex items-center gap-1.5 text-sm text-salon-accent font-semibold">
                  <Clock className="w-4 h-4" />
                  {detailService.duration} min
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleCloseDetail}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-salon-softBg hover:bg-salon-lightAccent text-primary-900 py-3 rounded-xl text-sm font-semibold transition-all focus:outline-none"
                >
                  Continuer à parcourir
                </button>
                <button
                  onClick={handleOpenCart}
                  disabled={cart.length === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-900 hover:bg-salon-accent disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-semibold shadow-md transition-all focus:outline-none"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Voir ma sélection ({cart.length})
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Cart / Booking Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-salon-lightAccent max-h-[90vh] overflow-y-auto">

            <button
              onClick={handleCloseCart}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-salon-softBg text-salon-accent transition-colors focus:outline-none z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-salon-softBg p-6 border-b border-salon-lightAccent">
              <span className="text-xs font-bold text-salon-gold uppercase tracking-widest">Ma sélection</span>
              <h3 className="text-xl font-bold font-serif text-primary-900 mt-1 mb-0">
                {cart.length} prestation{cart.length > 1 ? 's' : ''} choisie{cart.length > 1 ? 's' : ''}
              </h3>
            </div>

            <div className="p-6 space-y-5">

              {!isSubmitted ? (
                <>
                  {cart.length === 0 ? (
                    <p className="text-sm text-salon-text/70 italic text-center py-4">
                      Votre sélection est vide. Ouvrez une fiche prestation pour ajouter des options.
                    </p>
                  ) : (
                    <ul className="divide-y divide-salon-lightAccent/70">
                      {cart.map((item) => (
                        <li key={item.key} className="py-3 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-primary-900 mt-0">
                              {item.serviceName}
                            </p>
                            {item.itemLabel && (
                              <p className="text-xs text-salon-text/70">{item.itemLabel}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-serif font-bold text-primary-900 whitespace-nowrap">
                              {formatCurrency(item.price)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.key)}
                              className="p-1.5 rounded-full hover:bg-salon-softBg text-salon-text/50 hover:text-salon-accent transition-colors focus:outline-none"
                              aria-label="Retirer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cart.length > 0 && (
                    <>
                      <div className="flex items-center justify-between pt-2 border-t border-salon-softBg">
                        <span className="text-sm font-semibold text-salon-text">
                          {hasQuoteOnlyItems ? 'Total (hors soins sur devis)' : 'Total'}
                        </span>
                        <span className="text-xl font-serif font-bold text-primary-900">
                          {formatCurrency(cartTotal)}
                        </span>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
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
                            <p className="font-light">
                              En cliquant sur le bouton, vous serez redirigé vers WhatsApp pour envoyer votre demande avec toute votre sélection. Le salon devra confirmer manuellement votre créneau{hasQuoteOnlyItems ? ' et vous communiquer le tarif des soins sur devis' : ''}.
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-primary-900 hover:bg-salon-accent text-white py-3 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none"
                        >
                          <Phone className="w-4 h-4" />
                          Envoyer ma sélection sur WhatsApp
                        </button>
                      </form>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-inner">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-primary-900">Demande envoyée !</h4>
                  <p className="text-sm text-salon-text font-light max-w-xs mx-auto">
                    Votre message a été généré avec toute votre sélection. Si la conversation WhatsApp ne s'est pas ouverte automatiquement, veuillez vérifier vos fenêtres pop-up.
                  </p>
                  <p className="text-xs text-salon-accent italic">
                    Statut : En attente de confirmation par l'esthéticienne.
                  </p>
                  <button
                    onClick={handleStartNewSelection}
                    className="mt-4 px-6 py-2 border border-salon-lightAccent hover:bg-salon-softBg text-salon-text rounded-lg text-sm font-semibold transition-all focus:outline-none"
                  >
                    Nouvelle sélection
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