import React from 'react';
import { useTranslation } from 'react-i18next';

const SequenceTips = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="bg-slate-50 dark:bg-[#151b2d] p-6 rounded-3xl border-l-4 border-yellow-500 shadow-sm relative z-10">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-yellow-500 mb-2">
                {t('uploaderTipTitle', 'Mẹo Kỹ Thuật')}
            </h4>
            <p className="text-xs text-slate-500 dark:text-[#d3c5ac] leading-relaxed italic">
                {t('uploaderTipDesc', 'Đảm bảo ánh sáng đồng nhất trên tất cả các khung hình để tránh hiện tượng nhấp nháy khi xoay 360 độ.')}
            </p>
        </div>
    );
};

export default SequenceTips;
