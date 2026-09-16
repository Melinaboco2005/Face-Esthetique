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
      { name: "Soin Éclat", price: null, duration: null, description: "Nettoie, purifie et ravive l'éclat naturel de votre peau." },
      { name: "Hydrafacial", price: null, duration: null, description: "Hydratation en profondeur pour une peau douce, lisse et lumineuse." },
      { name: "Soin Anti-Âge", price: null, duration: null, description: "Lutte contre les signes du vieillissement et raffermit la peau." },
      { name: "Peeling", price: null, duration: null, description: "Exfolie en douceur, élimine les imperfections et unifie le teint." },
      { name: "Soin à la Vitamine C", price: null, duration: null, description: "Illumine le teint, réduit les taches et booste l'éclat." },
      { name: "Soin au Collagène", price: null, duration: null, description: "Nourrit, hydrate et redonne fermeté et élasticité à la peau." },
      { name: "Dermaplaning", price: null, duration: null, description: "Élimine les cellules mortes et le duvet pour un teint net et éclatant." },
      { name: "Traitement Acné Sévère", price: null, duration: null, description: "Purifie, apaise et aide à réduire durablement l'acné." }
    ]
  },
  {
    id: "2",
    name: "Micropigmentation des Lèvres (Lip Blush)",
    category: "visage",
    image: "/images/lip_blush_multi.jpg",
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
      { name: "Massage Relaxant", price: null, duration: null, description: "Réduit le stress et l'anxiété, favorise un moment de détente profonde." },
      { name: "Massage Californien", price: null, duration: null, description: "Mouvements amples et enveloppants pour un lâcher-prise total." },
      { name: "Massage Tonique", price: null, duration: null, description: "Stimule la circulation et redonne du tonus au corps." },
      { name: "Massage Oriental", price: null, duration: null, description: "Un rituel inspiré des traditions orientales pour l'harmonie du corps et de l'esprit." },
      { name: "Réflexologie", price: null, duration: null, description: "Travail ciblé sur les points réflexes des pieds pour un bien-être global." },
      { name: "Massage Plantaire", price: null, duration: null, description: "Soulage les tensions accumulées dans les pieds." },
      { name: "Massage aux Huiles Chaudes", price: null, duration: null, description: "La chaleur des huiles détend profondément les muscles." },
      { name: "Massage aux Pierres Chaudes", price: null, duration: null, description: "Les pierres chaudes relâchent les tensions musculaires en profondeur." },
      { name: "Drainage Lymphatique", price: null, duration: null, description: "Améliore la circulation sanguine et lymphatique." },
      { name: "Massage Duo (Couples)", price: null, duration: null, description: "Un moment de détente partagé, à deux." }
    ]
  },
  {
    id: "6",
    name: "Gommage Corporel",
    category: "corps",
    image: "/images/gommage_traditionnelle.jpg",
    description: "Exfolie, purifie et sublime la peau pour un résultat doux, net et éclatant.",
    variants: [
      { name: "Gommage Traditionnel", price: 30000, duration: 90, description: "Exfoliation en profondeur, bain traditionnel purifiant et hydratation pour une douceur incomparable." },
      { name: "Gommage Éclat", price: 25000, duration: 60, description: "Élimine les cellules mortes, affine le grain de peau et ravive l'éclat naturel." },
      { name: "Gommage Éclaircissant", price: 25000, duration: 60, description: "Unifie le teint, atténue les taches et imperfections pour une peau visiblement plus claire." },
      { name: "Gommage Tonifiant", price: 25000, duration: 60, description: "Stimule la circulation sanguine, raffermit la peau et redonne tonus et vitalité au corps." },
      { name: "Gommage à la Vapeur", price: 25000, duration: 60, description: "Ouvre les pores en douceur, facilite l'élimination des impuretés et laisse la peau revitalisée." }
    ]
  },
  {
    id: "7",
    name: "Épilations",
    category: "corps",
    image: "/images/epilations.jpg",
    description: "Douceur, propreté et confort — une peau lisse, nette et soyeuse longue durée.",
    variants: [
      { name: "Épilation Visage", price: null, duration: null, description: "Sourcils, lèvres, menton, joues... pour un visage net et lumineux." },
      { name: "Épilation Aisselles", price: null, duration: null, description: "Douce et efficace, pour une sensation de fraîcheur durable." },
      { name: "Épilation Maillot Intégral", price: null, duration: null, description: "Pour une hygiène parfaite et un confort optimal." },
      { name: "Épilation Jambes", price: null, duration: null, description: "Des jambes douces et soyeuses plus longtemps." },
      { name: "Épilation Corps", price: null, duration: null, description: "Bras, dos, ventre, torse, fesses... pour une peau lisse de la tête aux pieds." },
      { name: "Épilation Fesse + Sillon Fessier", price: null, duration: null, description: "Pour une finition impeccable et une hygiène parfaite." }
    ]
  },
  {
    id: "8",
    name: "Bains de Sièges",
    category: "intimite",
    image: "/images/bain_de_siege.jpg",
    description: "Un rituel ancestral pour votre bien-être — intimité saine, corps léger, esprit apaisé.",
    variants: [
      { name: "Bain Relaxant", price: null, duration: null, description: "Apaise le stress, les tensions et favorise une profonde détente." },
      { name: "Bain Détox", price: null, duration: null, description: "Élimine les toxines, débarrasse les odeurs indésirables et assainit la zone intime." },
      { name: "Bain Équilibre Féminin", price: null, duration: null, description: "Régule le cycle menstruel, équilibre le pH et renforce la santé intime." },
      { name: "Bain Post-Menstruel", price: null, duration: null, description: "Nettoie et régénère après les règles, apaise et prévient les inconforts." },
      { name: "Bain Premium Spa", price: null, duration: null, description: "Expérience complète de bien-être pour une sensation de fraîcheur et de luxe." }
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
    description: "Le Penocial : purifie, traite les imperfections, apaise la peau et révèle une propreté irréprochable. Sur rendez-vous uniquement."
  },
  {
    id: "11",
    name: "Pédicure & Manucure",
    category: "soins-beaute",
    image: "/images/pedicure_manicure_multi.jpg",
    description: "Des soins complets pour révéler la beauté jusqu'au bout des ongles.",
    variants: [
      { name: "Pédicure Russe", price: 25000, duration: 60, description: "Soin précis et minutieux des pieds, pour des ongles parfaitement nets et une finition impeccable." },
      { name: "Pédicure Simple", price: 25000, duration: 60, description: "Soin essentiel pour des pieds propres, ongles soignés et une sensation de légèreté au quotidien." },
      { name: "Manucure Simple", price: 18000, duration: 45, description: "Soin des mains complet, cuticules soignées, ongles en forme et éclat naturel garanti." },
      { name: "Nettoyage des Ongles + Vernis", price: 18000, duration: 45, description: "Nettoyage en profondeur et mise en beauté avec un vernis longue tenue et brillant." },
      { name: "Jelly Pédicure Manucure Spa", price: null, duration: null, description: "Rituel relaxant et hydratant à la jelly, pour des pieds et mains doux, parfumés et éclatants." }
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

