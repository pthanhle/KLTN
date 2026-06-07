import React from 'react';
import { formatOdometer } from '../../../utils/trackingDataUtils';

const QuotationEntityInfo = ({ quotation, t }) => (
    <section className="grid sm:grid-cols-2 gap-4 sm:gap-8 mb-10" data-purpose="customer-vehicle-info">
        <div className="bg-slate-50 dark:bg-[#1e1e20] p-5 rounded-lg border border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-bold text-slate-500 dark:text-[#a0a0a0] mb-4 uppercase">{t('quote_info_customer', 'Thông tin khách hàng')}</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_name', 'Khách hàng')}:</span><span className="font-semibold text-slate-800 dark:text-white">{quotation.customer_info?.full_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_phone', 'Điện thoại')}:</span><span className="font-semibold text-slate-800 dark:text-white">{quotation.customer_info?.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_address', 'Địa chỉ')}:</span><span className="text-right font-semibold text-slate-800 dark:text-white">{quotation.customer_info?.address}</span></div>
            </div>
        </div>
        <div className="bg-slate-50 dark:bg-[#1e1e20] p-5 rounded-lg border border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-bold text-slate-500 dark:text-[#a0a0a0] mb-4 uppercase">{t('quote_info_vehicle', 'Thông tin phương tiện')}</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_brand', 'Dòng xe')}:</span><span className="font-semibold text-slate-800 dark:text-white text-right">{quotation.vehicle_info?.brand} {quotation.vehicle_info?.model}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_plate', 'Biển số')}:</span><span className="font-semibold text-slate-800 dark:text-white">{quotation.vehicle_info?.license_plate}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_vin', 'Số khung (VIN)')}:</span><span className="font-semibold text-slate-800 dark:text-white uppercase">{quotation.vehicle_info?.vin_number}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_info_odo', 'Số ODO')}:</span><span className="font-semibold text-slate-800 dark:text-white">{formatOdometer(quotation.vehicle_info?.current_odometer)} KM</span></div>
            </div>
        </div>
    </section>
);

export default QuotationEntityInfo;
