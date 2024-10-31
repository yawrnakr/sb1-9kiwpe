import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import WebsiteAnalytics from './components/WebsiteAnalytics';
import AdAccountsOverview from './components/AdAccountsOverview';
import MFAScorecard from './components/MFAScorecard';
import ThreatMap from './components/ThreatMap';
import RevenueChart from './components/RevenueChart';
import WebsitesPage from './components/WebsitesPage';
import MFADetectionPage from './components/MFADetectionPage';
import RevenueAnalyticsPage from './components/RevenueAnalyticsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <MFAScorecard />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ThreatMap />
              <RevenueChart />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <WebsiteAnalytics />
              <AdAccountsOverview />
            </div>
          </div>
        );
      case 'websites':
        return <WebsitesPage />;
      case 'mfa-detection':
        return <MFADetectionPage />;
      case 'revenue':
        return <RevenueAnalyticsPage />;
      default:
        return <div>Page not implemented yet</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onNavigate={setCurrentPage} activePage={currentPage} />
      <main className="flex-1 overflow-y-auto">
        <DashboardHeader />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;