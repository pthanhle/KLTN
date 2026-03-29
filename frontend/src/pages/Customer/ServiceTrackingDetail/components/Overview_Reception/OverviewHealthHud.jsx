import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gauge } from 'lucide-react';
import { formatOdometer } from '../../utils/trackingDataUtils';

const OverviewHealthHud = ({ healthData }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-white/80 dark:bg-[#191f31]/70 backdrop-blur-xl p-6 rounded-3xl space-y-8 border border-slate-200 dark:border-yellow-500/10 shadow-sm">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-600 dark:text-[#ffd165]">
                {t('title_live_diagnostics', 'Live Diagnostics')}
            </h2>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-[#d3c5ac]">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('label_odometer', 'Odometer')}</span>
                    <Gauge className="w-5 h-5" />
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        {formatOdometer(healthData.odometer)}
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-[#d3c5ac]">KM</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between text-slate-500 dark:text-[#d3c5ac]">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('label_fuel_level', 'Fuel Level')}</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-[#4edea3]">{healthData.fuel_level}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-[#23293c] rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-emerald-500 dark:bg-[#4edea3] rounded-full shadow-[0_0_15px_rgba(78,222,163,0.4)] transition-all duration-1000" 
                        style={{ width: `${healthData.fuel_level}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#d3c5ac]/50">
                    <span>{t('label_empty', 'Empty')}</span>
                    <span>{t('label_full', 'Full')}</span>
                </div>
            </div>
        </div>
    );
};

export default OverviewHealthHud;
