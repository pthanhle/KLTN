import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { message } from 'antd';

export const PrivateNotesCard = ({ customer, onSave, t }) => {
    const [notes, setNotes] = useState(customer?.admin_notes || '');
    const [isSaving, setIsSaving] = useState(false);
    const hasChanged = notes !== (customer?.admin_notes || '');

    useEffect(() => {
        setNotes(customer?.admin_notes || '');
    }, [customer?.admin_notes]);

    const handleSave = async () => {
        if (!onSave) return;
        setIsSaving(true);
        try {
            await onSave({ admin_notes: notes });
            message.success(t('adminCustomers:msgNotesSaved', 'Đã lưu ghi chú nội bộ'));
        } catch (err) {
            console.error('Save notes error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
                <label className="block text-[11px] tracking-[0.2em] font-black text-rose-500 dark:text-rose-400 uppercase">
                    {t('adminCustomers:labelPrivateNotes', 'Internal Confidential Notes')}
                </label>
                {hasChanged && (
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        {t('admin:btnSave', 'Lưu')}
                    </button>
                )}
            </div>
            <textarea 
                className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-rose-500/20 rounded-xl p-4 text-[13px] text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-rose-500 h-32 resize-none leading-relaxed transition-all input-custom placeholder:text-slate-300 dark:placeholder:text-slate-700" 
                placeholder={t('adminCustomers:placeholderNotes', 'Add private notes...')}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
        </div>
    );
};
