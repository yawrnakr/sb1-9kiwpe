import React from 'react';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function MFADetectionPage() {
  const { websites, loading, error } = useWebsites();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const highRiskSites = websites.filter(site => site.mfaScore > 50);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MFA Detection</h1>
            <p className="text-sm text-gray-500">Sites with MFA score greater than 50</p>
          </div>
        </div>
        <div className="bg-yellow-50 px-4 py-2 rounded-lg flex items-center">
          <Info className="h-5 w-5 text-yellow-600 mr-2" />
          <span className="text-sm text-yellow-700">
            {highRiskSites.length} high-risk sites detected
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {highRiskSites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                <p className="text-sm text-gray-500">{site.url}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">MFA Score</p>
                  <p className="text-2xl font-bold text-red-600">{site.mfaScore}/100</p>
                </div>
                <Shield className="h-10 w-10 text-red-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Monthly Traffic</p>
                <p className="text-lg font-semibold text-gray-900">{site.traffic}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Revenue Impact</p>
                <p className="text-lg font-semibold text-gray-900">{site.revenue}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${site.riskColor}`}>
                  {site.risk}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Traffic Sources</h4>
              <div className="space-y-3">
                {site.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm text-gray-600 w-24">{source.source}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full"
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
          </div>
        ))}
      </div>
    </div>
  );
}