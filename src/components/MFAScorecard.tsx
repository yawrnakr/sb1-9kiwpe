import React from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function MFAScorecard() {
  const stats = [
    {
      title: 'MFA Risk Score',
      value: '72/100',
      change: '+5.2%',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Monthly Revenue',
      value: '$24,532',
      change: '+12.3%',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Traffic Quality',
      value: '89%',
      change: '+3.1%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Users',
      value: '18.2K',
      change: '+2.4%',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-green-600">{stat.change}</span>
            <span className="ml-2 text-sm text-gray-500">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}