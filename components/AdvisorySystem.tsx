
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Calendar, CloudSun, ShieldCheck, MapPin } from 'lucide-react';
import CommunityCard from './CommunityCard';

interface AdvisorySystemProps {
  language: Language;
}

const AdvisorySystem: React.FC<AdvisorySystemProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const guides = [
    {
      stage: language === 'kn' ? '೪ನೇ ಹಂತ' : '4th Instar',
      tips: [
        language === 'kn' ? 'ಪ್ರತಿ ದಿನ ೪ ಬಾರಿ ಎಲೆಗಳನ್ನು ನೀಡಿ' : 'Feed mulberry leaves 4 times daily',
        language === 'kn' ? 'ಪರಿಸರದಲ್ಲಿ ತಾಪಮಾನ ೨೫ ಡಿಗ್ರಿ ಇರಲಿ' : 'Keep temp at 25°C',
        language === 'kn' ? 'ಸರಿಯಾದ ಸ್ವಚ್ಛತೆ ಕಾಪಾಡಿ' : 'Maintain strict hygiene'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <CommunityCard language={language} />

      <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-400 p-2 rounded-lg text-yellow-900">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-bold text-yellow-900">{t.currentStage}</h3>
            <p className="text-xs text-yellow-700">{language === 'kn' ? 'ಪ್ರಾರಂಭವಾದ ದಿನ: ಜೂನ್ ೧೫, ೨೦೨೪' : 'Started on: June 15, 2024'}</p>
          </div>
        </div>
        <ul className="space-y-3">
          {guides[0].tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-yellow-900 text-sm font-medium">
              <ShieldCheck size={18} className="shrink-0 text-yellow-600" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
        <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
          <CloudSun size={20} />
          {language === 'kn' ? 'ಹವಾಮಾನ ಆಧಾರಿತ ಸಲಹೆ' : 'Weather-based Advisory'}
        </h4>
        <div className="flex items-center gap-2 text-blue-700 text-sm mb-2">
          <MapPin size={16} />
          <span>{language === 'kn' ? 'ರಾಮನಗರ, ಕರ್ನಾಟಕ' : 'Ramanagara, Karnataka'}</span>
        </div>
        <p className="text-sm text-blue-800 leading-relaxed">
          {language === 'kn' 
            ? 'ನಾಳೆ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ಸೊಪ್ಪನ್ನು ಒಣಗಿಸಿ ಇಟ್ಟುಕೊಳ್ಳಿ.' 
            : 'Expected rainfall tomorrow. Ensure mulberry leaves are stored in a dry place.'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-4">{language === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : 'Government Schemes'}</h4>
        <div className="space-y-4">
          <div className="p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
            <h5 className="font-bold text-green-900 text-sm">{language === 'kn' ? 'ರೇಷ್ಮೆ ಹುಳು ಸಾಕಾಣಿಕೆ ಸಬ್ಸಿಡಿ' : 'Silkworm Rearing Subsidy'}</h5>
            <p className="text-xs text-green-700 mt-1">{language === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನ: ಜುಲೈ ೩೦' : 'Last date to apply: July 30'}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border-l-4 border-purple-500">
            <h5 className="font-bold text-purple-900 text-sm">{language === 'kn' ? 'ಹೊಸ ರೇಷ್ಮೆ ತಳಿ ತರಬೇತಿ' : 'New Breed Training'}</h5>
            <p className="text-xs text-purple-700 mt-1">{language === 'kn' ? 'ಮೈಸೂರು ತರಬೇತಿ ಕೇಂದ್ರದಲ್ಲಿ ಲಭ್ಯ' : 'Available at Mysore Training Center'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorySystem;
