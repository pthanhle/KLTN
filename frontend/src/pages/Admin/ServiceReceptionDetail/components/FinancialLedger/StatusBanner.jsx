import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import { QUOTATION_STATUS_STYLES } from '../../constants/roConstants';

const StatusBanner = ({ status }) => {
    const { t } = useTranslation('adminRODetail');
    
    const normalizedStatus = status?.toUpperCase() || 'DEFAULT';
    const styleKey = QUOTATION_STATUS_STYLES[normalizedStatus] ? normalizedStatus : 'DEFAULT';
    const style = QUOTATION_STATUS_STYLES[styleKey];

    return (
        <div className={`p-6 rounded-xl border flex items-center justify-between relative overflow-hidden group shadow-sm ${style.bg} ${style.border}`}>
            <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${style.glow}`}></div>
            
            <div className="relative z-10">
                <p className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${style.text}`}>
                    {t('panel_ledger_status_title', 'Trạng thái Báo giá')}
                </p>
                <h2 className={`text-2xl md:text-3xl font-bold tracking-tight leading-none uppercase ${style.text}`}>
                    {t(`status_${status}`, status)}
                </h2>
            </div>
            <FileText className={`w-12 h-12 relative z-10 opacity-30 ${style.icon}`} />
        </div>
    );
};

export default StatusBanner;
