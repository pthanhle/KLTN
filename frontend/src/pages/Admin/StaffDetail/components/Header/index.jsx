import React from 'react';
import { useTranslation } from 'react-i18next';
import StaffAvatar from './components/StaffAvatar';
import StaffQuickInfo from './components/StaffQuickInfo';
import { Settings, Loader2 } from 'lucide-react';

const Header = ({ staff, onEdit, onDeactivate, isUpdating, isDeactivating }) => {
    const { t } = useTranslation();

    return (
        <div className="sticky top-24 z-30 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center gap-8 shadow-sm dark:shadow-2xl transition-colors">
            {/* Avatar */}
            <StaffAvatar avatarUrl={staff.avatarUrl} fullName={staff.fullName} status={staff.status} />

            {/* Info */}
            <StaffQuickInfo 
                fullName={staff.fullName} 
                employeeId={staff.employeeId} 
                role={staff.role} 
                phone={staff.phone}
                email={staff.email}
            />

            {/* Actions */}
            <div className="shrink-0 mt-4 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <button 
                    onClick={onEdit}
                    disabled={isUpdating}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full transition-colors font-bold text-xs tracking-widest uppercase text-slate-600 dark:text-slate-300 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Settings size={16} />}
                    {t('adminStaffDetail:btn_edit_profile')}
                </button>
                <button 
                    onClick={onDeactivate}
                    disabled={isDeactivating}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 font-bold uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors border border-red-200 dark:border-red-500/20 text-xs ${isDeactivating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isDeactivating ? <Loader2 size={16} className="animate-spin" /> : null}
                    {t('adminStaffDetail:deactivate_btn')}
                </button>
            </div>
        </div>
    );
};

export default Header;
