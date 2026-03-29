import React from 'react';

export const PrivateNotesCard = ({ customer, t }) => {
    return (
        <div className="mt-10">
            <label className="block text-[11px] tracking-[0.2em] font-black text-rose-500 dark:text-rose-400 uppercase mb-4">
                {t('adminCustomers:labelPrivateNotes', 'Internal Confidential Notes')}
            </label>
            <textarea 
                className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-rose-500/20 rounded-xl p-4 text-[13px] text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-rose-500 h-32 resize-none leading-relaxed transition-all input-custom placeholder:text-slate-300 dark:placeholder:text-slate-700" 
                placeholder={t('adminCustomers:placeholderNotes', 'Add private notes...')}
                defaultValue={customer.notes || ''}
            />
        </div>
    );
};
