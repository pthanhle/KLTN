import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoField } from '../UI/InfoField';

export const VehicleSection = ({ snapshot }) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const data = snapshot || {};

    const colorDisplay = data.color ? (
        <div className="flex items-center gap-2">
            {data.color?.hex_code && (
                <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: data.color.hex_code }}></div>
            )}
            <span>{data.color?.name || data.color}</span>
        </div>
    ) : null;

    return (
        <div className="bg-white dark:bg-[#141416] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('Thông tin Xe')}</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t('Số VIN')}</p>
                    {data.vin ? (
                        <p className="font-mono text-blue-600 font-bold bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded inline-block">
                            {data.vin}
                        </p>
                    ) : (
                        <p className="text-slate-400 italic font-normal text-sm">{t('Chưa cập nhật')}</p>
                    )}
                </div>
                <InfoField 
                    label={t('Số máy')} 
                    value={data.engine_number} 
                    valueClass="font-mono text-slate-600 dark:text-slate-400"
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Mẫu xe')} 
                    value={data.name} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Thương hiệu')} 
                    value={data.brandName} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Màu sắc')} 
                    value={colorDisplay} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Đời xe')} 
                    value={data.year} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Số km')} 
                    value={data.odometer !== undefined ? `${data.odometer} km` : undefined} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Nhiên liệu')} 
                    value={data.fuel} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Số chỗ ngồi')} 
                    value={data.seats} 
                    fallback={t('Chưa cập nhật')} 
                />
            </div>
        </div>
    );
};
