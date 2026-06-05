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

const CAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41rvL56LDgqy7Q6rRp-OwmmEOZG4_EigDYMPUCrG1yhJbO406mV-5oRTuJRbVcCnNUHk7qIGWh-eBoCzJg4OZ3gVUWsofrmxhMWwLPqW0klZNWejNMm6wcO72fS87wG5WLw4ODs5JgUTxgoJYy9ZjINalD6rwNGWpOZm_O6k5N99aISoOOC4qYJV8DldamtRrM-TvrHCkkadDIa9cdvmqURXu8ZcFDImprAz0mRvtPebV5przpkHQ4R6Z6Z3uzCQYSSuPdbCo0uV0';

const OverviewVisualWalkaround = ({ imageUrl, hotspots = [] }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="space-y-8">
            <div className="bg-white/80 dark:bg-[#191f31]/70 backdrop-blur-xl p-6 md:p-10 rounded-3xl flex flex-col items-center shadow-inner border border-slate-200 dark:border-yellow-500/10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-[#d3c5ac] mb-8 md:mb-12 self-start">
                    {t('title_damage_hotspots', 'Damage Hotspots')}
                </h3>


                <div className="relative w-full max-w-[360px] mx-auto aspect-[3/4] bg-slate-50 dark:bg-[#111827] rounded-2xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <div className="relative w-full aspect-[9/10] scale-[1.35]">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 flex items-center justify-center pointer-events-none"
                            style={{ width: '111.11%', height: '90%' }}
                        >
                            <img
                                src={CAR_IMAGE}
                                alt="Vehicle Blueprint"
                                className="w-full h-full object-cover opacity-70 mix-blend-multiply dark:mix-blend-screen"
                            />
                        </div>

                        {hotspots.map((spot, index) => {
                            let originalX = 0, originalY = 0;
                            if (typeof spot.x === 'number' && typeof spot.y === 'number') {
                                originalX = spot.x;
                                originalY = spot.y;
                            } else {
                                const parsedLeft = parseHotspotCoordinate(spot.left);
                                const parsedTop = parseHotspotCoordinate(spot.top);
                                originalX = parseFloat(parsedLeft) / 100 || 0;
                                originalY = parseFloat(parsedTop) / 100 || 0;
                            }


                            const rotatedX = 1 - originalY;
                            const rotatedY = originalX;

                            const left = `${Math.min(Math.max(rotatedX, 0), 1) * 100}%`;
                            const top = `${Math.min(Math.max(rotatedY, 0), 1) * 100}%`;

                            return (
                                <div key={spot.id || index} className="absolute z-10" style={{ top, left }}>
                                    <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                                        <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-400 dark:bg-[#ffb4ab]/40 animate-pulse" />
                                        <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 dark:bg-red-500 shadow-[0_0_15px_rgba(255,180,171,0.8)] items-center justify-center border-2 border-white dark:border-[#0A0A0B]">
                                            <span className="text-white text-[10px] font-black leading-none">{index + 1}</span>
                                        </span>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 max-w-[150px] bg-white/90 dark:bg-[#191f31]/90 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-full shadow-xl">
                                        <span className="block truncate text-[9px] font-bold text-red-600 dark:text-[#ffb4ab] uppercase tracking-wider text-center">
                                            {spot.description || spot.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p className="mt-8 md:mt-12 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-[#d3c5ac]/40">
                    {t('label_top_down_ref', 'Top-Down Schematic Reference')}
                </p>
            </div>
        </div>
    );
};

export default OverviewVisualWalkaround;
