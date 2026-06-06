import React from 'react';
import { Shield, BookOpen, AlertTriangle, FileText } from 'lucide-react';

export function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-primary-600 h-8 w-8" />
        <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
      </div>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-6">Welcome to the SMEHub Bonny Island Help Center. How can we help you today?</p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Frequently Asked Questions</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="font-medium text-slate-900">How do I list my business?</h3>
              <p className="text-slate-600 mt-1">Navigate to the "Submit Business" page from the main navigation and fill out your business details. Our team will review your application shortly.</p>
            </li>
            <li>
              <h3 className="font-medium text-slate-900">Is it free to list my business?</h3>
              <p className="text-slate-600 mt-1">Yes, basic listings on SMEHub Bonny are completely free for local businesses.</p>
            </li>
            <li>
              <h3 className="font-medium text-slate-900">How do I update my business information?</h3>
              <p className="text-slate-600 mt-1">Please contact support with your updated details, or log in to the dashboard if your account is linked.</p>
            </li>
          </ul>
        </div>
        <p className="text-slate-600">Need more assistance? Contact us at <a href="mailto:williamemmanuel2025@gmail.com" className="text-primary-600 hover:underline">williamemmanuel2025@gmail.com</a>.</p>
      </div>
    </div>
  );
}

export function SafetyInformation() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="text-amber-500 h-8 w-8" />
        <h1 className="text-3xl font-bold text-slate-900">Safety Information</h1>
      </div>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-6">Your safety is our top priority when connecting with local businesses and services.</p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Safety Guidelines</h2>
          <ul className="space-y-4">
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span className="text-slate-600"><strong>Verify Business Credentials:</strong> Always check if a business has a "Verified" badge on our platform before making substantial payments.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span className="text-slate-600"><strong>Meet in Public Places:</strong> If meeting an independent service provider for the first time, arrange to meet in a public, well-lit area.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span className="text-slate-600"><strong>Read Reviews:</strong> Check what other users have experienced to make informed decisions.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span className="text-slate-600"><strong>Report Suspicious Activity:</strong> If a business listing seems fraudulent or a service provider acts unprofessionally, report it to us immediately.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-primary-600 h-8 w-8" />
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      </div>
      <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">1. Information We Collect</h2>
        <p className="text-slate-600 mb-6">We collect information you provide directly to us when you submit a business listing, contact us, or otherwise communicate with us. This may include your name, email address, phone number, and business details.</p>
        
        <h2 className="text-xl font-semibold mb-4 text-slate-800">2. How We Use Your Information</h2>
        <p className="text-slate-600 mb-6">We use the information to provide, maintain, and improve our services, communicate with you, and monitor and analyze trends, usage, and activities in connection with our services.</p>
        
        <h2 className="text-xl font-semibold mb-4 text-slate-800">3. Information Sharing</h2>
        <p className="text-slate-600 mb-6">We share the business information you explicitly provide for your public listing. We do not share your private contact information with third parties unless required by law.</p>
        
        <p className="text-sm text-slate-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="text-slate-600 h-8 w-8" />
        <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      </div>
      <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">1. Acceptance of Terms</h2>
        <p className="text-slate-600 mb-6">By accessing and using SMEHub Bonny Island, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2 className="text-xl font-semibold mb-4 text-slate-800">2. Description of Service</h2>
        <p className="text-slate-600 mb-6">SMEHub provides a digital directory for local businesses in Bonny Island. We do not guarantee the quality of services provided by the businesses listed on our platform.</p>
        
        <h2 className="text-xl font-semibold mb-4 text-slate-800">3. User Conduct</h2>
        <p className="text-slate-600 mb-6">You agree not to use the platform to submit false information, impersonate any person or entity, or upload any content that is offensive, illegal, or infringes on the rights of others.</p>
        
        <h2 className="text-xl font-semibold mb-4 text-slate-800">4. Modifications to Service</h2>
        <p className="text-slate-600 mb-6">We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>
        
        <p className="text-sm text-slate-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
