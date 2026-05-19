import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ChevronRight, Home } from 'lucide-react';

const FormHeader = ({ isEditMode, onSubmit, onApply, onDraft, onDuplicate, isSaving, t }) => {
    const navigate = useNavigate();

    return (
        <header className="mb-12">
            <nav className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm tracking-wide mb-3">
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
            <div className="flex gap-3 mt-6 items-center">
                <button
                    type="button"
                    disabled={isSaving}
                    onClick={onDraft}
                    className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-[#141416] text-slate-700 dark:text-white font-bold shadow-sm hover:scale-105 transition-transform active:scale-95 disabled:opacity-50 text-[13px]"
                >
                    {t('adminPartForm:btnDraft', 'Lưu Bản Nháp')}
                </button>
                {isEditMode && (
                    <button
                        type="button"
                        disabled={isSaving}
                        onClick={onDuplicate}
                        className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-500/20 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                    >
                        {t('adminPartForm:btnDuplicate', 'Nhân Bản')}
                    </button>
                )}

                <div className="flex-grow"></div>

                <button
                    type="button"
                    disabled={isSaving}
                    onClick={onApply}
                    className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                >
                    {isSaving ? t('adminPartForm:btnApplying', 'Đang lưu...') : t('adminPartForm:btnApply', 'Lưu')}
                </button>

                <button
                    type="button"
                    disabled={isSaving}
                    onClick={onSubmit}
                    className="px-8 py-2.5 flex items-center justify-center rounded-xl bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                >
                    {isSaving ? t('adminPartForm:btnSaving', 'Đang đăng...') : t('adminPartForm:btnSave', 'Đăng Sản Phẩm')}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/admin/parts')}
                    className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-[#1c1c1e] transition-colors text-[13px]"
                >
                    {t('adminPartForm:btnCancel', 'Trở Về')}
                </button>
            </div>
        </header>
    );
};

export default FormHeader;
