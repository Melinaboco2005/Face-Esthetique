import React, { useState } from 'react';
import { Clock, X, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

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

export default function Services({ services }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [detailService, setDetailService] = useState(null);

  // Le panier est maintenant partagé avec les offres (voir CartContext.jsx)
  const { cart, isInCart, countInCart, toggleItem, openCart } = useCart();

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

  const toggleVariant = (service, variantIndex) => {
    const variant = service.variants[variantIndex];
    toggleItem({
      key: getItemKey(service.id, variantIndex),
      serviceId: service.id,
      serviceName: service.name,
      itemLabel: variant.name,
      price: variant.price,
      duration: variant.duration,
    });
  };

  const toggleBaseService = (service) => {
    toggleItem({
      key: getItemKey(service.id),
      serviceId: service.id,
      serviceName: service.name,
      itemLabel: null,
      price: service.price,
      duration: service.duration,
    });
  };

  // --- Fiche détail ---

  const handleOpenDetail = (service) => {
    setDetailService(service);
  };

  const handleCloseDetail = () => {
    setDetailService(null);
  };

  const handleOpenCart = () => {
    setDetailService(null);
    openCart();
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

    </section>
  );
}
