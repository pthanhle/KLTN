import React from 'react';
import { Car } from 'lucide-react';
import { Tooltip, Image } from 'antd';

export const CarCell = ({ booking, t }) => {
    const targetCar = booking.targetCar;
    const carName = targetCar?.name || 'Chưa xác định';
    const carImage = targetCar?.image || null;
    const carSku = targetCar?.sku || '';

    return (
        <div className="flex items-center space-x-3 min-w-0">
            <span className="md:hidden text-xs uppercase tracking-widest text-slate-500 font-bold w-24 flex-shrink-0">
                {t('adminTestDriveBookings:col_car', 'Xe')}:
            </span>

            {carImage ? (
                <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 dark:bg-[#1f1f22] flex-shrink-0 border border-slate-200 dark:border-white/10 relative group">
                    <Image 
                        src={carImage} 
                        alt={carName}
                        preview={true}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        rootClassName="w-full h-full"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        placeholder={
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-white/5 animate-pulse">
                                <Car size={14} className="text-slate-300 dark:text-slate-600" />
                            </div>
                        }
                        fallback="https://placehold.co/100x100/1e1e20/eab308/png?text=No+Car"
                    />
                </div>
            ) : (
                <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 flex-shrink-0 border border-slate-200 dark:border-white/5">
                    <Car size={18} />
                </div>
            )}
            
            <div className="min-w-0 flex-1 flex flex-col justify-center">
                <Tooltip title={carName}>
                    <p className="font-semibold text-[13px] text-slate-800 dark:text-slate-200 truncate leading-tight">
                        {carName}
                    </p>
                </Tooltip>
                {carSku && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-widest mt-0.5 uppercase">
                        {carSku}
                    </p>
                )}
            </div>
        </div>
    );
};
