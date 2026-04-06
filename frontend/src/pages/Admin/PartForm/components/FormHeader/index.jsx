import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ChevronRight, Home } from 'lucide-react';

const FormHeader = ({ isEditMode, onSubmit, onDraft, onDuplicate, isSaving, t }) => {
    const navigate = useNavigate();

    return (
        <header className="mb-12">
            <nav className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest mb-3">
                <span onClick={() => navigate('/admin/dashboard')} className="hover:text-yellow-500 transition-colors cursor-pointer flex items-center">
                    <Home size={14} />
                </span>
                <ChevronRight size={14} />
                <span onClick={() => navigate('/admin/parts')} className="hover:text-yellow-500 transition-colors cursor-pointer">
                    {t('adminParts:breadcrumbParts')}
                </span>
                <ChevronRight size={14} />
                <span className="text-yellow-600 dark:text-yellow-500 font-bold">
                    {isEditMode ? t('adminPartForm:titleEdit') : t('adminPartForm:titleCreate')}
                </span>
            </nav>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
                {isEditMode ? t('adminPartForm:titleEdit') : t('adminPartForm:titleCreate')}
            </h2>
            <div className="flex gap-4 mt-6">
                <button 
                    type="button"
                    disabled={isSaving}
                    onClick={onDraft}
                    className="px-8 py-3 rounded-full bg-slate-200 dark:bg-[#23293c] text-slate-700 dark:text-white font-bold shadow-lg hover:scale-105 transition-transform active:scale-95 disabled:opacity-50"
                >
                    {t('adminPartForm:btnDraft')}
                </button>
                {isEditMode && (
                    <button 
                        type="button"
                        disabled={isSaving}
                        onClick={onDuplicate}
                        className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95 disabled:opacity-50"
                    >
                        {t('adminPartForm:btnDuplicate')}
                    </button>
                )}
                <button 
                    type="button"
                    disabled={isSaving}
                    onClick={onSubmit}
                    className="px-8 py-3 rounded-full bg-yellow-500 dark:bg-yellow-500 text-white dark:text-[#141416] font-bold shadow-xl shadow-yellow-500/20 hover:scale-105 transition-transform active:scale-95 disabled:opacity-50"
                >
                    {isSaving ? t('adminPartForm:btnSaving') : t('adminPartForm:btnSave')}
                </button>
                <button 
                    type="button"
                    onClick={() => navigate('/admin/parts')}
                    className="px-8 py-3 rounded-full bg-white dark:bg-[#23293c] border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-[#2e3447] transition-colors"
                >
                    {t('adminPartForm:btnCancel')}
                </button>
            </div>
        </header>
    );
};

export default FormHeader;
