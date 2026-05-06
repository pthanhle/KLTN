import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

export const StickyFooter = ({ isDirty, isSaving, onReset, onSubmit }) => {
    const { t } = useTranslation();

    return (
        <div className={`fixed bottom-0 left-0 w-full md:pl-64 bg-white dark:bg-[#1c1c1e]/90 backdrop-blur-md border-t border-slate-200 dark:border-white/5 p-4 z-40 transition-transform duration-300 ${isDirty ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="max-w-5xl mx-auto flex justify-end space-x-4 items-center px-6">
                <button 
                    type="button" 
                    onClick={onReset}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                    {t('adminStaffDetail:btn_discard', 'Reset')}
                </button>
                <button 
                    type="button"
                    onClick={onSubmit}
                    disabled={isSaving}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {t('adminStaffDetail:btn_save_config')}
                </button>
            </div>
        </div>
    );
};
