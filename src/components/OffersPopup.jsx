import React, { useEffect, useState } from 'react';
import { X, Sparkles, Gift, CalendarClock } from 'lucide-react';
import { OFFERS } from '../data/offers';
import { isExpired, formatCurrency } from '../context/CartContext';

const SEEN_KEY = 'salon_offers_popup_seen';

// Annonce affichée à l'arrivée sur le site : une seule fois par visite,
// et seulement s'il reste au moins une offre en cours.
export default function OffersPopup() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // sert à l'animation d'entrée/sortie

  const active = OFFERS.filter((o) => !isExpired(o.validUntil));
  const hasOffers = active.length > 0;

  // Ouverture automatique après un court délai
  useEffect(() => {
    if (!hasOffers) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY) === '1') return;
    } catch {
      // sessionStorage indisponible : on affiche quand même
    }
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [hasOffers]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [open]);

  const close = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // ignoré
    }
    setVisible(false);
    setTimeout(() => setOpen(false), 250);
  };

  const goToOffers = () => {
    close();
    setTimeout(() => {
      document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 280);
  };

  // Fermeture avec la touche Échap
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const specials = active.filter((o) => o.kind === 'offre');
  const packs = active.filter((o) => o.kind === 'pack');
  const minSpecial = specials.length ? Math.min(...specials.map((o) => o.price)) : null;
  const minPack = packs.length ? Math.min(...packs.map((o) => o.price)) : null;
  const nearestEnd = active.map((o) => o.validUntil).filter(Boolean).sort()[0];
  const endLabel = nearestEnd
    ? new Date(`${nearestEnd}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    : null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Offres spéciales"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-salon-gold bg-white transition-all duration-300 ${
          visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-primary-900 transition-colors focus:outline-none"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* En-tête sombre et doré, dans l'esprit de vos flyers */}
        <div className="bg-primary-900 text-center px-6 pt-8 pb-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-salon-rose text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            Durée limitée
          </div>
          <h2 className="font-serif text-3xl font-bold text-salon-gold leading-tight border-none pb-0 my-0">
            Nos offres spéciales
          </h2>
          <p className="text-sm text-white/85 font-light italic">Prenez soin de vous à petits prix !</p>
        </div>

        <div className="p-6 space-y-4 text-center">
          <div className="space-y-2">
            {minSpecial && (
              <div className="flex items-center justify-between gap-3 bg-salon-softBg rounded-xl px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-primary-900">
                  <Sparkles className="w-4 h-4 text-salon-rose" />
                  Soins à petits prix
                </span>
                <span className="text-sm font-serif font-bold text-primary-900 whitespace-nowrap">
                  dès {formatCurrency(minSpecial)}
                </span>
              </div>
            )}
            {minPack && (
              <div className="flex items-center justify-between gap-3 bg-salon-softBg rounded-xl px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-primary-900">
                  <Gift className="w-4 h-4 text-salon-gold" />
                  Packs cadeaux
                </span>
                <span className="text-sm font-serif font-bold text-primary-900 whitespace-nowrap">
                  dès {formatCurrency(minPack)}
                </span>
              </div>
            )}
          </div>

          {endLabel && (
            <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-salon-rose">
              <CalendarClock className="w-4 h-4" />
              Offres valables jusqu'au {endLabel}
            </p>
          )}

          <div className="space-y-2 pt-1">
            <button
              onClick={goToOffers}
              className="w-full bg-primary-900 hover:bg-salon-accent text-white py-3 rounded-xl font-semibold shadow-md transition-all focus:outline-none"
            >
              Voir les offres
            </button>
            <button
              onClick={close}
              className="w-full text-xs font-semibold text-salon-text/70 hover:text-primary-900 py-2 transition-colors focus:outline-none"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
