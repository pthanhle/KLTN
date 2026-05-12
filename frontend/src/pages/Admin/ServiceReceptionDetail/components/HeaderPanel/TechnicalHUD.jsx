import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gauge, Fuel } from 'lucide-react';

const TechnicalHUD = ({ health_hud }) => {
    const { t } = useTranslation('adminRODetail');
    
    const odo = health_hud?.odometer || '0 KM';
    const fuel = health_hud?.fuel_level || 'N/A';

    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-lg p-4 md:p-5 border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-4 md:p-5">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#23293c] flex items-center justify-center text-slate-600 dark:text-[#d3c5ac]">
                <Gauge className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest">{t('hud_odo_fuel', 'Odo & Nhiên liệu')}</p>
                <div className="flex justify-between items-center mt-0.5">
                    <p className="text-base font-bold text-slate-900 dark:text-[#dce1fb] font-mono">{odo}</p>
                    <p className="text-sm text-slate-500 dark:text-[#d3c5ac] font-mono flex items-center gap-1">
                        <Fuel className="w-3 h-3" /> {fuel}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TechnicalHUD;
