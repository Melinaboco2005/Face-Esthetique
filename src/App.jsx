import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Formations from './components/Formations';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import { initialServices, initialFaq, initialSettings, servicesVersion } from './mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'admin'

  // Persistent State with LocalStorage
  // Chaque state versionné compare la version stockée à la version actuelle
  // du fichier de données. Si elles diffèrent (car vous avez modifié un prix
  // ou un service), l'ancienne sauvegarde du navigateur est ignorée et les
  // nouvelles données de référence sont utilisées à la place.
  const [services, setServices] = useState(() => {
    const savedVersion = localStorage.getItem('salon_services_version');
    const saved = localStorage.getItem('salon_services');
    if (saved && savedVersion === servicesVersion) {
      return JSON.parse(saved);
    }
    return initialServices;
  });


  const [faqList, setFaqList] = useState(() => {
    const saved = localStorage.getItem('salon_faq');
    return saved ? JSON.parse(saved) : initialFaq;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('salon_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('salon_services', JSON.stringify(services));
    localStorage.setItem('salon_services_version', servicesVersion);
  }, [services]);


  useEffect(() => {
    localStorage.setItem('salon_faq', JSON.stringify(faqList));
  }, [faqList]);

  useEffect(() => {
    localStorage.setItem('salon_settings', JSON.stringify(settings));
  }, [settings]);

  const handleNavigate = (tab, hash = null) => {
    setCurrentTab(tab);
    if (tab === 'home' && hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleAddQuestion = (newFaqItem) => {
    setFaqList((prev) => [newFaqItem, ...prev]);
  };

  return (

    <div className="min-h-screen bg-salon-beige font-sans text-salon-text flex flex-col justify-between">

      {/* Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        currentTab={currentTab}
        settings={settings}
      />

      {/* Main View Switcher */}
      {currentTab === 'admin' ? (
        <AdminDashboard
          services={services}
          onUpdateServices={setServices}
          faqList={faqList}
          onUpdateFaq={setFaqList}
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => handleNavigate('home')}
        />
      ) : (
        <main className="flex-grow">
          <Hero settings={settings} />
          <About />
          <Formations/>
          <Services services={services} settings={settings} />
          <Gallery360 />
          <Promotions promotions={promotions} campagne={campagne} />
          <FAQ faqList={faqList} onAddQuestion={handleAddQuestion} />
          <Contact settings={settings} />
        </main>
      )}

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 px-4 border-t border-primary-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-serif text-xl font-bold tracking-widest text-white my-0">
              {settings.salonName.toUpperCase()}
            </h3>
            <p className="text-xs text-salon-rose/80 font-light mt-1">
              Make Up, Soins & Beauté
            </p>
          </div>

          <div className="text-xs text-white/70 font-light space-y-1">
            <p>© 2026 {settings.salonName}. Tous droits réservés.</p>
          </div>

          <div>
            <button
              onClick={() => handleNavigate('admin')}
              className="text-xs text-salon-gold hover:underline font-semibold focus:outline-none"
            >
              Accès Éditeur / Admin
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

