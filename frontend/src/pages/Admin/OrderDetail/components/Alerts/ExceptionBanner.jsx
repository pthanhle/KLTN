import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ExceptionBanner = ({ issue }) => {
    const { t } = useTranslation('adminOrderDetail');

    if (!issue) return null;

    return (
        <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl mb-6 shadow-sm">
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-red-800 dark:text-red-400 uppercase tracking-wider mb-1">
                        {t('exception_title')}
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300">
                        {issue}
                    </p>
                </div>
            </div>
        </div>
    );
};
