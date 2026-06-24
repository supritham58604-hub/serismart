
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Thermometer, Droplets, Wind, AlertCircle, CheckCircle } from 'lucide-react';

interface EnvironmentMonitorProps {
  language: Language;
}

const EnvironmentMonitor: React.FC<EnvironmentMonitorProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [temp, setTemp] = useState(26);
  const [humidity, setHumidity] = useState(75);

  // Simple logic for status
  const isGood = temp >= 24 && temp <= 28 && humidity >= 70 && humidity <= 85;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600 mb-3">
            <Thermometer size={32} />
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase">{t.temp}</span>
          <div className="text-3xl font-bold text-gray-900 mt-1">{temp}°C</div>
          <input 
            type="range" min="15" max="40" value={temp} 
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full mt-4 accent-orange-500"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-3">
            <Droplets size={32} />
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase">{t.humidity}</span>
          <div className="text-3xl font-bold text-gray-900 mt-1">{humidity}%</div>
          <input 
            type="range" min="30" max="100" value={humidity} 
            onChange={(e) => setHumidity(parseInt(e.target.value))}
            className="w-full mt-4 accent-blue-500"
          />
        </div>
      </div>

      <div className={`p-6 rounded-2xl flex items-center gap-4 ${isGood ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isGood ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
        <div>
          <h4 className="font-bold text-lg">{isGood ? t.good : t.actionRequired}</h4>
          <p className="text-sm opacity-90">
            {isGood 
              ? (language === 'kn' ? 'ನಿಮ್ಮ ರೇಷ್ಮೆ ಸಾಕಣೆ ಮನೆ ಉತ್ತಮ ಸ್ಥಿತಿಯಲ್ಲಿದೆ.' : 'Your rearing house is in optimal condition.') 
              : (language === 'kn' ? 'ತಾಪಮಾನ ಅಥವಾ ಆರ್ದ್ರತೆಯನ್ನು ಸರಿಹೊಂದಿಸಿ.' : 'Adjust temperature or humidity levels.')}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h4 className="font-bold flex items-center gap-2">
          <Wind size={20} className="text-blue-500" />
          {language === 'kn' ? 'ಗಾಳಿ ಮತ್ತು ಬೆಳಕು' : 'Ventilation & Light'}
        </h4>
        <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg">
          <span>{language === 'kn' ? 'ಗಾಳಿಯಾಡುವಿಕೆ' : 'Ventilation'}</span>
          <span className="font-bold text-green-600">{language === 'kn' ? 'ಸಾಕಷ್ಟು' : 'Sufficient'}</span>
        </div>
        <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg">
          <span>{language === 'kn' ? 'ಬೆಳಕು' : 'Lighting'}</span>
          <span className="font-bold text-orange-600">{language === 'kn' ? 'ಮಧ್ಯಮ' : 'Moderate'}</span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentMonitor;
