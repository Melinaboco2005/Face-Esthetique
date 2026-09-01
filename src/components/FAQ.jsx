import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

export default function FAQ({ faqList, onAddQuestion }) {
  const [expandedId, setExpandedId] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeFaq = faqList.filter(item => item.active);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText || !visitorName) return;

    // Create mock new FAQ entry (awaiting moderation)
    const newFaq = {
      id: "f_" + Date.now(),
      question: questionText,
      answer: null, // No answer yet
      dateSubmitted: new Date().toISOString().split('T')[0],
      active: false, // Hidden until approved/answered by admin
      visitorName: visitorName
    };

    onAddQuestion(newFaq);
    setIsSubmitted(true);
    setQuestionText('');
    setVisitorName('');
  };

  return (
    <section id="faq" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary-900 border-none pb-0">
            Questions Fréquentes & FAQ
          </h2>
          <div className="w-16 h-1 bg-salon-gold mx-auto rounded-full"></div>
          <p className="text-salon-text font-light">
            Trouvez les réponses à vos interrogations courantes ou posez directement votre question à notre équipe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {activeFaq.length === 0 ? (
              <p className="text-salon-text font-light italic">Aucune question n'est publiée pour le moment.</p>
            ) : (
              activeFaq.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div 
                    key={item.id}
                    className="border border-salon-lightAccent rounded-xl overflow-hidden shadow-sm bg-white hover:border-salon-gold/50 transition-all"
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-primary-900 focus:outline-none"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-salon-gold flex-shrink-0" />
                        {item.question}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-salon-accent" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-salon-accent" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-salon-text font-light leading-relaxed border-t border-salon-softBg bg-salon-beige/50">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Question Form */}
          <div className="lg:col-span-5 bg-salon-softBg p-8 rounded-2xl border border-salon-lightAccent shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-serif text-primary-900 mt-0">
                    Poser une question
                  </h3>
                  <p className="text-xs text-salon-accent leading-relaxed">
                    Vous avez une question spécifique sur nos prestations ? Écrivez-nous. Hilary vous répondra dans les plus brefs délais.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1.5">
                      Votre Nom
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Hilary Cole"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent bg-white focus:border-salon-gold focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-salon-text uppercase tracking-wider mb-1.5">
                      Votre Question
                    </label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="Votre message ici..."
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-salon-lightAccent bg-white focus:border-salon-gold focus:outline-none text-sm transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-900 hover:bg-salon-accent text-white py-3 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none"
                >
                  <Send className="w-4 h-4" />
                  Envoyer ma question
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-primary-900 mt-0">Question transmise !</h3>
                <p className="text-xs text-salon-text font-light leading-relaxed max-w-xs mx-auto">
                  Votre question a bien été envoyée à l'esthéticienne. Une notification lui a été transmise. Elle l'analysera et publiera sa réponse sous peu.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 bg-white border border-salon-lightAccent hover:bg-salon-softBg text-salon-text text-xs font-semibold rounded-lg transition-all focus:outline-none"
                >
                  Poser une autre question
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
