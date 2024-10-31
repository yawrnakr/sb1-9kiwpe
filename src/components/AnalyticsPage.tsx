import React, { useState } from 'react';
import { LineChart, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Website, TrafficSource } from '../types';

export default function AnalyticsPage() {
  const { websites, loading, error } = useWebsites();
  const [timeRange, setTimeRange] = useState('30d');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const totalTraffic = websites.reduce((sum, site) => {
    const traffic = parseInt(site.traffic.replace(/[^0-9]/g, ''), 10);
    return sum + traffic;
  }, 0);

  const aggregateTrafficSources = websites.reduce((acc: TrafficSource[], site) => {
    site.trafficSources.forEach(source => {
      const existing = acc.find(s => s.source === source.source);
      if (existing) {
        existing.percentage = (existing.percentage + source.percentage) / 2;
      } else {
        acc.push({ ...source, visits: 0 });
      }
    });
    return acc;
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
            <p className="text-sm text-gray-500">Comprehensive traffic and engagement metrics</p>
          </div>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h3>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-3xl font-bold text-gray-900">{totalTraffic.toLocaleString()}K</p>
              <p className="text-sm text-gray-500">Total Monthly Visits</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">+8.2% vs last month</span>
            </div>
          </div>
          <div className="space-y-4">
            {aggregateTrafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{source.source}</span>
                  <span className="font-medium">{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Performance</h3>
          <div className="space-y-4">
            {websites.map((site) => (
              <div key={site.id} className="flex items-center">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{site.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(parseInt(site.traffic.replace(/[^0-9]/g, ''), 10) / totalTraffic) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{site.traffic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {websites.map((site) => (
          <div key={site.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                <p className="text-sm text-gray-500">{site.url}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Monthly Traffic</p>
                  <p className="text-xl font-bold text-gray-900">{site.traffic}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">MFA Score</p>
                  <p className="text-xl font-bold text-gray-900">{site.mfaScore}/100</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Traffic Sources</h4>
                <div className="space-y-3">
                  {site.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-sm text-gray-600 w-24">{source.source}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {source.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Monthly Trends</h4>
                <div className="h-40">
                  {/* Monthly trends chart would go here */}
                  <div className="flex items-end h-full space-x-2">
                    {site.monthlyStats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-blue-100 rounded-t"
                        style={{
                          height: `${(stat.traffic / Math.max(...site.monthlyStats.map(s => s.traffic))) * 100}%`
                        }}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}