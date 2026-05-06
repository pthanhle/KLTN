import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { RoleBadge } from '../../../../Staff/components/Table/RoleBadge';

const StaffQuickInfo = ({ fullName, employeeId, role, phone, email }) => {
    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{fullName}</h1>
                <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold uppercase tracking-widest border border-slate-200 dark:border-white/5">{employeeId}</span>
                <RoleBadge role={role} />
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-3 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span>{phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <span>{email || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default StaffQuickInfo;
