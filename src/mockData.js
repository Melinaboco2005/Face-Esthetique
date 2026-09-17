// Données initiales du site vitrine et du Back-Office

export const initialSettings = {
  salonName: "Face Esthétique",
  phone: "22966224021",
  snapchatUrl: "https://snapchat.com/add/fmakeup34",
  address: "Calavi Arconville, Rue Pavé du Supermarché du Pont, 6ème von à droite, Bénin",
  instagramUrl: "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fface__institut_229",
  facebookUrl: "https://www.facebook.com/FemyChou",
  hours: [
    { day: "Lundi", time: "Fermé" },
    { day: "Mardi", time: "09:00 – 19:30" },
    { day: "Mercredi", time: "09:00 – 19:30" },
    { day: "Jeudi", time: "09:00 – 19:30" },
    { day: "Vendredi", time: "09:00 – 19:30" },
    { day: "Samedi", time: "09:00 – 19:30" },
    { day: "Dimanche", time: "10:30 – 17:00" }
  ]
};

// Catégories : visage (blanc), corps (rose), intimite (doré), soins-beaute (noir)
export const initialServices = [
  {
    id: "1",
    name: "Soins du Visage",
    category: "visage",
    image: "/images/soins_du_visage.jpg",
    description: "Une gamme complète de soins ciblés et personnalisés pour révéler votre beauté naturelle.",
    variants: [
      { name: "Soin du Visage Éclat", price: 15000, duration: null, description: "Illumine le teint, hydrate et redonne de l'éclat à la peau." },
      { name: "Soin du Visage Hydrafacial", price: 18000, duration: null, description: "Nettoie en profondeur, hydrate et revitalise la peau." },
      { name: "Soin Anti-Âge", price: 25000, duration: null, description: "Réduit les rides, raffermit et redonne jeunesse à la peau." },
      { name: "Soin Peeling", price: 17000, duration: null, description: "Exfolie en douceur, élimine les cellules mortes et affine le grain de peau." },
      { name: "Soin à la Vitamine C", price: 17000, duration: null, description: "Booste l'éclat, unifie le teint et protège contre les signes du temps." },
      { name: "Soin au Collagène", price: 20000, duration: null, description: "Hydrate intensément, améliore l'élasticité et la fermeté de la peau." },
      { name: "Soin du Visage associé au Dermaplaning", price: 18000, duration: null, description: "Exfolie, élimine le duvet et les peaux mortes pour un teint lisse et lumineux." },
      { name: "Traitement Acné Sévère", price: 20000, duration: null, description: "Réduit l'inflammation, combat les imperfections et purifie la peau en profondeur." },
      { name: "Abonnement Soin Éclat (4 séances)", price: 50000, duration: null, description: "Pour une peau lumineuse et éclatante toute l'année." },
      { name: "Abonnement Soin Acnés/Boutons (4 séances)", price: 70000, duration: null, description: "Pour une peau nette, saine et sans imperfections." }
    ]
  },
  {
    id: "2",
    name: "Micropigmentation des Lèvres (Lip Blush)",
    category: "visage",
    image: "/images/lip_blush.jpg",
    description: "Redonnez couleur, définition et éclat à vos lèvres en toute élégance.",
    variants: [
      { name: "Lip Blush Naturel", price: 60000, duration: 120, description: "Effet nude naturel pour rehausser la couleur de vos lèvres tout en conservant un rendu doux et frais." },
      { name: "Ombre Lips", price: 65000, duration: 120, description: "Effet dégradé lumineux pour des lèvres plus pulpeuses et un rendu élégant et sophistiqué." },
      { name: "Neutralisation Lèvres Foncées", price: 70000, duration: 120, description: "Corrige et éclaircit les lèvres foncées pour un teint uniforme et naturel." },
      { name: "Pack Neutralisation + Lip Blush", price: 100000, duration: 120, description: "Neutralisation des lèvres foncées suivie d'un Lip Blush pour un résultat harmonieux et durable." },
      { name: "Retouche (6-8 semaines)", price: 20000, duration: null, description: "Retouche recommandée entre 6 et 8 semaines après la séance initiale." }
    ]
  },
  {
    id: "3",
    name: "Micropigmentation des Sourcils",
    category: "visage",
    image: "/images/microblading_crop.jpg",
    description: "Des sourcils naturels, harmonieux et élégants, sublimés par une technicienne experte.",
    variants: [
      { name: "Microshading Ombré", price: 40000, duration: null, description: "Technique d'ombrage pour un effet maquillé doux, naturel et sophistiqué." },
      { name: "Microblading Poil à Poil", price: 50000, duration: null, description: "Redessine vos sourcils poil à poil pour un rendu ultra naturel et durable." },
      { name: "Combo Brows", price: 50000, duration: null, description: "L'alliance parfaite entre poil à poil et ombrage pour un résultat complet et harmonieux." }
    ]
  },
  {
    id: "4",
    name: "Extension de Cils",
    category: "visage",
    image: "/images/extensions_cils.jpg",
    description: "Sublimez votre regard avec un résultat naturel et élégant, adapté à votre style.",
    variants: [
      { name: "Cils Classiques", price: 12000, duration: null, description: "Une extension cil à cil pour un résultat naturel et élégant. Idéal pour un look subtil et raffiné." },
      { name: "Cils Hybrides", price: 15000, duration: null, description: "Mélange parfait entre naturel et volume pour un regard plus intense et sophistiqué." },
      { name: "Cils Volume Russe", price: 20000, duration: null, description: "Plusieurs extensions ultra fines appliquées en bouquet pour un volume intense et un effet glamour." },
      { name: "Cils Méga Volume", price: 25000, duration: null, description: "Un volume exceptionnel pour un regard de star, dense et captivant." }
    ]
  },
  {
    id: "5",
    name: "Massage Bien-être",
    category: "corps",
    image: "/images/massages.jpg",
    description: "Offrez à votre corps le soin qu'il mérite : détente, relaxation et harmonie, pour homme, femme ou en duo.",
    variants: [
      { name: "Massage Relaxant", price: 15000, duration: null, description: "Détend les muscles, réduit le stress et procure une relaxation profonde." },
      { name: "Massage Crânien", price: 10000, duration: null, description: "Soulage les tensions, stimule la circulation et apaise l'esprit." },
      { name: "Massage Réflexologie", price: 17000, duration: null, description: "Stimule les points réflexes et rééquilibre les fonctions du corps." },
      { name: "Massage Californien", price: 17000, duration: null, description: "Mouvements doux et enveloppants pour une relaxation totale." },
      { name: "Massage Tonique", price: 20000, duration: null, description: "Tonifie les muscles, redonne énergie et vitalité au corps." },
      { name: "Massage Oriental", price: 25000, duration: null, description: "Techniques inspirées des traditions orientales pour un lâcher-prise absolu." },
      { name: "Massage Plantaire", price: 8000, duration: null, description: "Soulage la fatigue, améliore la circulation et procure un bien-être global." },
      { name: "Massage Relaxant Premium", price: 20000, duration: 60, description: "Massage profond favorisant la détente musculaire, la réduction du stress et le bien-être général." },
      { name: "Massage Sensoriel", price: 25000, duration: 60, description: "Des mouvements lents et enveloppants pour une relaxation profonde dans une ambiance apaisante." },
      { name: "Massage aux Huiles Chaudes", price: 20000, duration: 60, description: "Des huiles tièdes associées à des manœuvres relaxantes pour nourrir la peau et dénouer les tensions." },
      { name: "Massage aux Pierres Chaudes", price: 30000, duration: 60, description: "Des pierres volcaniques chauffées diffusent une chaleur profonde pour détendre les muscles et éliminer le stress." },
      { name: "Massage Signature Face Esthétique", price: 35000, duration: 90, description: "Notre soin exclusif combinant sauna et plusieurs techniques de massage pour une expérience de bien-être complète." },
      { name: "Massage Duo (Couples)", price: 50000, duration: 90, description: "Une séance de relaxation réalisée en simultané pour deux personnes dans une ambiance romantique et apaisante." },
      { name: "Massage Sensuel (Femmes)", price: 40000, duration: 40, description: "Une invitation à la détente et à la reconnexion avec soi-même, aux huiles chaudes parfumées. Séance réservée aux femmes." },
      { name: "Drainage Lymphatique", price: null, duration: null, description: "Améliore la circulation sanguine et lymphatique." }
    ]
  },
  {
    id: "6",
    name: "Gommage Corporel",
    category: "corps",
    image: "/images/gommage_traditionnelle.jpg",
    description: "Exfolie, purifie et sublime la peau pour un résultat doux, net et éclatant.",
    variants: [
      { name: "Gommage Éclat", price: 25000, duration: 60, description: "Élimine les cellules mortes, ravive l'éclat naturel de la peau." },
      { name: "Gommage Éclat + Sauna + Hydratation", price: 35000, duration: null, description: "Exfolie, purifie en profondeur et hydrate intensément." },
      { name: "Gommage Éclaircissant", price: 35000, duration: null, description: "Aide à unifier le teint, atténue les taches et illumine la peau." },
      { name: "Gommage Tonifiant", price: 30000, duration: null, description: "Stimule la circulation, raffermit et tonifie la peau." },
      { name: "Gommage Éclat à la Vapeur", price: 35000, duration: null, description: "Ouvre les pores, détoxifie et révèle un teint lumineux." },
      { name: "Gommage au Grain Fin", price: 30000, duration: null, description: "Exfolie en douceur, lisse le grain de peau et procure une douceur soyeuse." },
      { name: "Gommage Traditionnel", price: 30000, duration: 90, description: "À base d'ingrédients naturels (plantes, huiles, épices), nettoie en profondeur, nourrit et revitalise la peau." },
      { name: "Gommage Molato au Sauna", price: 35000, duration: null, description: "Nourrit, adoucit et éclaire la peau tout en offrant une détente profonde." }
    ]
  },
  {
    id: "7",
    name: "Épilations",
    category: "corps",
    image: "/images/epilations.jpg",
    description: "Douceur, propreté et confort — une peau lisse, nette et soyeuse longue durée, pour elle et pour lui.",
    variants: [
      { name: "Sourcils", price: 5000, duration: null, description: "Épilation précise pour un regard net et structuré." },
      { name: "Moustache", price: 5000, duration: null, description: "Épilation douce de la zone de la moustache." },
      { name: "Maillot Intégral Pubis", price: 20000, duration: null, description: "Pour une hygiène parfaite et un confort optimal." },     
      { name: "Visage", price: 15000, duration: null, description: "Sourcils, lèvres, menton, joues... pour un visage net et lumineux." },
      { name: "Aisselle", price: 10000, duration: null, description: "Douce et efficace, pour une sensation de fraîcheur durable." },
      { name: "Aisselles + Soin", price: 15000, duration: null, description: "Épilation des aisselles complétée d'un soin apaisant." },
      { name: "Menton à la Cire", price: 10000, duration: null, description: "Épilation précise du menton à la cire." },
      { name: "Jambes", price: 30000, duration: null, description: "Des jambes douces et soyeuses plus longtemps." },
      { name: "Demi Jambes", price: 15000, duration: null, description: "Épilation de la moitié des jambes." },
      { name: "Jambes et Bras", price: 50000, duration: null, description: "Épilation complète des jambes et des bras." },
      { name: "Torse", price: 30000, duration: null, description: "Épilation du torse pour une peau nette." },
      { name: "Corps Entier", price: 80000, duration: null, description: "Bras, dos, ventre, torse, fesses... pour une peau lisse de la tête aux pieds." },
      { name: "Fesse + Sillon Fessier", price: 35000, duration: null, description: "Pour une finition impeccable et une hygiène parfaite." },
      { name: "Soin Fessier", price: 25000, duration: null, description: "Un soin pour des fesses lisses, éclatantes et uniformes." }
    ]
  },
  {
    id: "8",
    name: "Bains de Sièges (Yoni Steam)",
    category: "intimite",
    image: "/images/bain_de_siege.jpg",
    description: "Un rituel ancestral pour votre bien-être — intimité saine, corps léger, esprit apaisé. Soin bien-être 100% féminin.",
    variants: [
      { name: "Bain Relaxant", price: 10000, duration: null, description: "Plantes apaisantes pour un moment de détente et de relaxation profonde." },
      { name: "Bain Détox", price: 12000, duration: null, description: "Plantes purifiantes pour aider à éliminer les impuretés et retrouver une sensation de légèreté." },
      { name: "Bain Équilibre Féminin", price: 12000, duration: null, description: "Plantes sélectionnées pour favoriser l'équilibre, le confort intime et la fraîcheur." },
      { name: "Bain Post-Menstruel", price: 15000, duration: null, description: "Idéal après les règles pour une sensation de propreté, de confort et de bien-être." },
      { name: "Bain Premium Spa", price: 20000, duration: null, description: "Expérience haut de gamme avec plantes premium, aromathérapie et ambiance relaxante." }
    ]
  },
  {
    id: "9",
    name: "Vajacial (Soin Intime Féminin)",
    category: "intimite",
    image: "/images/vajacial.jpg",
    description: "Un rituel de douceur et de confiance : purifie, apaise, traite les imperfections et révèle une peau nette et lumineuse.",
    variants: [
      { name: "Vajacial à la Cire", price: 30000, duration: null, description: "Épilation intime à la cire dans le cadre du soin Vajacial." },
      { name: "Vajacial à la Crème", price: 25000, duration: null, description: "Épilation intime à la crème dans le cadre du soin Vajacial." },
      { name: "Soin Intime", price: 35000, duration: null, description: "Rituel complet de soin intime : purifie, apaise et révèle une peau nette et lumineuse." }
    ]
  },
  {
    id: "10",
    name: "Penocial (Soin Intime Masculin)",
    category: "intimite",
    image: "/images/pericial_intimite.jpg",
    price: 40000,
    duration: null,
    description: "Le Vajacial masculin : purifie, traite les imperfections, apaise la peau et révèle une propreté irréprochable. Sur rendez-vous uniquement."
  },
  {
    id: "11",
    name: "Pédicure & Manucure",
    category: "soins-beaute",
    image: "/images/pedicure_manicure_multi.jpg",
    description: "Des soins complets pour révéler la beauté jusqu'au bout des ongles.",
    variants: [
      { name: "Pédicure Manucure (Combo)", price: 12000, duration: null, description: "Soin complet des mains et des pieds pour une beauté parfaite." },
      { name: "Jelly Pédicure Manucure Spa", price: 20000, duration: null, description: "Soin relaxant et hydratant à la jelly pour des mains et pieds doux et éclatants." },
      { name: "Jelly Pédicure Spa", price: 12000, duration: null, description: "Soin des pieds à la jelly pour hydrater, adoucir et rafraîchir." },
      { name: "Pédicure Russe", price: 15000, duration: null, description: "Technique professionnelle pour des pieds nets et des ongles parfaitement soignés." },
      { name: "Pédicure Simple", price: 7000, duration: null, description: "Soin de base pour des pieds propres, doux et soignés." },
      { name: "Manucure Simple", price: 5000, duration: null, description: "Soin de base pour des mains propres et des ongles soignés." },
      { name: "Nettoyage des Ongles + Vernis", price: 3000, duration: null, description: "Nettoyage des ongles et pose de vernis semi-permanent." }
    ]
  },
  {
    id: "12",
    name: "Sauna",
    category: "soins-beaute",
    image: "/images/sauna_bien_etre.jpg",
    price: null,
    duration: null,
    description: "Ouvre les pores, élimine les toxines, active la circulation et prépare le corps avant un soin corporel, pour des résultats optimisés."
  },
 
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

