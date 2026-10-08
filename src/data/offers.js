// Offres à durée limitée.
// - validUntil : dernier jour de validité, format 'AAAA-MM-JJ' (inclus). null = sans limite.
//   Une fois la date passée, l'offre disparaît du site et du panier automatiquement.
// - regularPrice (facultatif) : prix habituel, affiché barré à côté du prix de l'offre.
// - kind : 'offre' (offre spéciale) ou 'pack' (pack cadeau).
// ⚠️ Les dates ci-dessous sont des exemples : mettez les vraies dates de vos flyers.

export const OFFERS = [
  {
    id: 'soin-visage',
    kind: 'offre',
    name: 'Soin du visage',
    description: 'Peau nette, sans boutons et éclatante !',
    price: 10000,
    validUntil: '2026-10-31',
  },
  {
    id: 'pedicure-manucure',
    kind: 'offre',
    name: 'Pédicure + Manucure',
    description: 'Des mains et pieds toujours propres et élégants !',
    price: 8000,
    validUntil: '2026-10-31',
  },
  {
    id: 'sauna-gommage-massage',
    kind: 'offre',
    name: 'Sauna + Gommage + Massage relaxant',
    description: 'Détente, peau douce et bien-être total !',
    price: 25000,
    validUntil: '2026-10-31',
  },
  {
    id: 'massage-corps-1h',
    kind: 'offre',
    name: 'Massage du corps 1h',
    description: 'Détente, soulagement des tensions et bien-être assuré !',
    price: 15000,
    validUntil: '2026-10-31',
  },
  {
    id: 'vajacial-bain-sucre',
    kind: 'offre',
    name: 'Vajacial + Bain pour serrer et sucre Jessica',
    description: 'Hygiène, fraîcheur et confiance !',
    price: 25000,
    validUntil: '2026-10-31',
  },
  {
    id: 'vajacial-aisselles',
    kind: 'offre',
    name: 'Vajacial + Épilation des aisselles',
    description: 'Une peau propre, douce et sans odeur !',
    price: 25000,
    validUntil: '2026-10-31',
  },
  {
    id: 'pack-homme',
    kind: 'pack',
    audience: 'Père, mari, frère ou pote',
    name: 'Pack cadeau Homme',
    description: 'Un moment unique de bien-être à offrir.',
    price: 45000,
    includes: [
      'Sauna',
      'Massage relaxant',
      'Pédicure & manucure',
      'Soin du visage éclat',
      'Une bouteille de vin rouge',
    ],
    validUntil: '2026-10-31',
  },
  {
    id: 'pack-femme',
    kind: 'pack',
    audience: 'Mère, épouse, sœur ou bestie',
    name: 'Pack cadeau Femme',
    description: 'En un seul pack, tout pour sa beauté.',
    price: 60000,
    includes: [
      'Sauna',
      'Gommage corporel',
      'Pédicure & manucure',
      'Soin du visage + extraction',
      'Épilation des aisselles',
      'Pose capsule + VSP',
      'Massage relaxant',
      'Un rafraîchissement',
    ],
    validUntil: '2026-10-31',
  },
];
