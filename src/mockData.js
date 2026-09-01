// Données initiales du site vitrine et du Back-Office

export const initialSettings = {
  salonName: "L'Écrin de Beauté",
  phone: "22997979797", // Numéro WhatsApp professionnel au format international (Bénin par défaut)
  email: "contact@ecrindebeaute.com",
  address: "Rue de l'Aéroport, Cotonou, Bénin",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  hours: [
    { day: "Lundi", time: "Fermé" },
    { day: "Mardi", time: "09:00 – 19:00" },
    { day: "Mercredi", time: "09:00 – 19:00" },
    { day: "Jeudi", time: "09:00 – 20:00" },
    { day: "Vendredi", time: "09:00 – 20:00" },
    { day: "Samedi", time: "09:00 – 19:00" },
    { day: "Dimanche", time: "10:00 – 16:00" }
  ]
};

export const initialServices = [
  {
    id: "1",
    name: "Soin Éclat Hydratant",
    category: "visage",
    price: 35000, // Prix en CFA (par exemple) ou en devise locale
    duration: 60,
    description: "Un soin du visage complet nettoyant et hydratant en profondeur, adapté à tous types de peaux. Redonne immédiatement éclat et fraîcheur au teint.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Soin Anti-Âge Suprême",
    category: "visage",
    price: 55000,
    duration: 75,
    description: "Traitement liftant haute performance aux actifs régénérants. Atténue visiblement les ridules et raffermit les contours du visage.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Massage Relaxant aux Huiles Essentielles",
    category: "corps",
    price: 40000,
    duration: 60,
    description: "Modelage relaxant de l'ensemble du corps. Idéal pour dénouer les tensions musculaires et libérer le stress quotidien.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Gommage Corporel & Enveloppement",
    category: "corps",
    price: 30000,
    duration: 45,
    description: "Exfoliation douce de la peau suivie d'un enveloppement hydratant. Laisse la peau douce, lisse et veloutée.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Manucure Complète & Pose de Vernis",
    category: "ongles",
    price: 18000,
    duration: 45,
    description: "Soin complet des ongles et des cuticules, limage, gommage des mains et pose de vernis semi-permanent de haute qualité.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Beauté des Pieds & Spa",
    category: "ongles",
    price: 25000,
    duration: 60,
    description: "Bain de pieds relaxant, élimination des callosités, massage hydratant et pose de vernis. Une véritable parenthèse de détente.",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Brushing & Soin Capillaire Profond",
    category: "coiffure",
    price: 20000,
    duration: 45,
    description: "Shampoing traitant, soin capillaire adapté à la nature de vos cheveux, et brushing lisse ou ondulé longue tenue.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop"
  }
];

export const initialPromotions = [
  {
    id: "p1",
    title: "Offre de Bienvenue",
    description: "-15% sur votre première prestation au salon sur présentation de cette offre.",
    discount: "15%",
    code: "BIENVENUE15",
    validUntil: "2026-10-31",
    active: true
  },
  {
    id: "p2",
    title: "Rituel Détente Automnale",
    description: "Un massage relaxant d'une heure acheté = un gommage corporel de 30 minutes offert.",
    discount: "Gommage Offert",
    code: "RITUELAUTO",
    validUntil: "2026-11-15",
    active: true
  }
];

export const initialFaq = [
  {
    id: "f1",
    question: "Quels types de vernis utilisez-vous pour les ongles ?",
    answer: "Nous utilisons exclusivement des vernis professionnels longue tenue et semi-permanents des marques OPI et Gelish, garantissant brillance et protection de l'ongle.",
    dateSubmitted: "2026-08-20",
    active: true
  },
  {
    id: "f2",
    question: "Dois-je réserver à l'avance pour une simple manucure ?",
    answer: "Il est fortement recommandé de réserver au moins 24 heures à l'avance afin de vous garantir une place au créneau horaire souhaité, même pour des prestations rapides.",
    dateSubmitted: "2026-08-22",
    active: true
  },
  {
    id: "f3",
    question: "Proposez-vous des massages pour femmes enceintes ?",
    answer: "Oui, nous proposons un massage prénatal spécifiquement adapté pour soulager les tensions et s'adapter aux besoins de la future maman à partir du 4ème mois de grossesse.",
    dateSubmitted: "2026-08-24",
    active: true
  }
];

// Galerie immersive 360° hotspots / diaporama
export const galleryHotspots = [
  {
    id: "g1",
    title: "Espace Accueil",
    description: "Un accueil chaleureux et épuré où vous êtes pris en charge par notre équipe. Installez-vous confortablement pour une tisane de bienvenue.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop",
    x: 25, // Position X en % sur l'image de fond
    y: 65  // Position Y en % sur l'image de fond
  },
  {
    id: "g2",
    title: "Cabine de Soin Sérénité",
    description: "Une cabine chauffée et intimiste avec une lumière tamisée, conçue pour nos soins du visage et massages corporels.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
    x: 60,
    y: 35
  },
  {
    id: "g3",
    title: "Espace Onglerie & Spa",
    description: "Un espace moderne et convivial équipé de fauteuils massants professionnels pour votre mise en beauté des mains et des pieds.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    x: 80,
    y: 75
  }
];
