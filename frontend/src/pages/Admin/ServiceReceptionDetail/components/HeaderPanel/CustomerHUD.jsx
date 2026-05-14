import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';

const CustomerHUD = ({ customer_info }) => {
    const { t } = useTranslation('adminRODetail');
    
    const customerName = customer_info?.full_name || 'Unknown';
    const customerPhone = customer_info?.phone || 'N/A';

    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-lg p-4 md:p-5 border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-4 md:p-5">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#23293c] flex items-center justify-center text-slate-600 dark:text-[#d3c5ac]">
                <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest">{t('hud_client', 'Khách hàng')}</p>
                <p className="text-base font-bold text-slate-900 dark:text-[#dce1fb] uppercase tracking-wide truncate">{customerName}</p>
                <p className="text-sm text-slate-500 dark:text-[#d3c5ac] font-mono">{customerPhone}</p>
            </div>
        </div>
    );
};

export default CustomerHUD;
