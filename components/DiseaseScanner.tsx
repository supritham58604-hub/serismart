
import React, { useState, useRef } from 'react';
import { Language, DiseaseResult } from '../types';
import { TRANSLATIONS } from '../constants';
import { analyzeDisease } from '../services/geminiService';
import { Camera, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

interface DiseaseScannerProps {
  language: Language;
}

const DiseaseScanner: React.FC<DiseaseScannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setImage(reader.result as string);
      setLoading(true);
      setResult(null);
      try {
        const data = await analyzeDisease(base64);
        setResult(data);
      } catch (error) {
        console.error("Analysis failed", error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border-2 border-dashed border-green-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        {image ? (
          <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-lg">
            <img src={image} alt="captured silkworm" className="w-full h-full object-cover" />
            {loading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="animate-spin text-white">
                  <RefreshCw size={40} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 text-green-700">
            <Camera size={64} className="mx-auto opacity-40" />
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-green-800 transition-all flex items-center gap-2"
        >
          <Camera size={24} />
          {image ? (language === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Rescan') : t.scanSilkworm}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCapture}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
      </div>

      {loading && (
        <div className="text-center font-bold text-green-700 animate-pulse">
          {t.analyzing}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-green-600 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'kn' ? result.kannadaName : result.diseaseName}
              </h3>
              <div className="flex items-center gap-1 text-sm text-green-700 font-bold mt-1">
                <CheckCircle2 size={16} />
                {language === 'kn' ? 'ನಿಖರತೆ' : 'Confidence'}: {Math.round(result.confidence * 100)}%
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {language === 'kn' ? result.kannadaDescription : result.description}
          </p>

          <div className="space-y-3">
            <h4 className="font-bold text-red-600 flex items-center gap-2">
              <AlertTriangle size={18} />
              {language === 'kn' ? 'ತಕ್ಷಣದ ಕ್ರಮಗಳು' : 'Immediate Actions'}
            </h4>
            <ul className="space-y-2">
              {(language === 'kn' ? result.kannadaActions : result.actions).map((action, i) => (
                <li key={i} className="flex gap-2 text-gray-700 bg-red-50 p-2 rounded-lg">
                  <span className="font-bold text-red-600">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseScanner;
