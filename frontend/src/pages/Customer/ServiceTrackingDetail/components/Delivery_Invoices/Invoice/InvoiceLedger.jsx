import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../utils/trackingDataUtils';
import { AlertTriangle } from 'lucide-react';

const InvoiceLedger = ({ data }) => {
    const { t } = useTranslation('tracking');
    const isPaid = data.payment_status === 'PAID';

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-10 relative overflow-hidden shadow-sm border border-slate-200 dark:border-white/5">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        {t('del_invoice_title', 'Hóa Đơn Quyết Toán Cuối')}
                    </h2>
                    <p className="text-xs font-mono text-slate-500 dark:text-[#a0a0a0]">{t('del_trans_id', 'Mã Giao Dịch')}: {data.transaction_id}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0] font-bold">
                        {t('del_grand_total', 'Tổng Thanh Toán')}
                    </p>
                    <p className="text-3xl font-black text-yellow-600 dark:text-[#d4af37] tracking-tighter">
                        {formatCurrency(data.grand_total)} <span className="text-sm font-bold">VNĐ</span>
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Paid Stamp */}
                {isPaid && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] z-20 pointer-events-none opacity-80 select-none">
                        <div className="border-8 border-emerald-500/40 text-emerald-500/60 dark:text-emerald-500/40 text-7xl font-black px-12 py-4 rounded-2xl uppercase tracking-[0.2em] bg-emerald-500/5 backdrop-blur-sm">
                            {t('del_paid', 'ĐÃ THANH TOÁN')}
                        </div>
                    </div>
                )}
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[500px]">
                        <thead>
                            <tr className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-[#a0a0a0] border-b border-slate-200 dark:border-white/10">
                                <th className="py-4">{t('del_tbl_code', 'Mã SP')}</th>
                                <th className="py-4">{t('del_tbl_item', 'Hạng mục')}</th>
                                <th className="py-4 text-center">{t('del_tbl_qty', 'SL')}</th>
                                <th className="py-4 text-right">{t('del_tbl_total', 'Thành Tiền')}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100 dark:divide-white/5">
                            {data.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-6 font-mono text-xs text-slate-500 dark:text-[#a0a0a0]">{item.sku || item.labor_code}</td>
                                    <td className="py-6 font-semibold text-slate-800 dark:text-white">{item.name}</td>
                                    <td className="py-6 text-center font-medium text-slate-600 dark:text-slate-300">{item.quantity}</td>
                                    <td className="py-6 text-right font-bold text-slate-800 dark:text-white">{formatCurrency(item.total_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Calculations Base: Subtotal / VAT / Deposit */}
            <div className="space-y-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">{t('del_sub_total', 'Tổng Trước Thuế')}</span>
                    <span className="text-slate-800 dark:text-white font-medium">{formatCurrency(data.sub_total)} VNĐ</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">{t('del_vat', 'Thuế VAT (10%)')}</span>
                    <span className="text-slate-800 dark:text-white font-medium">{formatCurrency(data.vat_amount)} VNĐ</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-white/5 text-xs">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">{t('del_deposit', 'Đã Tạm Ứng (Deposit)')}</span>
                    <span className="text-red-500 font-bold">-{formatCurrency(data.deposit_paid)} VNĐ</span>
                </div>
            </div>

            {/* Ledger Actions */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-slate-50 dark:bg-[#1e1e20] rounded-full border border-slate-200 dark:border-white/10 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-white">
                                {t('del_balance_due', 'Cần thanh toán thêm')}: {formatCurrency(data.balance_due)} VNĐ
                            </span>
                        </div>
                    </div>
                    <button className="text-yellow-600 dark:text-[#d4af37] text-[10px] font-bold uppercase tracking-widest hover:underline underline-offset-8 transition-all">
                        {t('del_download_receipt', 'Tải Hóa Đơn PDF')}
                    </button>
                </div>
                
                {/* Dispute Button Edge Case */}
                <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/30 transition-all duration-300 group">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('del_dispute', 'Yêu Cầu Trích Lục Hóa Đơn')}</span>
                </button>
            </div>
        </div>
    );
};

export default InvoiceLedger;
