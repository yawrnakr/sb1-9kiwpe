import React from 'react';
import { Shield, MoreVertical } from 'lucide-react';

export default function ThreatMap() {
  const threats = [
    { id: 1, type: 'Content Spam', level: 'High', count: 28, color: 'bg-red-500' },
    { id: 2, type: 'Click Fraud', level: 'Medium', count: 15, color: 'bg-yellow-500' },
    { id: 3, type: 'Invalid Traffic', level: 'Low', count: 8, color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">MFA Threat Map</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {threats.map((threat) => (
            <div key={threat.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{threat.type}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  threat.level === 'High' ? 'text-red-600 bg-red-50' :
                  threat.level === 'Medium' ? 'text-yellow-600 bg-yellow-50' :
                  'text-green-600 bg-green-50'
                }`}>
                  {threat.level} Risk
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${threat.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(threat.count / 30) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {threat.count} instances detected
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}