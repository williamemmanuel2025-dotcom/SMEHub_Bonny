import React, { useState } from 'react';
import { Building2, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SubmitBusiness() {
  const { categories, addBusiness } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const newBusiness = {
      id: `b_${Date.now()}`,
      business_name: formData.get('business_name') as string,
      slug: (formData.get('business_name') as string).toLowerCase().replace(/\s+/g, '-'),
      category: formData.get('category') as string,
      subcategory: formData.get('subcategory') as string,
      description: formData.get('description') as string,
      address: formData.get('address') as string,
      area: formData.get('area') as string,
      city: formData.get('city') as string,
      latitude: 4.4, // default dummy
      longitude: 7.1, // default dummy
      phone: formData.get('phone') as string,
      whatsapp: formData.get('whatsapp') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
      opening_hours: '9:00 AM - 5:00 PM', // default
      rating: 0,
      total_reviews: 0,
      cover_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      verified_status: false,
      featured_status: false
    };
    
    // Simulate API submission
    setTimeout(() => {
      addBusiness(newBusiness);
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Submission Successful!</h1>
          <p className="text-slate-600 mb-8">
            Thank you for listing your business. Our admin team will review your submission and verify your details shortly. You will be notified via email once approved.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all"
          >
            Submit Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">List Your Business</h1>
          <p className="text-slate-500">Reach more customers locally by adding your SME to our directory.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200">
          
          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 items-start mb-8 text-sm">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p>Ensure all information provided is accurate. Fake listings will be permanently banned from the platform.</p>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building2 className="text-primary-500" size={20} />
              Business Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name <span className="text-red-500">*</span></label>
                <input required name="business_name" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="e.g. ABC Electronics" />
              </div>
              
               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category <span className="text-red-500">*</span></label>
                <select required name="category" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subcategory</label>
                <input type="text" name="subcategory" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="e.g. Gadget Store" />
              </div>

               <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
                <textarea required name="description" rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none" placeholder="Describe your business, products, and services..."></textarea>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
              Contact & Location
            </h2>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address <span className="text-red-500">*</span></label>
                <input required name="address" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="e.g. 15 Artillery Road" />
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Area <span className="text-red-500">*</span></label>
                 <select required name="area" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select Area</option>
                  <option value="Finima">Finima</option>
                  <option value="Akiama">Akiama</option>
                  <option value="King Perekule">King Perekule</option>
                  <option value="Abalamabie">Abalamabie</option>
                  <option value="Coconut Estate">Coconut Estate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City <span className="text-red-500">*</span></label>
                <input required name="city" type="text" defaultValue="Bonny Island" readOnly className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 outline-none cursor-not-allowed" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input required name="phone" type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="0800..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp Number</label>
                <input type="tel" name="whatsapp" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="0800..." />
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input type="email" name="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="hello@business.com" />
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
                <input type="text" name="website" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="www.example.com or https://" />
              </div>
             </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold rounded-xl transition-all shadow-md shadow-primary-600/20 active:scale-95 flex items-center justify-center gap-2 ml-auto"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <><Save size={20} /> Submit Business Listing</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
