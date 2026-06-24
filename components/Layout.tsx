
import React from 'react';
import { AppTab, Language } from '../types';
import { TRANSLATIONS, COLORS } from '../constants';
import { Camera, Thermometer, Info, BookOpen, MessageCircle, Languages, Volume2, ExternalLink } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  language: Language;
  toggleLanguage: () => void;
  onVoiceClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, language, toggleLanguage, onVoiceClick }) => {
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: AppTab.SCAN, label: t.scan, icon: Camera },
    { id: AppTab.MONITOR, label: t.monitor, icon: Thermometer },
    { id: AppTab.ADVISORY, label: t.advisory, icon: Info },
    { id: AppTab.RECORDS, label: t.records, icon: BookOpen },
    { id: AppTab.EXPERT, label: t.expert, icon: MessageCircle },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">{t.appName}</h1>
          <p className="text-xs opacity-80">{t.tagline}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onVoiceClick}
            className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors"
            title={t.voiceGuide}
          >
            <Volume2 size={20} />
          </button>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-white text-green-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm"
          >
            <Languages size={16} />
            {t.switchLang}
          </button>
        </div>
      </header>

      {/* Public Community Announcement Bar */}
      <div id="public-community-bar" className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-between text-[11px] font-bold shadow-inner relative overflow-hidden shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
          </span>
          <span className="truncate">
            {language === 'kn' ? 'ಸಾರ್ವಜನಿಕ ವಾಟ್ಸಾಪ್ ಗ್ರೂಪ್ ಸೇರಿ!' : 'Join Public WhatsApp Group!'}
          </span>
        </div>
        <a 
          href="https://chat.whatsapp.com/Bgwj44sZUMvD9MO1ZgMxrf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-emerald-800 px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-emerald-50 transition-all flex items-center gap-1 active:scale-95 shadow"
        >
          <span>{language === 'kn' ? 'ಸೇರಿ' : 'Join'}</span>
          <ExternalLink size={10} />
        </a>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-24 p-4 overflow-y-auto bg-gray-50">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center py-2 px-1 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              activeTab === item.id ? 'text-green-700 scale-110' : 'text-gray-400'
            }`}
          >
            <item.icon size={24} fill={activeTab === item.id ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
