import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, User, Edit3, CheckCircle, XCircle, Shield, 
  ShieldOff, Star, StarOff, BarChart, Mail, MessageSquare, 
  PauseCircle, PlayCircle, Trash2 
} from 'lucide-react';
import { Business } from '../../data/mockData';

interface ActionMenuProps {
  business: Business;
  onAction: (action: string, business: Business) => void;
  role?: 'superadmin' | 'admin' | 'moderator';
}

export default function ActionMenu({ business, onAction, role = 'admin' }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: string) => {
    setIsOpen(false);
    onAction(action, business);
  };

  const isModerator = role === 'moderator';

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
          <div className="max-h-[300px] overflow-y-auto py-2 flex flex-col custom-scrollbar">
            
            {/* Information */}
            <div className="px-3 py-1 mb-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Information</div>
            </div>
            <MenuItem icon={<User size={16} />} label="View Profile" onClick={() => handleAction('view')} color="blue" />
            {!isModerator && (
              <MenuItem icon={<Edit3 size={16} />} label="Edit Business" onClick={() => handleAction('edit')} color="blue" />
            )}
            
            <div className="h-px bg-slate-100 my-2"></div>

            {/* Verification & Approval */}
            <div className="px-3 py-1 mb-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Verification</div>
            </div>
            {!business.verified_status ? (
              <>
                <MenuItem icon={<CheckCircle size={16} />} label="Approve Listing" onClick={() => handleAction('approve')} color="green" />
                <MenuItem icon={<Shield size={16} />} label="Verify Business" onClick={() => handleAction('verify')} color="green" />
              </>
            ) : (
              <>
                <MenuItem icon={<XCircle size={16} />} label="Reject Listing" onClick={() => handleAction('reject')} color="red" />
                <MenuItem icon={<ShieldOff size={16} />} label="Unverify Business" onClick={() => handleAction('unverify')} color="red" />
              </>
            )}

            {!isModerator && (
              <>
                <div className="h-px bg-slate-100 my-2"></div>

                {/* Promotion */}
                <div className="px-3 py-1 mb-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Promotion</div>
                </div>
                {/* Assuming 'featured' field in future */}
                <MenuItem icon={<Star size={16} />} label="Feature Business" onClick={() => handleAction('feature')} color="purple" />
                <MenuItem icon={<StarOff size={16} />} label="Remove Featured" onClick={() => handleAction('unfeature')} color="purple" />
              </>
            )}

            <div className="h-px bg-slate-100 my-2"></div>

            {/* Management */}
            <div className="px-3 py-1 mb-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Management</div>
            </div>
            <MenuItem icon={<BarChart size={16} />} label="View Analytics" onClick={() => handleAction('analytics')} color="slate" />
            {!isModerator && (
              <MenuItem icon={<Mail size={16} />} label="Contact Owner" onClick={() => handleAction('contact')} color="slate" />
            )}
            <MenuItem icon={<MessageSquare size={16} />} label="Manage Reviews" onClick={() => handleAction('reviews')} color="slate" />

            {!isModerator && (
              <>
                <div className="h-px bg-slate-100 my-2"></div>

                {/* Danger Zone */}
                <div className="px-3 py-1 mb-1">
                  <div className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Danger Zone</div>
                </div>
                <MenuItem icon={<PauseCircle size={16} />} label="Suspend Listing" onClick={() => handleAction('suspend')} color="orange" />
                {/* <MenuItem icon={<PlayCircle size={16} />} label="Reactivate Listing" onClick={() => handleAction('reactivate')} color="orange" /> */}
                <MenuItem icon={<Trash2 size={16} />} label="Delete Listing" onClick={() => handleAction('delete')} color="red" />
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ 
  icon, 
  label, 
  onClick, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  color: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'slate';
}) {
  const colorStyles = {
    green: "text-emerald-600 hover:bg-emerald-50",
    blue: "text-blue-600 hover:bg-blue-50",
    orange: "text-orange-600 hover:bg-orange-50",
    purple: "text-purple-600 hover:bg-purple-50",
    red: "text-red-600 hover:bg-red-50",
    slate: "text-slate-600 hover:bg-slate-50",
  };

  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${colorStyles[color]}`}
    >
      {icon}
      {label}
    </button>
  );
}
