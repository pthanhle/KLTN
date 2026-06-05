import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

const OverviewVisualWalkaround = ({ imageUrl, hotspots }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="space-y-8">
            {/* 2D Blueprint with Hotspots */}
            <div className="bg-white/80 dark:bg-[#191f31]/70 backdrop-blur-xl p-6 md:p-10 rounded-3xl flex flex-col items-center shadow-inner border border-slate-200 dark:border-yellow-500/10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-[#d3c5ac] mb-8 md:mb-12 self-start">
                    {t('title_damage_hotspots', 'Damage Hotspots')}
                </h3>
                
                <div className="relative w-full max-w-[350px] aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#1f2937] border border-slate-200 dark:border-yellow-500/20">
                    {/* Render Vehicle Image */}
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt="Vehicle Top-Down" 
                            className="absolute inset-0 w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-slate-400">NO IMAGE</span>
                        </div>
                    )}

                    {/* Dark overlay for better visibility of hotspots */}
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none"></div>

                    {/* Render Dynamic Hotspots */}
                    {hotspots.map((spot) => (
                        <div key={spot.id} className="absolute" style={{ top: spot.top, left: spot.left }}>
                            <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                                {/* Pulse Effect */}
                                <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-400 dark:bg-[#ffb4ab]/40 animate-pulse"></span>
                                <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 dark:bg-red-500 shadow-[0_0_15px_rgba(255,180,171,0.8)] flex items-center justify-center border-2 border-white dark:border-[#0A0A0B]">
                                    <span className="text-white text-[10px] font-black leading-none">{spot.id}</span>
                                </span>
                            </div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-[#191f31]/90 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl z-10">
                                <span className="text-[9px] font-bold text-red-600 dark:text-[#ffb4ab] uppercase tracking-wider">
                                    {spot.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <p className="mt-8 md:mt-12 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-[#d3c5ac]/40">
                    {t('label_top_down_ref', 'Top-Down Schematic Reference')}
                </p>
            </div>
        </div>
    );
};

export default OverviewVisualWalkaround;
