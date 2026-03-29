import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { Image } from 'antd';

const QcVehicleVisual = ({ vehicle }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-white dark:bg-[#191f31] rounded-xl overflow-hidden shadow-sm dark:shadow-2xl border border-slate-200 dark:border-transparent">
            <div className="h-48 relative overflow-hidden group">
                <Image 
                    src={vehicle.image} 
                    alt="Vehicle Detail" 
                    preview={false}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#191f31] to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-yellow-500 dark:text-[#ffd165]">
                        {t('label_control_plate', 'Biển kiểm soát')}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-white">{vehicle.plate}</p>
                </div>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-[#d3c5ac]">{t('label_model', 'Model')}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{vehicle.model}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-[#d3c5ac]">{t('label_color', 'Màu sắc')}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{vehicle.color}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-[#4edea3]" />
                        <span className="text-xs font-medium text-slate-800 dark:text-white uppercase tracking-wider">
                            {vehicle.warranty}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QcVehicleVisual;
