import React, { useState } from 'react';
import { 
  LogOut, Plus, Trash2, Edit3, Check, X, Shield, ArrowLeft, 
  HelpCircle, Tag, Sparkles, MessageSquare, Save, Settings, 
} from 'lucide-react';

export default function AdminDashboard({ 
  services, onUpdateServices, 
  promotions, onUpdatePromotions, 
  faqList, onUpdateFaq, 
  settings, onUpdateSettings, 
  onClose 
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Sub-Tab
  const [activeSubTab, setActiveSubTab] = useState('services');

  // Form States for Service
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: '', price: '', duration: '', description: '', category: 'visage', image: '' });
  const [isAddingService, setIsAddingService] = useState(false);

  // Form States for Promotion
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [promoForm, setPromoForm] = useState({ title: '', description: '', discount: '', code: '', validUntil: '', active: true });
  const [isAddingPromo, setIsAddingPromo] = useState(false);

  // FAQ Answer State
  const [answeringFaqId, setAnsweringFaqId] = useState(null);
  const [faqAnswerText, setFaqAnswerText] = useState('');

  // Settings State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Categories list
  const categories = [
    { id: 'visage', name: 'Bien-être' },
    { id: 'corps', name: 'Soins et Beauté' },
    { id: 'ongles', name: 'Esthétique Médicale' },
    { id: 'coiffure', name: 'Formation Professionnelle' }
  ]; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects (Astuce: utilisez admin / admin).');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // SERVICES CRUD
  const handleEditService = (service) => {
    setEditingServiceId(service.id);
    // ✅ FIX #1: Pré-remplir COMPLÈTEMENT avec les données existantes
    setServiceForm({ 
      name: service.name,
      price: service.price.toString(),
      duration: service.duration.toString(),
      description: service.description,
      category: service.category,
      image: service.image || ""
    });
    setIsAddingService(false);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (editingServiceId) {
      // Edit
      const updated = services.map(s => s.id === editingServiceId ? { 
        ...s,
        ...serviceForm,
        price: Number(serviceForm.price), 
        duration: Number(serviceForm.duration),
        // ✅ FIX #2: Préserver l'image existante si aucune nouvelle n'est fournie
        image: serviceForm.image || s.image
      } : s);
      onUpdateServices(updated);
      setEditingServiceId(null);
    } else {
      // Add
      const newService = {
        ...serviceForm,
        id: "s_" + Date.now(),
        price: Number(serviceForm.price),
        duration: Number(serviceForm.duration),
        image: serviceForm.image || "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop"
      };
      onUpdateServices([...services, newService]);
      setIsAddingService(false);
    }
    // Reset Form
    setServiceForm({ name: '', price: '', duration: '', description: '', category: 'visage', image: '' });
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette prestation ?")) {
      onUpdateServices(services.filter(s => s.id !== id));
    }
  };

  // PROMOTIONS CRUD
  const handleEditPromo = (promo) => {
    setEditingPromoId(promo.id);
    setPromoForm({ ...promo });
    setIsAddingPromo(false);
  };

  const handleSavePromo = (e) => {
    e.preventDefault();
    if (editingPromoId) {
      const updated = promotions.map(p => p.id === editingPromoId ? { ...promoForm } : p);
      onUpdatePromotions(updated);
      setEditingPromoId(null);
    } else {
      const newPromo = {
        ...promoForm,
        id: "p_" + Date.now()
      };
      onUpdatePromotions([...promotions, newPromo]);
      setIsAddingPromo(false);
    }
    setPromoForm({ title: '', description: '', discount: '', code: '', validUntil: '', active: true });
  };

  const handleDeletePromo = (id) => {
    if (window.confirm("Voulez-vous supprimer cette offre ?")) {
      onUpdatePromotions(promotions.filter(p => p.id !== id));
    }
  };

  const handleTogglePromo = (id) => {
    const updated = promotions.map(p => p.id === id ? { ...p, active: !p.active } : p);
    onUpdatePromotions(updated);
  };

  // FAQ MODERATION
  const handleAnswerFaq = (id) => {
    setAnsweringFaqId(id);
    const item = faqList.find(f => f.id === id);
    setFaqAnswerText(item.answer || '');
  };

  const handleSaveFaqAnswer = (id) => {
    const updated = faqList.map(f => {
      if (f.id === id) {
        return {
          ...f,
          answer: faqAnswerText,
          active: true // Auto publish when answered
        };
      }
      return f;
    });
    onUpdateFaq(updated);
    setAnsweringFaqId(null);
    setFaqAnswerText('');
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm("Supprimer cette question ?")) {
      onUpdateFaq(faqList.filter(f => f.id !== id));
    }
  };

  const handleToggleFaqActive = (id) => {
    const updated = faqList.map(f => f.id === id ? { ...f, active: !f.active } : f);
    onUpdateFaq(updated);
  };

  // SETTINGS SAVE
  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    alert("Paramètres enregistrés avec succès !");
  };

  const handleHoursChange = (index, value) => {
    const updatedHours = settingsForm.hours.map((h, i) => i === index ? { ...h, time: value } : h);
    setSettingsForm({ ...settingsForm, hours: updatedHours });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-salon-softBg px-4">
        <div className="bg-white p-8 rounded-2xl border border-salon-lightAccent shadow-xl w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary-100 text-primary-900 rounded-full flex items-center justify-center mx-auto border border-salon-lightAccent">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-primary-900 border-none pb-0">Espace Administration</h2>
            <p className="text-xs text-salon-accent">Accès réservé à l'équipe du salon</p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1">Identifiant</label>
              <input 
                type="text" 
                required
                placeholder="Ex: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent focus:border-salon-gold focus:outline-none text-sm transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1">Mot de passe</label>
              <input 
                type="password" 
                required
                placeholder="Ex: admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent focus:border-salon-gold focus:outline-none text-sm transition-colors"
              />
            </div>

            <div className="text-center py-1">
              <span className="text-[10px] text-salon-accent bg-salon-softBg px-3 py-1 rounded-full border border-salon-lightAccent font-semibold">
                Astuce démo : identifiants <strong>admin / admin</strong>
              </span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 border border-salon-lightAccent hover:bg-salon-softBg text-salon-text text-sm font-semibold rounded-xl py-3 transition-colors"
              >
                Retour
              </button>
              
              <button
                type="submit"
                className="w-2/3 bg-primary-900 hover:bg-salon-accent text-white text-sm font-semibold rounded-xl py-3 shadow-md transition-colors"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-salon-beige px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-salon-lightAccent shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[70vh]">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 bg-salon-softBg border-b md:border-b-0 md:border-r border-salon-lightAccent p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-primary-900 border-none pb-0">Administration</h2>
              <span className="text-xs text-salon-accent font-semibold">{settings.salonName}</span>
            </div>

            <div className="flex flex-col gap-1">
              <button 
                onClick={() => setActiveSubTab('services')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2.5 transition-colors focus:outline-none ${activeSubTab === 'services' ? 'bg-primary-900 text-white' : 'text-salon-text hover:bg-salon-lightAccent/50'}`}
              >
                <Sparkles className="w-4 h-4" />
                Prestations
              </button>

              <button 
                onClick={() => setActiveSubTab('promotions')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2.5 transition-colors focus:outline-none ${activeSubTab === 'promotions' ? 'bg-primary-900 text-white' : 'text-salon-text hover:bg-salon-lightAccent/50'}`}
              >
                <Tag className="w-4 h-4" />
                Offres & Promos
              </button>

              <button 
                onClick={() => setActiveSubTab('faq')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2.5 transition-colors focus:outline-none ${activeSubTab === 'faq' ? 'bg-primary-900 text-white' : 'text-salon-text hover:bg-salon-lightAccent/50'}`}
              >
                <MessageSquare className="w-4 h-4" />
                Modération FAQ
                {faqList.filter(f => !f.answer).length > 0 && (
                  <span className="ml-auto w-5 h-5 bg-salon-rose text-primary-900 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {faqList.filter(f => !f.answer).length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setActiveSubTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2.5 transition-colors focus:outline-none ${activeSubTab === 'settings' ? 'bg-primary-900 text-white' : 'text-salon-text hover:bg-salon-lightAccent/50'}`}
              >
                <Settings className="w-4 h-4" />
                Paramètres
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-salon-lightAccent/60 flex flex-col gap-2 mt-6 md:mt-0">
            <button
              onClick={onClose}
              className="w-full text-xs font-semibold text-salon-text hover:text-primary-900 py-2.5 px-4 bg-white border border-salon-lightAccent rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour au Site
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-xs font-semibold text-red-700 hover:bg-red-50 py-2.5 px-4 border border-red-200 rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grow p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* TAB 1: SERVICES */}
          {activeSubTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-salon-softBg pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-primary-900 my-0">Prestations & Grille Tarifaire</h3>
                  <p className="text-xs text-salon-accent">Ajoutez ou modifiez les tarifs affichés sur la page d'accueil.</p>
                </div>
                {!isAddingService && !editingServiceId && (
                  <button
                    onClick={() => {
                      setIsAddingService(true);
                      setEditingServiceId(null);
                      setServiceForm({ name: '', price: '', duration: '', description: '', category: 'visage', image: '' });
                    }}
                    className="inline-flex items-center gap-2 bg-primary-900 text-white hover:bg-salon-accent px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un soin
                  </button>
                )}
              </div>

              {/* Service Add/Edit Form */}
              {(isAddingService || editingServiceId) && (
                <form onSubmit={handleSaveService} className="bg-salon-softBg p-6 rounded-2xl border border-salon-lightAccent space-y-4">
                  <h4 className="font-serif font-bold text-primary-900 text-base my-0">
                    {editingServiceId ? "Modifier la prestation" : "Créer une nouvelle prestation"}
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Nom du soin</label>
                      <input 
                        type="text" required placeholder="Ex: Modelage Signature"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Catégorie</label>
                      <select
                        value={serviceForm.category}
                        onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      >
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Tarif (CFA)</label>
                      <input 
                        type="number" required placeholder="Ex: 25000"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Durée (minutes)</label>
                      <input 
                        type="number" required placeholder="Ex: 60"
                        value={serviceForm.duration}
                        onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Description</label>
                    <textarea 
                      required rows="3" placeholder="Description du soin..."
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Image URL (Optionnel)</label>
                    {/* ✅ FIX #3: Retirer "type='url'" pour accepter les champs vides */}
                    <input 
                      type="text" 
                      placeholder="https://unsplash.com/..."
                      value={serviceForm.image}
                      onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                    />
                    <p className="text-[9px] text-salon-accent mt-1">Laissez vide pour une image par défaut</p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingService(false);
                        setEditingServiceId(null);
                      }}
                      className="px-4 py-2 border border-salon-lightAccent bg-white text-salon-text rounded-lg text-xs font-semibold hover:bg-salon-softBg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-900 text-white rounded-lg text-xs font-semibold hover:bg-salon-accent flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Enregistrer
                    </button>
                  </div>
                </form>
              )}

              {/* Services List Table */}
              <div className="overflow-x-auto border border-salon-lightAccent rounded-xl bg-white shadow-sm">
                <table className="min-w-full divide-y divide-salon-softBg text-sm text-left">
                  <thead className="bg-salon-softBg/50 text-[10px] font-bold uppercase tracking-wider text-salon-accent">
                    <tr>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Catégorie</th>
                      <th className="px-6 py-4 text-center">Durée</th>
                      <th className="px-6 py-4 text-right">Tarif</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-salon-softBg">
                    {services.map((s) => (
                      <tr key={s.id} className="hover:bg-salon-beige/20">
                        <td className="px-6 py-4 font-semibold text-primary-900">{s.name}</td>
                        <td className="px-6 py-4 uppercase text-xs tracking-wider text-salon-accent font-semibold">{s.category}</td>
                        <td className="px-6 py-4 text-center font-light">{s.duration} min</td>
                        <td className="px-6 py-4 text-right font-bold text-primary-900">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(s.price)}
                        </td>
                        <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditService(s)}
                            className="p-1.5 rounded-lg border border-salon-lightAccent hover:bg-salon-softBg text-salon-accent hover:text-primary-900 transition-colors"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PROMOTIONS */}
          {activeSubTab === 'promotions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-salon-softBg pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-primary-900 my-0">Offres & Codes Promo</h3>
                  <p className="text-xs text-salon-accent">Gérez les offres spéciales affichées sur le site.</p>
                </div>
                {!isAddingPromo && !editingPromoId && (
                  <button
                    onClick={() => {
                      setIsAddingPromo(true);
                      setEditingPromoId(null);
                      setPromoForm({ title: '', description: '', discount: '', code: '', validUntil: '', active: true });
                    }}
                    className="inline-flex items-center gap-2 bg-primary-900 text-white hover:bg-salon-accent px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Créer une offre
                  </button>
                )}
              </div>

              {/* Promo Add/Edit Form */}
              {(isAddingPromo || editingPromoId) && (
                <form onSubmit={handleSavePromo} className="bg-salon-softBg p-6 rounded-2xl border border-salon-lightAccent space-y-4">
                  <h4 className="font-serif font-bold text-primary-900 text-base my-0">
                    {editingPromoId ? "Modifier l'offre" : "Créer une offre"}
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Titre de l'offre</label>
                      <input 
                        type="text" required placeholder="Ex: Offre de Printemps"
                        value={promoForm.title}
                        onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Code promo</label>
                      <input 
                        type="text" required placeholder="Ex: PRINTEMPS20"
                        value={promoForm.code}
                        onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Remise / Cadeau</label>
                      <input 
                        type="text" required placeholder="Ex: -20% ou Gommage Offert"
                        value={promoForm.discount}
                        onChange={(e) => setPromoForm({ ...promoForm, discount: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Valide jusqu'au</label>
                      <input 
                        type="date" required
                        value={promoForm.validUntil}
                        onChange={(e) => setPromoForm({ ...promoForm, validUntil: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-salon-text uppercase tracking-wider mb-1">Description détaillée</label>
                    <textarea 
                      required rows="2" placeholder="Description de la promotion..."
                      value={promoForm.description}
                      onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent bg-white focus:outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPromo(false);
                        setEditingPromoId(null);
                      }}
                      className="px-4 py-2 border border-salon-lightAccent bg-white text-salon-text rounded-lg text-xs font-semibold hover:bg-salon-softBg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-900 text-white rounded-lg text-xs font-semibold hover:bg-salon-accent flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Enregistrer
                    </button>
                  </div>
                </form>
              )}

              {/* Promotions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map((p) => (
                  <div key={p.id} className={`p-6 rounded-2xl border bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${p.active ? 'border-salon-gold/50' : 'border-salon-lightAccent opacity-60'}`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold bg-salon-softBg px-2 py-0.5 rounded border border-salon-lightAccent text-salon-accent">{p.code}</span>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${p.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-[10px] font-semibold uppercase">{p.active ? 'Active' : 'Désactivée'}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-serif font-bold text-primary-900 text-lg my-0">{p.title}</h4>
                      <p className="text-xs font-light text-salon-text/80 leading-relaxed">{p.description}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-salon-softBg flex justify-between items-center text-xs">
                      <div>
                        <span className="text-salon-accent">Validité: </span>
                        <strong className="text-primary-900">{p.validUntil}</strong>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleTogglePromo(p.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-salon-lightAccent hover:bg-salon-softBg text-[10px] font-bold text-salon-accent"
                        >
                          {p.active ? 'Désactiver' : 'Activer'}
                        </button>
                        <button
                          onClick={() => handleEditPromo(p)}
                          className="p-1.5 rounded-lg border border-salon-lightAccent hover:bg-salon-softBg text-salon-accent"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePromo(p.id)}
                          className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FAQ MODERATION */}
          {activeSubTab === 'faq' && (
            <div className="space-y-6">
              <div className="border-b border-salon-softBg pb-4">
                <h3 className="text-xl font-bold font-serif text-primary-900 my-0">Questions & Modération FAQ</h3>
                <p className="text-xs text-salon-accent">Répondez aux questions des visiteurs pour les publier sur le site.</p>
              </div>

              {/* Questions Awaiting Answer */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-primary-900 text-base my-0 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-salon-gold" />
                  Questions reçues ({faqList.filter(f => !f.answer).length})
                </h4>

                {faqList.filter(f => !f.answer).length === 0 ? (
                  <p className="text-xs text-salon-accent italic bg-white p-4 rounded-xl border border-salon-lightAccent text-center">
                    Aucune nouvelle question en attente de réponse.
                  </p>
                ) : (
                  faqList.filter(f => !f.answer).map((f) => (
                    <div key={f.id} className="bg-salon-softBg/50 p-6 rounded-2xl border border-salon-lightAccent space-y-4 shadow-sm">
                      <div className="flex justify-between items-start text-xs">
                        <span className="font-semibold text-salon-accent">De : {f.visitorName || 'Visiteur anonyme'}</span>
                        <span className="text-salon-accent/70">Reçue le : {f.dateSubmitted}</span>
                      </div>
                      
                      <p className="text-sm font-semibold text-primary-900">"{f.question}"</p>

                      {answeringFaqId === f.id ? (
                        <div className="space-y-3 pt-2">
                          <textarea
                            rows="3" placeholder="Saisir votre réponse..."
                            value={faqAnswerText}
                            onChange={(e) => setFaqAnswerText(e.target.value)}
                            className="w-full p-3 border border-salon-lightAccent rounded-lg focus:outline-none text-sm bg-white resize-none"
                          ></textarea>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setAnsweringFaqId(null)}
                              className="px-3 py-1.5 border border-salon-lightAccent bg-white text-salon-text text-xs font-semibold rounded-lg"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => handleSaveFaqAnswer(f.id)}
                              className="px-3 py-1.5 bg-primary-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Publier la réponse
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2 pt-2 border-t border-salon-lightAccent/60">
                          <button
                            onClick={() => handleDeleteFaq(f.id)}
                            className="text-xs font-semibold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50/50"
                          >
                            Rejeter
                          </button>
                          <button
                            onClick={() => handleAnswerFaq(f.id)}
                            className="text-xs font-semibold text-primary-900 bg-white border border-salon-lightAccent hover:bg-salon-softBg px-4 py-1.5 rounded-lg flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-salon-gold" />
                            Répondre & Publier
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Published FAQ */}
              <div className="space-y-4 pt-4">
                <h4 className="font-serif font-bold text-primary-900 text-base my-0">
                  FAQ Publiée ({faqList.filter(f => f.answer).length})
                </h4>

                <div className="border border-salon-lightAccent rounded-xl bg-white shadow-sm divide-y divide-salon-softBg">
                  {faqList.filter(f => f.answer).map((f) => (
                    <div key={f.id} className="p-5 flex justify-between gap-4 items-start hover:bg-salon-beige/10">
                      <div className="space-y-2 grow">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${f.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <h5 className="font-serif font-bold text-primary-900 text-sm my-0">{f.question}</h5>
                        </div>
                        <p className="text-xs font-light text-salon-text/80 leading-relaxed pl-3.5">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleToggleFaqActive(f.id)}
                          className="px-2 py-1 border border-salon-lightAccent rounded text-[10px] font-bold text-salon-accent"
                        >
                          {f.active ? 'Masquer' : 'Afficher'}
                        </button>
                        <button
                          onClick={() => handleAnswerFaq(f.id)}
                          className="p-1 border border-salon-lightAccent rounded text-salon-accent"
                          title="Modifier la réponse"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(f.id)}
                          className="p-1 border border-red-100 rounded text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeSubTab === 'settings' && (
            <div className="space-y-6">
              <div className="border-b border-salon-softBg pb-4">
                <h3 className="text-xl font-bold font-serif text-primary-900 my-0">Paramètres Généraux</h3>
                <p className="text-xs text-salon-accent">Modifiez les informations de contact, adresse et horaires d'ouverture du salon.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-salon-lightAccent space-y-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1">Nom du Salon</label>
                    <input 
                      type="text" required
                      value={settingsForm.salonName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, salonName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1">WhatsApp Pro (Format international, ex: 22997979797)</label>
                    <input 
                      type="text" required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1">Snapchat</label>
                    <input 
                      type="text" required
                      value={settingsForm.snapchatUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, snapchatUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1">Adresse physique</label>
                    <input 
                      type="text" required
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-salon-lightAccent focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Hours Settings */}
                <div className="space-y-3 pt-4 border-t border-salon-softBg">
                  <h4 className="font-serif font-bold text-primary-900 text-sm my-0">Gestion des Horaires d'Ouverture</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {settingsForm.hours.map((h, index) => (
                      <div key={index} className="flex flex-col gap-1 border border-salon-lightAccent/50 p-3.5 rounded-lg bg-salon-softBg/30">
                        <span className="text-xs font-bold text-primary-900">{h.day}</span>
                        <input 
                          type="text" required
                          value={h.time}
                          onChange={(e) => handleHoursChange(index, e.target.value)}
                          className="w-full px-2 py-1.5 rounded border border-salon-lightAccent bg-white text-xs focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-salon-softBg">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary-900 hover:bg-salon-accent text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer les Paramètres
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}