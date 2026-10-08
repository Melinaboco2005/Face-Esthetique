import React from 'react';
import { Check, CalendarClock, Gift, Sparkles } from 'lucide-react';
import { OFFERS } from '../data/offers';
import { useCart, isExpired, formatCurrency } from '../context/CartContext';

const useActiveOffers = () => OFFERS.filter((o) => !isExpired(o.validUntil));

const daysLeft = (validUntil) =>
  Math.ceil((new Date(`${validUntil}T23:59:59`) - new Date()) / 86400000);

const formatDate = (validUntil) =>
  new Date(`${validUntil}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

function Validity({ validUntil }) {
  if (!validUntil) return null;
  const left = daysLeft(validUntil);
  const urgent = left <= 3;
  return (
    <p className={`flex items-center gap-1.5 text-xs font-semibold ${urgent ? 'text-salon-rose' : 'text-salon-text/70'}`}>
      <CalendarClock className="w-3.5 h-3.5" />
      {left <= 1 ? 'Dernier jour !' : urgent ? `Plus que ${left} jours` : `Valable jusqu'au ${formatDate(validUntil)}`}
    </p>
  );
}

function OfferCard({ offer }) {
  const { isInCart, toggleItem } = useCart();
  const isPack = offer.kind === 'pack';
  const tag = isPack ? 'Pack cadeau' : 'Offre spéciale';
  const key = `offer::${offer.id}`;
  const selected = isInCart(key);

  const handleToggle = () =>
    toggleItem({
      key,
      serviceId: `offer-${offer.id}`,
      serviceName: offer.name,
      itemLabel: null,
      tag,
      price: offer.price,
      duration: null,
      validUntil: offer.validUntil,
    });

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4 h-full ${
        selected ? 'border-salon-gold ring-1 ring-salon-gold/40' : 'border-salon-lightAccent'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            isPack ? 'bg-salon-gold text-white' : 'bg-salon-rose text-white'
          }`}
        >
          {isPack ? <Gift className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          {tag}
        </span>
        <Validity validUntil={offer.validUntil} />
      </div>

      <div className="space-y-1.5 grow">
        <h3 className="text-lg font-bold font-serif text-primary-900 mt-0">{offer.name}</h3>
        {offer.audience && <p className="text-xs font-semibold text-salon-gold">Pour : {offer.audience}</p>}
        <p className="text-sm text-salon-text font-light">{offer.description}</p>
        {offer.includes && (
          <ul className="pt-2 space-y-1">
            {offer.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-salon-text">
                <Check className="w-4 h-4 text-salon-gold shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-3 border-t border-salon-softBg flex items-end justify-between gap-3">
        <div>
          {offer.regularPrice && (
            <p className="text-xs text-salon-text/60 line-through">{formatCurrency(offer.regularPrice)}</p>
          )}
          <p className="text-xl font-serif font-bold text-primary-900">{formatCurrency(offer.price)}</p>
        </div>
        <button
          onClick={handleToggle}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none ${
            selected
              ? 'bg-salon-softBg text-primary-900 border border-salon-gold'
              : 'bg-primary-900 hover:bg-salon-accent text-white shadow-md'
          }`}
        >
          {selected ? 'Retirer de ma sélection' : 'Ajouter à ma sélection'}
        </button>
      </div>
    </div>
  );
}

export default function Offers() {
  const active = useActiveOffers();
  if (active.length === 0) return null; // Plus aucune offre en cours : la section disparaît.

  const specials = active.filter((o) => o.kind === 'offre');
  const packs = active.filter((o) => o.kind === 'pack');

  return (
    <section id="offres" className="py-20 px-4 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Offres spéciales & Packs cadeaux
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Des prix réduits pour une durée limitée. Ajoutez-les à votre sélection, comme n'importe quelle prestation.
          </p>
        </div>

        {specials.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-serif text-primary-900 mt-0">Offres spéciales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specials.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </div>
        )}

        {packs.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-serif text-primary-900 mt-0">Packs cadeaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packs.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Bandeau d'accès rapide : à placer sous le hero ou sous la barre de navigation.
export function OffersBanner() {
  const active = useActiveOffers();
  if (active.length === 0) return null;

  return (
    <a
      href="#offres"
      className="flex items-center justify-center gap-2 bg-primary-900 hover:bg-salon-accent text-white text-sm font-semibold py-3 px-4 text-center transition-colors"
    >
      <Sparkles className="w-4 h-4 text-salon-gold shrink-0" />
      Offres spéciales et packs cadeaux à durée limitée : voir les offres
    </a>
  );
}
