import React from 'react';
import { Calendar, Tag } from 'lucide-react';

export default function Promotions({ promotions }) {
  const activePromos = promotions.filter(promo => promo.active);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (activePromos.length === 0) return null;

  return (
    <section id="promotions" className="py-20 px-4 bg-salon-softBg relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Offres & Événements Spéciaux
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Profitez de nos remises exclusives et découvrez nos prochains événements pour célébrer la beauté.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {activePromos.map((promo) => (
            <div 
              key={promo.id} 
              className="bg-white rounded-2xl p-6 sm:p-8 border border-salon-lightAccent shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Gold Ribbon / Corner Deco */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-salon-gold/20 to-transparent pointer-events-none rounded-tr-2xl"></div>
              
              <div className="space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-rose/15 text-salon-accent text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  Code : {promo.code}
                </div>

                <h3 className="text-2xl font-bold font-serif text-primary-900 mt-0">
                  {promo.title}
                </h3>
                
                <p className="text-sm text-salon-text/90 font-light leading-relaxed">
                  {promo.description}
                </p>
              </div>

              {/* Promo Footer Info */}
              <div className="pt-6 mt-6 border-t border-salon-softBg flex items-center justify-between text-xs sm:text-sm font-semibold text-salon-accent">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Valable jusqu'au :
                </div>
                <div className="text-primary-900 font-bold">
                  {formatDate(promo.validUntil)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
