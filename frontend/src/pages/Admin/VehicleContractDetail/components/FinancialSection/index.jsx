import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/contractDetail.utils';

export const FinancialSection = ({ snapshot }) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const data = snapshot || {};

    const renderRow = (label, amount, isTotal = false) => (
        <div className={`flex justify-between items-center py-2 ${isTotal ? 'pt-4 border-t border-slate-200 dark:border-white/10' : 'border-b border-slate-100 dark:border-white/5'}`}>
            <span className={isTotal ? 'text-lg font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}>
                {label}
            </span>
            <span className={isTotal ? 'text-xl font-bold text-blue-600' : 'font-medium text-slate-800 dark:text-slate-200'}>
                {formatCurrency(amount)}
            </span>
        </div>
    );

    return (
        <div className="bg-white dark:bg-[#141416] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('Chi tiết thanh toán')}</h3>
            <div className="space-y-3">
                {renderRow(t('Giá niêm yết'), data.list_price)}
                {renderRow(t('Giá bán'), data.sale_price)}
                {renderRow(`${t('Thuế VAT')} (8%)`, data.vat)}
                {renderRow(t('Lệ phí trước bạ'), data.registration_fee)}
                {renderRow(t('Phí bảo hiểm'), data.insurance_fee)}
                {renderRow(t('Phí khác'), data.other_fees)}
                {renderRow(t('Tổng cộng'), data.grand_total, true)}
            </div>
        </div>
    );
};
