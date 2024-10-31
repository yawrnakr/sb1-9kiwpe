import React from 'react';
import { ArrowUpRight, ArrowDownRight, Globe, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { Website } from '../types';
import { LineChart } from './charts/LineChart';

interface WebsiteDetailsProps {
  website: Website;
  onClose: () => void;
}

export default function WebsiteDetails({ website, onClose }: WebsiteDetailsProps) {
  const monthLabels = ['Jan', 'Feb', 'Mar'];
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-8 border w-4/5 shadow-lg rounded-xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{website.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Traffic</p>
                <p className="text-2xl font-bold text-gray-900">{website.traffic}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <LineChart
                data={website.monthlyStats.map(stat => stat.traffic)}
                labels={monthLabels}
                color="blue"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{website.revenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4">
              <LineChart
                data={website.monthlyStats.map(stat => stat.revenue)}
                labels={monthLabels}
                color="green"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">MFA Score</p>
                <p className="text-2xl font-bold text-gray-900">{website.mfaScore}/100</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4">
              <LineChart
                data={website.monthlyStats.map(stat => stat.mfaScore)}
                labels={monthLabels}
                color="yellow"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {website.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{source.source}</span>
                  <div className="flex items-center">
                    <div className="w-48 h-2 bg-gray-200 rounded-full mr-3">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Site Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">URL</p>
                <p className="text-sm font-medium">{website.url}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">GAM Network ID</p>
                <p className="text-sm font-medium">{website.gam_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Topics</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {website.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}