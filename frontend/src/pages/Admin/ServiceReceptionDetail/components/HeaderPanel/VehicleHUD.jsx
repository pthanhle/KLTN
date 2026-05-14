import React from 'react';
import { useTranslation } from 'react-i18next';
import { Car } from 'lucide-react';

const VehicleHUD = ({ vehicle_info }) => {
    const { t } = useTranslation('adminRODetail');
    
    const vehicleName = vehicle_info ? `${vehicle_info.brand} ${vehicle_info.model}` : 'Unknown Vehicle';
    const plate = vehicle_info?.license_plate || 'N/A';

    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-lg p-4 md:p-5 border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-4 md:p-5">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#23293c] flex items-center justify-center text-slate-600 dark:text-[#d3c5ac]">
                <Car className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest">{t('hud_vehicle', 'Thông tin xe')}</p>
                <p className="text-base font-bold text-slate-900 dark:text-[#dce1fb] tracking-wide truncate">{vehicleName}</p>
                <p className="text-sm text-slate-500 dark:text-[#d3c5ac] font-mono uppercase">{plate}</p>
            </div>
        </div>
    );
};

export default VehicleHUD;
