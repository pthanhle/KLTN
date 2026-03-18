export const QuotationInfoGrid = ({ quotation, t }) => (
    <section className="grid sm:grid-cols-2 gap-4 sm:gap-8 mb-10" data-purpose="customer-vehicle-info">
        <div className="bg-slate-50 dark:bg-slate-700/30 p-5 rounded-lg border border-slate-100 dark:border-slate-600">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-4 tracking-[0.2em]">{t('quote_info_customer', 'Thông tin khách hàng')}</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_name', 'Khách hàng')}:</span><span className="font-semibold text-slate-800 dark:text-slate-200">{quotation.customer.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_phone', 'Điện thoại')}:</span><span className="font-semibold text-slate-800 dark:text-slate-200">{quotation.customer.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_address', 'Địa chỉ')}:</span><span className="text-right text-slate-600 dark:text-slate-300">{quotation.customer.address}</span></div>
            </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/30 p-5 rounded-lg border border-slate-100 dark:border-slate-600">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-4 tracking-[0.2em]">{t('quote_info_vehicle', 'Thông tin phương tiện')}</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_brand', 'Dòng xe')}:</span><span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{quotation.vehicle.brand} {quotation.vehicle.model}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_plate', 'Biển số')}:</span><span className="font-semibold text-slate-800 dark:text-slate-200">{quotation.vehicle.license_plate}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_vin', 'Số khung (VIN)')}:</span><span className="font-mono text-xs text-slate-600 dark:text-slate-400">{quotation.vehicle.vin}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t('quote_info_odo', 'Số ODO')}:</span><span className="font-semibold text-slate-800 dark:text-slate-200">{quotation.vehicle.odo} KM</span></div>
            </div>
        </div>
    </section>
);

export default QuotationInfoGrid;
