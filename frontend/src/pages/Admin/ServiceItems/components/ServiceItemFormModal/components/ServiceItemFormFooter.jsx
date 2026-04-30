import React from 'react';
import { Save } from 'lucide-react';

const ServiceItemFormFooter = ({ onClose, isEditing, t }) => {
    return (
        <div className="p-8 pb-6 flex items-center gap-4 bg-slate-50/50 dark:bg-[#141416] border-t border-slate-100 dark:border-white/5 rounded-b-[32px]">
            <button 
                type="button"
                onClick={onClose}
                className="flex-[1] h-14 rounded-full text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px] hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none"
            >
                {t('adminServiceItems:form_cancel')}
            </button>
            <button 
                type="submit"
                form="service-item-form"
                className="flex-[2] h-14 rounded-full bg-gradient-to-br from-[#eab308] to-[#ffd165] dark:from-[#eab308] dark:to-[#facc15] text-[#251a00] font-black uppercase tracking-[0.15em] text-[11px] shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none flex items-center justify-center gap-2"
            >
                <Save size={16} />
                {isEditing ? t('adminServiceItems:form_save_edit') : t('adminServiceItems:form_save_create')}
            </button>
        </div>
    );
};

export default ServiceItemFormFooter;
