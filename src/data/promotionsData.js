// Campagne anniversaire Institut Face Esthétique — du 1er au 21 septembre 2026
// Données extraites des trois affiches officielles (Semaines 1, 2 et 3).
// Prix en francs CFA (XOF).

export const campagne = {
  nom: 'Mon anniversaire, votre période de beauté',
  accroche: '3 semaines d’offres exceptionnelles pour vous sublimer',
  startDate: '2026-09-01',
  endDate: '2026-09-21',
  lieu: 'Calavi Arconville',
  telephone: '+229 66 22 40 21',
};

export const promotions = [
  {
    id: 'anniv-2026-semaine-1',
    active: true,
    week: 1,
    title: 'Semaine 1',
    theme: 'Beauté & Éclat',
    description:
      'Le visage, la peau et les mains à l’honneur pour retrouver une mine nette et reposée.',
    startDate: '2026-09-01',
    validUntil: '2026-09-07',
    services: [
      {
        name: 'Soin du visage',
        description: 'Un soin complet pour une peau éclatante, nette et revitalisée.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 10000,
      },
      {
        name: 'Gommages corporels + sauna',
        description: 'Élimine les impuretés, affine la peau et procure détente et bien-être.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 20000,
      },
      {
        name: 'Pédicure + manucure',
        description: 'Des mains et des pieds soignés, propres et parfaits jusqu’au bout des ongles.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 8000,
      },
      {
        name: 'Massage relaxant (30 min)',
        description: 'Détente profonde, relâche les tensions et apaise le corps et l’esprit.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 10000,
      },
    ],
  },
  {
    id: 'anniv-2026-semaine-2',
    active: true,
    week: 2,
    title: 'Semaine 2',
    theme: 'Corps & Bien-être',
    description:
      'Une semaine consacrée au corps, au regard et aux finitions qui changent tout.',
    startDate: '2026-09-08',
    validUntil: '2026-09-14',
    services: [
      {
        name: 'Soin complet du corps',
        description:
          'Visage, pédicure et manucure, nails pieds et mains, gommage corps, sauna, massage relaxant, épilation aisselles.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 50000,
        highlight: true,
        includes: [
          'Visage',
          'Pédicure & manucure',
          'Nails pieds & mains',
          'Gommage corps',
          'Sauna',
          'Massage relaxant',
          'Épilation aisselles',
        ],
      },
      {
        name: 'Lipocavitation',
        description: 'Ventre, taille, hanches et cuisses.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 15000,
      },
      {
        name: 'Microblading sourcils',
        description: 'Des sourcils redessinés, denses et symétriques.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 25000,
      },
      {
        name: 'Candy Lips',
        description: 'Lèvres roses, teinte naturelle et longue tenue.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 25000,
      },
      {
        name: 'Extension de cils',
        description: 'Peu importe le modèle choisi.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 10000,
      },
    ],
  },
  {
    id: 'anniv-2026-semaine-3',
    active: true,
    week: 3,
    title: 'Semaine 3',
    theme: 'Féminité & Glamour',
    description:
      'Des soins intimes et ciblés, réalisés par des techniciennes expertes, en toute discrétion.',
    startDate: '2026-09-15',
    validUntil: '2026-09-21',
    services: [
      {
        name: 'Vajacial + bain de siège',
        description: 'Soin complet pour l’hygiène intime, éclat, douceur et bien-être féminin.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 25000,
      },
      {
        name: 'Épilation intégrale maillot + sillon fessier',
        description: 'Douceur, propreté et confort longue durée.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 20000,
      },
      {
        name: 'Soin fessier',
        description: 'Un soin pour des fesses lisses, éclatantes et uniformes.',
        regularPrice: null, // TODO: indiquer le prix normal hors promo
        price: 15000,
      },
    ],
  },
];

export const engagements = [
  'Produits de qualité',
  'Hygiène irréprochable',
  'Techniciennes expertes',
  'Écoute & conseils personnalisés',
  'Satisfaction garantie',
];

export default promotions;
