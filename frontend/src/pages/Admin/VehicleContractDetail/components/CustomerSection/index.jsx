import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoField } from '../UI/InfoField';

export const CustomerSection = ({ snapshot }) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const data = snapshot || {};

    return (
        <div className="bg-white dark:bg-[#141416] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('Thông tin Khách hàng')}</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <InfoField 
                    label={t('Khách hàng')} 
                    value={data.full_name} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Số điện thoại')} 
                    value={data.phone} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('Email')} 
                    value={data.email} 
                    fallback={t('Chưa cập nhật')} 
                />
                <InfoField 
                    label={t('CCCD/CMND')} 
                    value={data.id_number} 
                    fallback={t('Chưa cập nhật')} 
                />
                <div className="col-span-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t('Địa chỉ')}</p>
                    {data.address ? (
                        <address className="font-medium text-slate-800 dark:text-slate-200 not-italic">
                            {data.address}
                        </address>
                    ) : (
                        <p className="text-slate-400 italic font-normal text-sm">{t('Chưa cập nhật')}</p>
                    )}
                </div>
                <InfoField 
                    label={t('Mã số thuế')} 
                    value={data.tax_code} 
                    fallback={t('N/A')} 
                />
                <InfoField 
                    label={t('Tên công ty')} 
                    value={data.company_name} 
                    fallback={t('N/A')} 
                />
            </div>
        </div>
    );
};
