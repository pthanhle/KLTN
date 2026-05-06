import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UnsavedWarning = ({ isDirty, onDiscard }) => {
    const { t } = useTranslation();

    if (!isDirty) return null;

    return (
        <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 px-4 py-3 rounded-lg flex flex-col sm:flex-row sm:items-center items-start gap-4 mb-10 animate-fade-in">
            <div className="flex items-start flex-1">
                <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-500" />
                <div className="flex-1">
                    <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-400">{t('adminStaffDetail:payroll_warning_title')}</h4>
                    <p className="text-sm mt-1 text-yellow-700/80 dark:text-yellow-500/80">{t('adminStaffDetail:payroll_warning_desc')}</p>
                </div>
            </div>
            <button 
                type="button"
                onClick={onDiscard}
                className="w-full sm:w-auto px-4 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold rounded-md transition-colors"
            >
                {t('adminStaffDetail:btn_discard')}
            </button>
        </div>
    );
};
