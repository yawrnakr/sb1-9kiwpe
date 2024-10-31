import React, { useState } from 'react';
import { BarChart3, Globe, AlertTriangle, DollarSign, LineChart, Shield, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export default function Sidebar({ onNavigate, activePage }: SidebarProps) {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
    { icon: Globe, label: 'Websites', id: 'websites' },
    { icon: AlertTriangle, label: 'MFA Detection', id: 'mfa-detection' },
    { icon: DollarSign, label: 'Revenue', id: 'revenue' },
    { icon: LineChart, label: 'Analytics', id: 'analytics' },
    { icon: Shield, label: 'Compliance', id: 'compliance' },
  ];

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div className="flex items-center mb-8 px-2">
        <Shield className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">MFA-Buster</span>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center w-full px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              activePage === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Smith</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <div className="space-y-1">
          <button className="flex items-center w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}