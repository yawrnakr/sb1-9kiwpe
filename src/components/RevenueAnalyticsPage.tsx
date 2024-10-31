import React from 'react';
import { DollarSign, TrendingUp, BarChart2 } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function RevenueAnalyticsPage() {
  const { websites, loading, error } = useWebsites();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const totalRevenue = websites.reduce((sum, site) => {
    const revenue = parseFloat(site.revenue.replace(/[^0-9.-]+/g, ''));
    return sum + revenue;
  }, 0);

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <DollarSign className="h-8 w-8 text-green-500 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-sm text-gray-500">Current month revenue overview</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center text-green-600">
            <TrendingUp className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">+12.5% from last month</span>
          </div>
        </div>

        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {websites.map((site, index) => {
              const height = (parseFloat(site.revenue.replace(/[^0-9.-]+/g, '')) / totalRevenue) * 100;
              return (
                <div key={index} className="w-16">
                  <div
                    className="bg-green-500 rounded-t transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {websites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                <p className="text-sm text-gray-500">{site.url}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{site.revenue}</p>
              </div>
            </div>

            <div className="h-32">
              <div className="flex items-end h-full space-x-2">
                {site.monthlyStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-green-100 rounded-t"
                    style={{ height: `${(stat.revenue / Math.max(...site.monthlyStats.map(s => s.revenue))) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              {['Jan', 'Feb', 'Mar'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}