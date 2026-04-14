import React from 'react';
import { useTranslation } from 'react-i18next';
import { THREE_SIXTY_CONFIG } from '../../constants/threeSixty.constants';

const StatisticsHUD = ({ sequenceCount }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-50 dark:bg-[#070d1f] p-4 rounded-xl border border-slate-100 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                    {t('uploaderStatsFrames', 'Số Khung Hình')}
                </span>
                <span className="text-2xl font-black text-yellow-500">
                    {sequenceCount}/{THREE_SIXTY_CONFIG.MAX_FRAMES_ALLOWED}
                </span>
            </div>
            <div className="bg-slate-50 dark:bg-[#070d1f] p-4 rounded-xl border border-slate-100 dark:border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                    {t('uploaderStatsRes', 'Độ Phân Giải')}
                </span>
                <span className="text-2xl font-black text-yellow-500">
                    {THREE_SIXTY_CONFIG.RESOLUTION_LABEL}
                </span>
            </div>
        </div>
    );
};

export default StatisticsHUD;
