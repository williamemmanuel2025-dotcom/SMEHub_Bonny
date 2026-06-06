/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import BusinessProfile from './pages/BusinessProfile';
import SubmitBusiness from './pages/SubmitBusiness';
import AdminDashboard from './pages/AdminDashboard';
import { HelpCenter, SafetyInformation, PrivacyPolicy, TermsOfService } from './pages/StaticPages';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/admin" element={null} />
            <Route path="*" element={<Header />} />
          </Routes>
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/businesses" element={<Discover />} />
              <Route path="/business/:slug" element={<BusinessProfile />} />
              <Route path="/submit-business" element={<SubmitBusiness />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/safety" element={<SafetyInformation />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>

          <Routes>
            <Route path="/admin" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
