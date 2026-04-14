import React from 'react';
import { useTranslation } from 'react-i18next';
import { MousePointerClick } from 'lucide-react';

const InteractiveOverlay = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="bg-slate-900/40 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 group-hover/canvas:opacity-0 transition-opacity duration-300">
                <MousePointerClick className="w-5 h-5 text-yellow-500" />
                <span className="text-xs uppercase tracking-widest font-bold text-white">
                    {t('previewDragPrompt', 'Kéo Để Xoay 360°')}
                </span>
            </div>
        </div>
    );
};

export default InteractiveOverlay;
