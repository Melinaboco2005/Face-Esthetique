import React, { useState } from 'react';
import { galleryHotspots } from '../mockData';
import { Eye, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery360() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const currentScene = galleryHotspots[activeIndex];

  const handleNext = () => {
    setActiveHotspot(null);
    setActiveIndex((prev) => (prev + 1) % galleryHotspots.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setActiveIndex((prev) => (prev - 1 + galleryHotspots.length) % galleryHotspots.length);
  };

  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-gold/10 text-salon-gold text-xs font-semibold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            Découverte Immersive
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Visite Virtuelle de l'Institut
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Déambulez virtuellement dans notre salon. Cliquez sur les points d'intérêt pour en savoir plus sur nos cabines et espaces de détente.
          </p>
        </div>

        {/* Viewport Frame */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] bg-salon-text rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
          {/* Main Background Image */}
          <img 
            src={currentScene.image} 
            alt={currentScene.title} 
            className="w-full h-full object-cover select-none transition-all duration-700 ease-in-out"
          />

          {/* Overlay Darkener */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all"></div>

          {/* Nav Controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary-900 p-2.5 rounded-full shadow-lg transition-all focus:outline-none z-10"
            title="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary-900 p-2.5 rounded-full shadow-lg transition-all focus:outline-none z-10"
            title="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pulse Hotspot Dot */}
          <div 
            style={{ left: `${currentScene.x}%`, top: `${currentScene.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => handleHotspotClick(currentScene)}
              className="w-8 h-8 rounded-full bg-salon-gold border border-white flex items-center justify-center text-white shadow-lg hotspot-pulse focus:outline-none"
              title="Point d'intérêt"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Hotspot Hover Card */}
            {activeHotspot && activeHotspot.id === currentScene.id && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-salon-text p-4 rounded-xl shadow-xl w-64 border border-salon-lightAccent z-30 animate-fadeIn text-xs sm:text-sm">
                <h4 className="font-serif font-bold text-primary-900 text-sm mb-1">{activeHotspot.title}</h4>
                <p className="font-light leading-relaxed text-salon-text/90">{activeHotspot.description}</p>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-salon-lightAccent/50"></div>
              </div>
            )}
          </div>

          {/* Title Overlay Banner */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-serif text-sm sm:text-base border border-white/10">
            {currentScene.title}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-3">
          {galleryHotspots.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveHotspot(null);
                setActiveIndex(idx);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none ${
                activeIndex === idx 
                  ? 'bg-salon-gold text-white shadow-md' 
                  : 'bg-salon-softBg text-salon-text hover:bg-salon-lightAccent'
              }`}
            >
              {scene.title}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
