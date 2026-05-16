import React from 'react';
import { useTranslation } from 'react-i18next';
import HistoryItem from './HistoryItem';

const HistoryTab = ({ history }) => {
    const { t } = useTranslation('loyalty');

    if (history.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500">
                {t('loyalty_empty_history')}
            </div>
        );
    }

    return (
        <div className="mt-8 px-4 max-w-3xl mx-auto flex flex-col">
            <div className="relative border-l-2 border-slate-100 dark:border-white/5 ml-4 pl-6 space-y-2 pb-6">
                {history.map((item, index) => (
                    <div key={item._id || index} className="relative">
                        <div className="absolute -left-[35px] top-2">
                        </div>
                        <HistoryItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryTab;
