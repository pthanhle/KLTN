import React from 'react';
import { useTranslation } from 'react-i18next';

const parseHotspotCoordinate = (value, fallback = '50%') => {
    if (typeof value === 'number') {
        return `${Math.min(Math.max(value, 0), 1) * 100}%`;
    }

    if (typeof value !== 'string') return fallback;
    if (value.trim().endsWith('%')) {
        const percent = Number(value.replace('%', ''));
        if (!Number.isNaN(percent)) return `${Math.min(Math.max(percent, 0), 100)}%`;
    }

    return value;
};

const OverviewVisualWalkaround = ({ imageUrl, hotspots = [] }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="space-y-8">
            <div className="bg-white/80 dark:bg-[#191f31]/70 backdrop-blur-xl p-6 md:p-10 rounded-3xl flex flex-col items-center shadow-inner border border-slate-200 dark:border-yellow-500/10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-[#d3c5ac] mb-8 md:mb-12 self-start">
                    {t('title_damage_hotspots', 'Damage Hotspots')}
                </h3>

                <div className="relative w-full max-w-[320px]">
                    <svg className="w-full opacity-60 dark:opacity-30 stroke-yellow-600 dark:stroke-[#ffd165] fill-none" strokeWidth="1.5" viewBox="0 0 200 400">
                        <path d="M50 40C50 20 80 10 100 10C120 10 150 20 150 40V360C150 380 120 390 100 390C80 390 50 380 50 360V40Z"></path>
                        <path className="opacity-50" d="M65 80 Q100 70 135 80 L130 160 Q100 150 70 160 Z"></path>
                        <rect height="50" rx="4" width="20" x="35" y="60"></rect>
                        <rect height="50" rx="4" width="20" x="145" y="60"></rect>
                        <rect height="50" rx="4" width="20" x="35" y="290"></rect>
                        <rect height="50" rx="4" width="20" x="145" y="290"></rect>
                        <path className="opacity-50" d="M65 320 Q100 330 135 320 L130 240 Q100 250 70 240 Z"></path>
                    </svg>

                    {hotspots.map((spot, index) => {
                        const top = parseHotspotCoordinate(spot.top);
                        const left = parseHotspotCoordinate(spot.left);

                        return (
                            <div key={spot.id || index} className="absolute z-10" style={{ top, left }}>
                                <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                                    <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-400 dark:bg-[#ffb4ab]/40 animate-pulse" />
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 dark:bg-red-500 shadow-[0_0_15px_rgba(255,180,171,0.8)] items-center justify-center border-2 border-white dark:border-[#0A0A0B]">
                                        <span className="text-white text-[10px] font-black leading-none">{spot.id || index + 1}</span>
                                    </span>
                                </div>
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 max-w-[150px] bg-white/90 dark:bg-[#191f31]/90 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-full shadow-xl">
                                    <span className="block truncate text-[9px] font-bold text-red-600 dark:text-[#ffb4ab] uppercase tracking-wider">
                                        {spot.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="mt-8 md:mt-12 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-[#d3c5ac]/40">
                    {t('label_top_down_ref', 'Top-Down Schematic Reference')}
                </p>
            </div>
        </div>
    );
};

export default OverviewVisualWalkaround;
