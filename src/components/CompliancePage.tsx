import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  impact: 'high' | 'medium' | 'low';
}

export default function CompliancePage() {
  const { websites, loading, error } = useWebsites();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const getComplianceChecks = (mfaScore: number): ComplianceCheck[] => [
    {
      id: 'traffic-source',
      name: 'Traffic Source Verification',
      description: 'Validates that traffic sources are legitimate and traceable',
      status: mfaScore > 70 ? 'warning' : mfaScore > 50 ? 'failed' : 'passed',
      impact: 'high',
    },
    {
      id: 'content-quality',
      name: 'Content Quality Assessment',
      description: 'Ensures content meets quality guidelines and is original',
      status: mfaScore > 60 ? 'failed' : 'passed',
      impact: 'high',
    },
    {
      id: 'ad-placement',
      name: 'Ad Placement Compliance',
      description: 'Checks if ad placements follow platform policies',
      status: mfaScore > 40 ? 'warning' : 'passed',
      impact: 'medium',
    },
    {
      id: 'user-experience',
      name: 'User Experience Standards',
      description: 'Evaluates site navigation and content accessibility',
      status: mfaScore > 80 ? 'failed' : mfaScore > 60 ? 'warning' : 'passed',
      impact: 'medium',
    },
  ];

  const getStatusColor = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getImpactColor = (impact: ComplianceCheck['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Shield className="h-8 w-8 text-blue-500 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Monitor</h1>
          <p className="text-sm text-gray-500">Website compliance and policy adherence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {websites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                  <p className="text-sm text-gray-500">{site.url}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">MFA Score</p>
                    <p className="text-xl font-bold text-gray-900">{site.mfaScore}/100</p>
                  </div>
                  <button
                    onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    {selectedSite === site.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {selectedSite === site.id && (
                <div className="space-y-4">
                  {getComplianceChecks(site.mfaScore).map((check) => (
                    <div
                      key={check.id}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="mr-4">
                        {getStatusIcon(check.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {check.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                              {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(check.impact)}`}>
                              {check.impact.charAt(0).toUpperCase() + check.impact.slice(1)} Impact
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}