
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Send, User, Bot, HelpCircle, MessageCircle, ExternalLink } from 'lucide-react';

interface ExpertQueryProps {
  language: Language;
}

const ExpertQuery: React.FC<ExpertQueryProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState([
    { role: 'bot', text: language === 'kn' ? 'ನಮಸ್ಕಾರ! ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು?' : 'Namaskara! How can I help you today?' }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setChats([...chats, { role: 'user', text: query }]);
    setQuery('');
    // Simulate AI response
    setTimeout(() => {
      setChats(prev => [...prev, { 
        role: 'bot', 
        text: language === 'kn' ? 'ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಾವು ರೇಷ್ಮೆ ತಜ್ಞರಿಗೆ ರವಾನಿಸಿದ್ದೇವೆ.' : 'Thank you. We have forwarded your query to a sericulture expert.' 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[70vh]">
      {/* Compact WhatsApp Community Join Bar */}
      <div id="expert-whatsapp-notice" className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex justify-between items-center text-xs shadow-sm">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <div className="p-1.5 bg-green-100 rounded-lg text-green-700">
            <MessageCircle size={16} className="fill-current" />
          </div>
          <div>
            <span className="font-bold block">
              {language === 'kn' ? 'ರೇಷ್ಮೆ ಬೆಳೆಗಾರರ ವಾಟ್ಸಾಪ್ ಗ್ರೂಪ್' : 'Farmers WhatsApp Group'}
            </span>
            <span className="text-[10px] text-emerald-700 opacity-90 block">
              {language === 'kn' ? 'ತಜ್ಞರು ಮತ್ತು ರೈತರಿಂದ ತ್ವರಿತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ' : 'Get instant replies from experts & farmers'}
            </span>
          </div>
        </div>
        <a
          href="https://chat.whatsapp.com/Bgwj44sZUMvD9MO1ZgMxrf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1.5 rounded-lg font-bold shadow-sm transition-all flex items-center gap-1 active:scale-95"
        >
          <span>{language === 'kn' ? 'ಸೇರಿ' : 'Join'}</span>
          <ExternalLink size={10} />
        </a>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {chats.map((chat, i) => (
          <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 ${
              chat.role === 'user' 
                ? 'bg-green-700 text-white rounded-tr-none' 
                : 'bg-white shadow-sm border border-gray-100 rounded-tl-none'
            }`}>
              <div className={`shrink-0 p-2 rounded-full h-fit ${chat.role === 'user' ? 'bg-green-600' : 'bg-green-100 text-green-700'}`}>
                {chat.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <p className="text-sm leading-relaxed">{chat.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-2">
          {['ರೋಗಗಳು', 'ಸಬ್ಸಿಡಿ', 'ಮಾರುಕಟ್ಟೆ ದರ'].map(tag => (
            <button key={tag} className="text-xs bg-white border border-green-200 text-green-700 px-3 py-1.5 rounded-full font-bold">
              {tag}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...' : 'Type your question...'}
            className="flex-1 bg-white border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            onClick={handleSend}
            className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 shadow-md transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertQuery;
