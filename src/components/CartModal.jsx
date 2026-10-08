import React, { useState } from 'react';
import { Phone, X, AlertCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, formatCurrency } from '../context/CartContext';

export default function CartModal({ settings }) {
  const { cart, isCartOpen, openCart, closeCart, removeFromCart, clearCart, cartTotal, hasQuoteOnlyItems } = useCart();

  const [visitorName, setVisitorName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClose = () => {
    closeCart();
    setIsSubmitted(false);
    setConfirmClear(false);
  };

  const handleClearAll = () => {
    clearCart();
    setConfirmClear(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !bookingDate || !bookingTime || cart.length === 0) return;

    const dateFormatted = new Date(bookingDate).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    const itemsList = cart
      .map((item) => {
        const tag = item.tag ? `[${item.tag}] ` : '';
        const label = item.itemLabel ? `${item.serviceName} — ${item.itemLabel}` : item.serviceName;
        const priceLabel = item.price ? formatCurrency(item.price) : 'sur devis';
        return `- ${tag}${label} (${priceLabel})`;
      })
      .join('\n');

    const totalLine = hasQuoteOnlyItems
      ? `Total (hors prestations sur devis) : ${formatCurrency(cartTotal)}`
      : `Total : ${formatCurrency(cartTotal)}`;

    const message = `Bonjour, je souhaite réserver les prestations suivantes :\n${itemsList}\n${totalLine}\nDate souhaitée : ${dateFormatted} à ${bookingTime}\nNom : ${visitorName}\nMerci !`;

    window.open(`https://wa.me/${settings.phone}?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitted(true);
  };

  const handleStartNewSelection = () => {
    clearCart();
    closeCart();
    setIsSubmitted(false);
    setVisitorName('');
    setBookingDate('');
    setBookingTime('');
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent focus:border-salon-gold focus:outline-none text-sm transition-colors';
  const labelClass = 'block text-xs font-bold text-salon-text uppercase tracking-wider mb-1.5';

  return (
    <>
      {/* Bouton flottant */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={openCart}
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

      {/* Modale panier / réservation */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-salon-lightAccent max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-salon-softBg text-salon-accent transition-colors focus:outline-none z-10"
              aria-label="Fermer"
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
                cart.length === 0 ? (
                  <p className="text-sm text-salon-text/70 italic text-center py-4">
                    Votre sélection est vide. Ajoutez une prestation, une offre ou un pack.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center justify-end gap-2 -mb-2">
                      {confirmClear ? (
                        <>
                          <span className="text-xs text-salon-text/70">Tout retirer ?</span>
                          <button
                            type="button"
                            onClick={handleClearAll}
                            className="px-3 py-1 rounded-full bg-salon-rose text-white text-xs font-semibold focus:outline-none"
                          >
                            Oui, tout retirer
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmClear(false)}
                            className="px-3 py-1 rounded-full border border-salon-lightAccent text-salon-text text-xs font-semibold focus:outline-none"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmClear(true)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-salon-text/70 hover:text-salon-rose transition-colors focus:outline-none"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Tout retirer
                        </button>
                      )}
                    </div>

                    <ul className="divide-y divide-salon-lightAccent/70">
                      {cart.map((item) => (
                        <li key={item.key} className="py-3 flex items-start justify-between gap-3">
                          <div>
                            {item.tag && (
                              <span className="inline-block mb-1 px-2 py-0.5 rounded-full bg-salon-gold text-white text-[10px] font-bold uppercase tracking-wider">
                                {item.tag}
                              </span>
                            )}
                            <p className="text-sm font-semibold text-primary-900 mt-0">{item.serviceName}</p>
                            {item.itemLabel && <p className="text-xs text-salon-text/70">{item.itemLabel}</p>}
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

                    <div className="flex items-center justify-between pt-2 border-t border-salon-softBg">
                      <span className="text-sm font-semibold text-salon-text">
                        {hasQuoteOnlyItems ? 'Total (hors soins sur devis)' : 'Total'}
                      </span>
                      <span className="text-xl font-serif font-bold text-primary-900">{formatCurrency(cartTotal)}</span>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                      <div>
                        <label className={labelClass}>Votre Nom & Prénom</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Hilary Cole"
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Date Souhaitée</label>
                          <input type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Heure Souhaitée</label>
                          <input type="time" required value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className={inputClass} />
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
                )
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
                  <p className="text-xs text-salon-accent italic">Statut : En attente de confirmation par l'esthéticienne.</p>
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
    </>
  );
}
