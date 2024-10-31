import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const TOPICS = [
  'Education',
  'News',
  'Entertainment',
  'Technology',
  'Finance',
  'Gaming',
  'Sports',
  'Lifestyle',
];

interface AddSiteModalProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export default function AddSiteModal({ onClose, onSubmit }: AddSiteModalProps) {
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    topics: [] as string[],
    gam_id: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidatingGAM, setIsValidatingGAM] = useState(false);

  const validateGAMId = async (gamId: string) => {
    // This would be replaced with actual GAM API validation
    return /^\d{11}$/.test(gamId);
  };

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.url) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData.name) {
      newErrors.name = 'Site name is required';
    }

    if (!formData.gam_id) {
      newErrors.gam_id = 'Google Ad Manager Network ID is required';
    } else {
      setIsValidatingGAM(true);
      const isValidGAM = await validateGAMId(formData.gam_id);
      setIsValidatingGAM(false);
      
      if (!isValidGAM) {
        newErrors.gam_id = 'Please enter a valid Google Ad Manager Network ID';
      }
    }

    if (formData.topics.length === 0) {
      newErrors.topics = 'Please select at least one topic';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!await validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error adding site:', error);
    }
  };

  const toggleTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-8 border w-full max-w-2xl shadow-lg rounded-xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Site</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-blue-700 font-medium">
                Google Ad Manager Integration Required
              </p>
              <p className="text-sm text-blue-600 mt-1">
                A valid Google Ad Manager Network ID is required to fetch revenue data, traffic statistics, and other metrics for your website.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Ad Manager Network ID *
            </label>
            <input
              type="text"
              value={formData.gam_id}
              onChange={(e) => setFormData(prev => ({ ...prev, gam_id: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="21700000000"
            />
            {errors.gam_id && (
              <p className="mt-1 text-sm text-red-600">{errors.gam_id}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Example: 21700000000 (11 digits)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600">{errors.url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="My Website"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics *
            </label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.topics.includes(topic)
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            {errors.topics && (
              <p className="mt-1 text-sm text-red-600">{errors.topics}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isValidatingGAM}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidatingGAM ? 'Validating...' : 'Add Site'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}