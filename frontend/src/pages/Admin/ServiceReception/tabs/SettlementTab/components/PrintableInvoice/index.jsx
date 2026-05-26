import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/settlementUtils';
import { numberToText } from '@/utils/numberToText';

export const PrintableInvoice = ({ activeTerminalData }) => {
    const { t } = useTranslation('adminServiceReception');

    if (!activeTerminalData) return null;

    const { id, customerNameText, customerPhoneText, plateText, vehicleBrandModelText, invoiceItems, financials } = activeTerminalData;
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');
    const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const timestampStr = `${timeStr} - ${dateStr}`;

    return (
        <div className="relative p-8 bg-white text-black font-sans max-w-3xl mx-auto overflow-hidden">
            {/* Paid Stamp Watermark */}
            {activeTerminalData.isPaid && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none opacity-[0.85] select-none print:opacity-100 z-0 mix-blend-multiply">
                    <div className="border-[10px] border-double border-red-600 rounded-3xl px-10 py-6 -rotate-[15deg] flex flex-col items-center justify-center bg-white/50">
                        <span className="text-xl font-bold text-red-600 tracking-[0.4em] uppercase mb-3">
                            {t('print_company_name', 'TT AUTO')}
                        </span>
                        <div className="border-y-4 border-double border-red-600 py-3 mb-3 w-[110%] text-center">
                            <span className="text-6xl font-black text-red-600 tracking-widest uppercase">
                                {t('print_stamp_paid', 'ĐÃ THU TIỀN')}
                            </span>
                        </div>
                        <div className="flex flex-col items-center text-red-600">
                            <span className="text-sm font-bold tracking-[0.2em] uppercase">
                                {dateStr} {timeStr}
                            </span>
                            <span className="text-[11px] font-mono tracking-widest mt-1 opacity-90">
                                REF: {id}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold uppercase mb-1">{t('print_company_name')}</h1>
                <p className="text-sm">{t('print_company_address')}</p>
                <p className="text-sm">{t('print_company_phone')}</p>
            </div>

            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h2 className="text-xl font-bold uppercase mb-2">
                    {activeTerminalData.isPaid
                        ? t('print_invoice_title', 'Hóa Đơn Thanh Toán & Bàn Giao Xe')
                        : t('print_proforma_title', 'Phiếu Tạm Tính')}
                </h2>
                <p className="text-sm font-mono">{t('print_ro_code')} {id}</p>
                <p className="text-sm">{t('print_date')} {timestampStr}</p>
            </div>

            <div className="flex justify-between mb-8 text-sm">
                <div>
                    <p><strong>{t('print_customer')}</strong> {customerNameText}</p>
                    <p><strong>{t('print_phone')}</strong> {customerPhoneText}</p>
                </div>
                <div className="text-right">
                    <p><strong>{t('print_plate')}</strong> {plateText}</p>
                    <p><strong>{t('print_vehicle_type')}</strong> {vehicleBrandModelText}</p>
                </div>
            </div>

            <table className="w-full mb-8 text-sm">
                <thead className="border-b border-black">
                    <tr>
                        <th className="text-left py-2 font-bold">{t('settlement_col_item')}</th>
                        <th className="text-right py-2 font-bold">{t('settlement_col_qty')}</th>
                        <th className="text-right py-2 font-bold">{t('settlement_col_price')}</th>
                        <th className="text-right py-2 font-bold">{t('settlement_col_total')}</th>
                    </tr>
                </thead>
                <tbody className="border-b border-black">
                    {invoiceItems.map(item => (
                        <tr key={item.id}>
                            <td className="py-2">{item.name}</td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">{formatCurrency(item.unit_price)}</td>
                            <td className="text-right py-2">{formatCurrency(item.total_price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mb-12 text-sm">
                <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                        <span>{t('settlement_subtotal')}:</span>
                        <span>{formatCurrency(financials.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{t('settlement_vat')} ({financials.vatRate}%):</span>
                        <span>{formatCurrency(financials.vat)}</span>
                    </div>
                    {financials.deposit > 0 && (
                        <div className="flex justify-between">
                            <span>{t('settlement_deposit_deduction')}:</span>
                            <span>- {formatCurrency(financials.deposit)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-black mt-2">
                        <span>{t('settlement_final_balance')}:</span>
                        <span>{formatCurrency(financials.finalBalance)}</span>
                    </div>
                </div>
            </div>

            <div className="mb-12 p-4 bg-slate-50 border-l-4 border-slate-900 italic">
                <span className="font-bold not-italic">{t('print_amount_in_words', 'Bằng chữ')}: </span>
                <span>{numberToText(financials.finalBalance)}</span>
            </div>

            <div className="flex justify-around text-center pt-16 relative z-10">
                <div>
                    <p className="font-bold mb-20">{t('print_sign_customer')}</p>
                    <p className="italic text-xs text-slate-500">{t('print_sign_note')}</p>
                </div>
                <div>
                    <p className="font-bold mb-20">{t('print_sign_cashier')}</p>
                    <p className="italic text-xs text-slate-500">{t('print_sign_note')}</p>
                </div>
            </div>

            <div className="mt-16 text-center text-xs italic">
                {t('print_thank_you')}
            </div>
        </div>
    );
};
