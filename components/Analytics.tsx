
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Package, AlertOctagon } from 'lucide-react';

interface AnalyticsProps {
  language: Language;
}

const Analytics: React.FC<AnalyticsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const data = [
    { name: 'Batch 1', yield: 65, loss: 5 },
    { name: 'Batch 2', yield: 72, loss: 3 },
    { name: 'Batch 3', yield: 58, loss: 12 },
    { name: 'Batch 4', yield: 80, loss: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h4 className="font-bold mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-green-600" />
          {t.yieldHistory}
        </h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="yield" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.yield > 70 ? '#15803d' : '#eab308'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <Package className="text-green-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-green-900">275 kg</div>
          <div className="text-xs text-green-700 font-bold">{language === 'kn' ? 'ಒಟ್ಟು ಇಳುವರಿ' : 'Total Yield'}</div>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <AlertOctagon className="text-red-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-red-900">5.4%</div>
          <div className="text-xs text-red-700 font-bold">{language === 'kn' ? 'ಸರಾಸರಿ ನಷ್ಟ' : 'Avg Loss'}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h4 className="font-bold mb-4">{language === 'kn' ? 'ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು' : 'Recent Records'}</h4>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="font-bold text-sm">CSR2 x CSR4</div>
                <div className="text-[10px] text-gray-500">Batch {i} • 12 June 2024</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-700 text-sm">82 kg</div>
                <div className="text-[10px] text-gray-400">AA Grade</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
