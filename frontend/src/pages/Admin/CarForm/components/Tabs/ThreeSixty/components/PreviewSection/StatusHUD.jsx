import React from 'react';
import { useTranslation } from 'react-i18next';
import { THREE_SIXTY_CONFIG } from '../../constants/threeSixty.constants';

const StatusHUD = ({ hasItems, currentFrameIndex, sequenceCount }) => {
    const { t } = useTranslation('adminCarForm');
    const displayCount = sequenceCount || THREE_SIXTY_CONFIG.MAX_FRAMES_ALLOWED;

    return (
        <div className="absolute bottom-6 left-6 flex gap-4 pointer-events-none z-20">
            <div className="backdrop-blur-xl bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-lg">
                <p className="text-[8px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac]">
                    {t('previewHudFrame', 'Frame Pos')}
                </p>
                <p className="text-xl font-black text-yellow-500">
                    {hasItems ? currentFrameIndex + 1 : 0} / {displayCount}
                </p>
            </div>
            <div className="backdrop-blur-xl bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-lg">
                <p className="text-[8px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac]">
                    {t('previewHudRotation', 'Rotation')}
                </p>
                <p className="text-xl font-black text-yellow-500">
                    {hasItems ? Math.round((currentFrameIndex / sequenceCount) * 360) : 0}°
                </p>
            </div>
        </div>
    );
};

export default StatusHUD;
