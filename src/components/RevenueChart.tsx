import React from 'react';
import { DollarSign, TrendingUp, MoreVertical } from 'lucide-react';

export default function RevenueChart() {
  const metrics = [
    { label: 'Total Revenue', value: '$142,384', change: '+12.3%', trend: 'up' },
    { label: 'Average CPM', value: '$4.28', change: '+8.1%', trend: 'up' },
    { label: 'Invalid Traffic', value: '2.4%', change: '-1.2%', trend: 'down' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">Revenue Analytics</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{metric.value}</p>
              <div className={`flex items-center mt-2 ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {[45, 68, 82, 71, 43, 60, 50, 91, 52, 63, 58, 71].map((value, i) => (
              <div key={i} className="w-8">
                <div
                  className="bg-blue-600 rounded-t transition-all duration-500"
                  style={{ height: `${value}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}