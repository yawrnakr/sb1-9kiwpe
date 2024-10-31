import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import WebsiteDetails from './WebsiteDetails';
import AddSiteModal from './AddSiteModal';

export default function WebsitesPage() {
  const { websites, loading, error } = useWebsites();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const handleAddSite = async (formData: any) => {
    // Implement site addition logic here
    console.log('Adding new site:', formData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Connected Websites</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((site) => (
          <div
            key={site.id}
            onClick={() => setSelectedSite(site.id)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                <p className="text-sm text-gray-500">{site.url}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${site.riskColor}`}>
                {site.risk}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Traffic</span>
                <span className="font-medium">{site.traffic}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium">{site.revenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MFA Score</span>
                <span className="font-medium">{site.mfaScore}/100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSite && (
        <WebsiteDetails
          website={websites.find(site => site.id === selectedSite)!}
          onClose={() => setSelectedSite(null)}
        />
      )}

      {showAddModal && (
        <AddSiteModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSite}
        />
      )}
    </div>
  );
}