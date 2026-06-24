import React from 'react';
import { Language } from '../types';
import { Users, ExternalLink, MessageCircle } from 'lucide-react';

interface CommunityCardProps {
  language: Language;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ language }) => {
  const isKn = language === 'kn';

  return (
    <div id="community-card" className="bg-gradient-to-br from-emerald-50 to-green-50 border border-green-200 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all hover:shadow-md duration-300">
      {/* Decorative background shape */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-100 rounded-full opacity-40 blur-lg"></div>
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-600 rounded-xl text-white shadow-sm flex-shrink-0">
          <Users size={24} />
        </div>
        
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              {isKn ? 'ಸಕ್ರಿಯ ಸಮುದಾಯ' : 'Active Community'}
            </span>
          </div>
          
          <h3 className="font-bold text-gray-900 text-lg leading-snug">
            {isKn ? 'ರೇಷ್ಮೆ ಬೆಳೆಗಾರರ ವಾಟ್ಸಾಪ್ ಸಮುದಾಯ' : 'Silkworm Farmers WhatsApp Community'}
          </h3>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            {isKn 
              ? 'ಕರ್ನಾಟಕದ ೫,೦೦೦ಕ್ಕೂ ಹೆಚ್ಚು ರೇಷ್ಮೆ ಬೆಳೆಗಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ, ದೈನಂದಿನ ಮಾರುಕಟ್ಟೆ ದರಗಳು, ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ತಜ್ಞರ ಸಲಹೆಗಳನ್ನು ಚರ್ಚಿಸಿ.'
              : 'Connect with 5,000+ silkworm farmers in Karnataka. Discuss daily market rates, disease prevention, and get expert help.'}
          </p>

          <div className="pt-2">
            <a 
              href="https://chat.whatsapp.com/Bgwj44sZUMvD9MO1ZgMxrf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 duration-200"
            >
              <MessageCircle size={18} className="fill-current" />
              <span>{isKn ? 'ವಾಟ್ಸಾಪ್ ಗ್ರೂಪ್ ಸೇರಿ' : 'Join WhatsApp Group'}</span>
              <ExternalLink size={14} className="opacity-80" />
            </a>
          </div>
          
          <p className="text-[10px] text-gray-400 font-mono pt-1">
            {isKn ? '● ೫,೦೦೦+ ರೈತರು ಈಗಾಗಲೆ ಸೇರಿದ್ದಾರೆ' : '● 5,000+ farmers have already joined'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
