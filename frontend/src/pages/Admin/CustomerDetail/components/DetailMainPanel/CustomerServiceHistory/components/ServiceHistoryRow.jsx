import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../../../../Customers/utils/format';
import { formatVND } from '../../../../../Customers/utils/format';
import { mapServiceHistoryData } from '../utils/historyMapping';

export const ServiceHistoryRow = ({ record, t }) => {
    const isPaid = record.status === 'PAID';
    
    const {
        serviceName,
        carName,
        categoryLabel,
        CategoryIcon,
        categoryColor,
        categoryBg,
        price,
        advisor,
        odometer
    } = mapServiceHistoryData(record, t);

    return (
        <div className="grid grid-cols-12 gap-x-4 px-8 py-5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors items-center group cursor-pointer border-l-2 border-transparent hover:border-yellow-500 dark:hover:border-premium-gold">
            {/* Cột 1: Mã HĐ */}
            <div className="col-span-2 font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-yellow-600 dark:group-hover:text-premium-gold transition-colors">
                {record.invoice_code || record.id}
            </div>
            
            {/* Cột 2: Xe / Dịch Vụ */}
            <div className="col-span-4 pr-4">
                <p className="font-black text-sm text-slate-800 dark:text-white capitalize tracking-tight mb-1 truncate" title={serviceName}>
                    {serviceName}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold truncate flex items-center gap-1.5 flex-wrap" title={carName}>
                    <span>{carName}</span> 
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span> 
                    <span>ODO: {odometer}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span> 
                    <span className="text-yellow-600 dark:text-premium-gold">{advisor}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span> 
                    <span className="text-slate-800 dark:text-white font-black">{formatVND(price)}</span>
                </p>
            </div>
            
            {/* Cột 3: Phân Loại */}
            <div className="col-span-2 flex items-center">
                <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md ${categoryBg} ${categoryColor}`}>
                    <CategoryIcon size={14} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                        {categoryLabel}
                    </span>
                </div>
            </div>
            
            {/* Cột 4: Ngày Thực Hiện */}
            <div className="col-span-2 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center">
                {formatDate(record.date)}
            </div>
            
            {/* Cột 5: Trạng Thái */}
            <div className="col-span-2 flex items-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[9px] font-black tracking-widest uppercase border ${
                    isPaid 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' 
                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'
                }`}>
                    {isPaid && <CheckCircle2 size={12} strokeWidth={3} />}
                    {isPaid ? t('adminCustomers:statusPaid', 'ĐÃ THANH TOÁN') : t('adminCustomers:statusUnpaid', 'CHƯA THANH TOÁN')}
                </span>
            </div>
        </div>
    );
};
