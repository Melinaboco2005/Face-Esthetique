import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Sparkles, Check, ChevronDown } from 'lucide-react';

const formatPrice = (value) =>
  `${new Intl.NumberFormat('fr-FR').format(value).replace(/\u202f|\u00a0/g, ' ')} F`;

const formatDate = (dateString, withYear = false) =>
  new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    ...(withYear ? { year: 'numeric' } : {}),
  });

const getStatus = (promo, today = new Date()) => {
  const start = new Date(`${promo.startDate}T00:00:00`);
  const end = new Date(`${promo.validUntil}T23:59:59`);
  if (today < start) return { key: 'upcoming', label: 'Bientôt' };
  if (today > end) return { key: 'past', label: 'Terminée' };
  return { key: 'current', label: 'En cours cette semaine' };
};

export default function Promotions({ promotions, campagne }) {
  const activePromos = (promotions || []).filter((promo) => promo.active);
  const [openId, setOpenId] = useState(
    activePromos.find((p) => getStatus(p).key === 'current')?.id || null
  );

  if (activePromos.length === 0) return null;

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="promotions" className="py-20 px-4 bg-salon-softBg relative">
      <div className="max-w-7xl mx-auto space-y-12">

        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            {campagne?.nom || 'Offres & Événements Spéciaux'}
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            {campagne?.accroche ||
              'Profitez de nos remises exclusives pour célébrer la beauté.'}
          </p>
          {campagne?.startDate && campagne?.endDate && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-salon-lightAccent text-sm font-semibold text-primary-900">
              <Calendar className="w-4 h-4 text-salon-accent" />
              Du {formatDate(campagne.startDate)} au {formatDate(campagne.endDate, true)}
            </div>
          )}
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {activePromos.map((promo) => {
            const status = getStatus(promo);
            const isOpen = openId === promo.id;

            return (
              <article
                key={promo.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden border transition-shadow ${
                  status.key === 'current'
                    ? 'border-salon-gold ring-1 ring-salon-gold/40'
                    : 'border-salon-lightAccent'
                } ${status.key === 'past' ? 'opacity-70' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(promo.id)}
                  aria-expanded={isOpen}
                  className="w-full flex flex-col sm:flex-row text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-accent"
                >
                  <div className="sm:w-2/5 bg-linear-to-br from-salon-rose to-primary-900 text-white p-6 flex flex-col items-center justify-center text-center gap-2">
                    <Sparkles className="w-5 h-5 opacity-80" />
                    <span className="text-3xl font-extrabold font-serif leading-none">
                      {promo.title}
                    </span>
                    <span className="text-lg font-serif italic opacity-95">
                      {promo.theme}
                    </span>
                    <span className="mt-2 text-[11px] font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm">
                      {status.label}
                    </span>
                    <span className="text-[11px] opacity-80">
                      Du {formatDate(promo.startDate)} au {formatDate(promo.validUntil)}
                    </span>
                  </div>

                  <div className="flex-1 p-6 flex items-center justify-between gap-4 border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-salon-lightAccent">
                    <p className="text-sm text-salon-text/90 font-light leading-relaxed mt-0">
                      {promo.description}
                    </p>
                    <ChevronDown
                      className={`w-5 h-5 text-salon-accent shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="divide-y divide-salon-lightAccent/70 px-6 pb-6 sm:pl-[calc(40%+1.5rem)]">
                      {promo.services.map((service) => (
                        <li
                          key={service.name}
                          className="py-3 flex items-start justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <h3
                              className={`text-sm font-bold font-serif mt-0 ${
                                service.highlight ? 'text-salon-accent' : 'text-primary-900'
                              }`}
                            >
                              {service.name}
                            </h3>
                            {service.description && (
                              <p className="text-xs text-salon-text/80 font-light leading-relaxed">
                                {service.description}
                              </p>
                            )}
                            {service.includes && (
                              <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                                {service.includes.map((item) => (
                                  <li
                                    key={item}
                                    className="inline-flex items-center gap-1 text-[11px] text-salon-text/70"
                                  >
                                    <Check className="w-3 h-3 text-salon-gold" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="shrink-0 flex flex-col items-end gap-0.5">
                            {service.regularPrice && service.regularPrice > service.price && (
                              <span className="text-xs text-salon-text/50 line-through">
                                {formatPrice(service.regularPrice)}
                              </span>
                            )}
                            <span className="px-3 py-1.5 rounded-lg bg-salon-rose/10 text-salon-accent text-sm font-extrabold whitespace-nowrap">
                              {formatPrice(service.price)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {(campagne?.telephone || campagne?.lieu) && (
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-salon-text">
            {campagne.lieu && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-salon-accent" />
                {campagne.lieu}
              </span>
            )}
            {campagne.telephone && (
              <a
                href={`tel:${campagne.telephone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 font-semibold text-primary-900 hover:text-salon-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-salon-accent" />
                Prendre rendez-vous au {campagne.telephone}
              </a>
            )}
          </div>
        )}

      </div>
    </section>
  );
}