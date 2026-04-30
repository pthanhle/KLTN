import React from 'react';
import { Settings2, X } from 'lucide-react';

const ServiceItemFormHeader = ({ isEditing, onClose, t }) => {
    return (
        <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 dark:bg-[#141416] flex items-center justify-center border border-yellow-100 dark:border-white/5 shadow-sm">
                    <Settings2 className="text-yellow-600 dark:text-yellow-500" size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                        {isEditing ? t('adminServiceItems:modal_edit_title') : t('adminServiceItems:modal_create_title')}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {t('adminServiceItems:modal_subtitle')}
                    </p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-50 dark:hover:bg-white/5"
            >
                <X size={24} />
            </button>
        </div>
    );
};

export default ServiceItemFormHeader;
