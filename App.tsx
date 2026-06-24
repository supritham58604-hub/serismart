
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DiseaseScanner from './components/DiseaseScanner';
import EnvironmentMonitor from './components/EnvironmentMonitor';
import AdvisorySystem from './components/AdvisorySystem';
import Analytics from './components/Analytics';
import ExpertQuery from './components/ExpertQuery';
import VoiceAssistantOverlay from './components/VoiceAssistantOverlay';
import { AppTab, Language } from './types';
import { WifiOff } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.SCAN);
  const [language, setLanguage] = useState<Language>('kn');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'kn' ? 'en' : 'kn');
  };

  const toggleVoiceAssistant = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  return (
    <>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        language={language} 
        toggleLanguage={toggleLanguage}
        onVoiceClick={toggleVoiceAssistant}
      >
        {isOffline && (
          <div className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-3 py-1 mb-4 rounded-full flex items-center justify-center gap-1">
            <WifiOff size={12} />
            {language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್' : 'Offline Mode'}
          </div>
        )}

        <div className="animate-in fade-in duration-300">
          {activeTab === AppTab.SCAN && <DiseaseScanner language={language} />}
          {activeTab === AppTab.MONITOR && <EnvironmentMonitor language={language} />}
          {activeTab === AppTab.ADVISORY && <AdvisorySystem language={language} />}
          {activeTab === AppTab.RECORDS && <Analytics language={language} />}
          {activeTab === AppTab.EXPERT && <ExpertQuery language={language} />}
        </div>
      </Layout>

      {isVoiceActive && (
        <VoiceAssistantOverlay 
          language={language} 
          onClose={() => setIsVoiceActive(false)} 
        />
      )}
    </>
  );
};

export default App;
