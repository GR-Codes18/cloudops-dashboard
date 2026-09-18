import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { CloudProvider } from './context/CloudContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Planning } from './pages/Planning';
import { Costs } from './pages/Costs';
import { Infrastructure } from './pages/Infrastructure';
import { Security } from './pages/Security';
import { Network } from './pages/Network';
import { Services } from './pages/Services';

export const App: React.FC = () => {
  return (
    <CloudProvider>
      <div className="flex min-h-screen bg-background text-text-primary antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/costs" element={<Costs />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/security" element={<Security />} />
              <Route path="/network" element={<Network />} />
              <Route path="/services" element={<Services />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </CloudProvider>
  );
};

export default App;