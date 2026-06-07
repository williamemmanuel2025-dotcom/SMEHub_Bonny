import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, FileText, CheckCircle, XCircle, BarChart3, 
  Search, MoreVertical, ShieldCheck, Download, Trash2, 
  Shield, PauseCircle, Star, ArrowLeft
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Business } from '../data/mockData';
import ActionMenu from '../components/Admin/ActionMenu';
import ConfirmDialog from '../components/Admin/ConfirmDialog';
import EditBusinessModal from '../components/Admin/EditBusinessModal';

type AdminRole = 'superadmin' | 'admin' | 'moderator';

interface DialogState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'info';
  actionType: string | null;
  businessId: string | null;
  isBulk: boolean;
}

export default function AdminDashboard() {
  const { businesses, updateBusiness } = useAppContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('admin');
  
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dialog State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    actionType: null,
    businessId: null,
    isBulk: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ew10152030.Com') {
      setRole('superadmin');
      setIsAuthenticated(true);
    } else if (password === 'Admin1234') {
      setRole('admin');
      setIsAuthenticated(true);
    } else if (password === 'Moderator1234') {
      setRole('moderator');
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials.");
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(businesses.slice(0, 10).map(b => b.id)); // Assuming page slice
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openDialog = (
    title: string, 
    message: string, 
    type: 'danger' | 'warning' | 'info', 
    actionType: string, 
    businessId: string | null = null, 
    isBulk: boolean = false
  ) => {
    setDialogState({
      isOpen: true,
      title,
      message,
      type,
      actionType,
      businessId,
      isBulk
    });
  };

  const closeDialog = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const executeAction = () => {
    const { actionType, businessId, isBulk } = dialogState;
    const targetIds = isBulk ? selectedIds : (businessId ? [businessId] : []);

    targetIds.forEach(id => {
      const biz = businesses.find(b => b.id === id);
      if (!biz) return;
      
      switch (actionType) {
        case 'verify':
        case 'approve':
          updateBusiness(biz.id, { ...biz, verified_status: true });
          break;
        case 'unverify':
        case 'reject':
          updateBusiness(biz.id, { ...biz, verified_status: false });
          break;
        case 'suspend':
          // In a real app we might have a status field like 'active' | 'suspended'
          console.log(`Suspended ${biz.business_name}`);
          break;
        case 'delete':
          // In a real app we would call delete context/API
          console.log(`Deleted ${biz.business_name}`);
          break;
      }
    });

    if (isBulk) {
      setSelectedIds([]);
    }
    closeDialog();
  };

  const handleAction = (action: string, business: Business) => {
    switch (action) {
      case 'edit':
        if (role === 'superadmin') {
          setEditingBusiness(business);
        } else {
          alert('Only Super Admin can edit business listings.');
        }
        break;
      case 'view':
      case 'analytics':
      case 'contact':
      case 'reviews':
        console.log(`Navigating to ${action} for ${business.business_name}`);
        // Navigation mock
        break;
      case 'feature':
      case 'unfeature':
      case 'reactivate':
        console.log(`Action ${action} executed for ${business.business_name}`);
        break;
      case 'verify':
      case 'approve':
        updateBusiness(business.id, { ...business, verified_status: true });
        break;
      case 'suspend':
        openDialog(
          'Suspend Listing',
          `Are you sure you want to suspend "${business.business_name}"? They will no longer be visible to the public.`,
          'warning',
          'suspend',
          business.id
        );
        break;
      case 'reject':
        openDialog(
          'Reject Listing',
          `Are you sure you want to reject the listing application for "${business.business_name}"?`,
          'danger',
          'reject',
          business.id
        );
        break;
      case 'unverify':
        openDialog(
          'Remove Verification',
          `Are you sure you want to remove the verification badge for "${business.business_name}"?`,
          'warning',
          'unverify',
          business.id
        );
        break;
      case 'delete':
        openDialog(
          'Delete Listing completely',
          `Are you sure you want to PERMANENTLY delete "${business.business_name}"? This action cannot be undone.`,
          'danger',
          'delete',
          business.id
        );
        break;
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    
    switch (action) {
      case 'verify':
        openDialog(
          'Verify Selected Listings',
          `Are you sure you want to verify ${selectedIds.length} listings?`,
          'info',
          'verify',
          null,
          true
        );
        break;
      case 'suspend':
        openDialog(
          'Suspend Selected Listings',
          `Are you sure you want to suspend ${selectedIds.length} listings?`,
          'warning',
          'suspend',
          null,
          true
        );
        break;
      case 'delete':
         openDialog(
          'Delete Selected Listings',
          `Are you sure you want to PERMANENTLY delete ${selectedIds.length} listings?`,
          'danger',
          'delete',
          null,
          true
        );
        break;
      case 'export':
        console.log("Exporting IDs:", selectedIds);
        alert(`Exported ${selectedIds.length} records logic running.`);
        break;
      case 'feature':
        console.log(`Featured ${selectedIds.length} selected businesses`);
        break;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={24} className="text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access</h1>
          <p className="text-slate-500 text-sm mb-4">Enter your credentials to access the SME dashboard.</p>
          
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all mb-4">
            Login
          </button>
          
          <Link to="/" className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Back 
          </Link>
        </form>
      </div>
    );
  }

  const verifiedCount = businesses.filter(b => b.verified_status).length;
  const unverifiedCount = businesses.length - verifiedCount;
  const displayList = businesses.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Mock */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-white font-bold text-xl">SME Admin</h2>
          <div className="mt-1 text-xs px-2 py-0.5 bg-slate-800 inline-block rounded text-slate-400 capitalize">
            Role: {role}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
           <a href="#" className="flex items-center gap-3 bg-primary-600/10 text-primary-400 px-4 py-3 rounded-xl font-medium">
             <BarChart3 size={20} /> Dashboard
           </a>
           <a href="#" className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl font-medium transition-colors">
             <FileText size={20} /> Listings
           </a>
           <a href="#" className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl font-medium transition-colors">
             <Users size={20} /> Users
           </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm">
              <ArrowLeft size={18} /> Back
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
               <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                 <FileText size={28} />
               </div>
               <div>
                 <div className="text-sm text-slate-500 font-medium">Total Listings</div>
                 <div className="text-3xl font-bold text-slate-900">{businesses.length}</div>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
               <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                 <CheckCircle size={28} />
               </div>
               <div>
                 <div className="text-sm text-slate-500 font-medium">Verified</div>
                 <div className="text-3xl font-bold text-slate-900">{verifiedCount}</div>
               </div>
            </div>
            
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
               <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                 <FileText size={28} />
               </div>
               <div>
                 <div className="text-sm text-slate-500 font-medium">Pending Approvals</div>
                 <div className="text-3xl font-bold text-slate-900">{unverifiedCount}</div>
               </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            
            {/* Table Header / Toolbar */}
            <div className="p-6 border-b border-slate-200 bg-white rounded-t-2xl">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h2 className="font-bold text-lg text-slate-900">Recent Submissions</h2>
                
                <div className="flex flex-wrap items-center gap-3">
                  {/* Bulk Actions (only show if selected) */}
                  {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2 mr-2 animate-in fade-in slide-in-from-right-4 duration-300">
                      <span className="text-sm font-medium text-slate-600 mr-2">
                        {selectedIds.length} selected
                      </span>
                      <button onClick={() => handleBulkAction('verify')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip-trigger" aria-label="Verify Selected">
                        <Shield size={18} />
                      </button>
                      {role !== 'moderator' && (
                        <>
                          <button onClick={() => handleBulkAction('feature')} className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors tooltip-trigger" aria-label="Feature Selected">
                            <Star size={18} />
                          </button>
                          <button onClick={() => handleBulkAction('suspend')} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors tooltip-trigger" aria-label="Suspend Selected">
                            <PauseCircle size={18} />
                          </button>
                          <button onClick={() => handleBulkAction('delete')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip-trigger" aria-label="Delete Selected">
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleBulkAction('export')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger" aria-label="Export Selected">
                        <Download size={18} />
                      </button>
                      <div className="w-px h-6 bg-slate-200 mx-1"></div>
                    </div>
                  )}

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search businesses..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:bg-white w-full lg:w-64 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 w-12">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        checked={selectedIds.length === displayList.length && displayList.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4">Business</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayList.map(business => (
                    <tr 
                      key={business.id} 
                      className={`transition-colors ${selectedIds.includes(business.id) ? 'bg-primary-50/50' : 'bg-white hover:bg-slate-50'}`}
                    >
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                          checked={selectedIds.includes(business.id)}
                          onChange={() => handleSelectOne(business.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{business.business_name}</div>
                        <div className="text-slate-500 text-xs">{business.email || 'No email provided'}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{business.category}</td>
                      <td className="px-6 py-4 text-slate-600">{business.area}</td>
                      <td className="px-6 py-4">
                        {business.verified_status ? (
                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified
                           </span>
                         ) : (
                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                           </span>
                         )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionMenu 
                          business={business} 
                          onAction={handleAction} 
                          role={role}
                        />
                      </td>
                    </tr>
                  ))}
                  {displayList.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                        No businesses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <ConfirmDialog 
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        type={dialogState.type}
        onConfirm={executeAction}
        onCancel={closeDialog}
      />

      {editingBusiness && (
        <EditBusinessModal 
          business={editingBusiness}
          onClose={() => setEditingBusiness(null)}
        />
      )}
    </div>
  );
}
