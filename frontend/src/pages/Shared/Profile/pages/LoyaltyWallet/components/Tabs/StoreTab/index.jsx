import React from 'react';
import { useTranslation } from 'react-i18next';
import VoucherCard from './VoucherCard';

const StoreTab = ({ vouchers, userPoints }) => {
    const { t } = useTranslation('loyalty');

    if (vouchers.length === 0) {
        return (
            <div className="col-span-full text-center py-12 text-slate-500">
                {t('loyalty_empty_store')}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {vouchers.map(voucher => (
                <VoucherCard key={voucher._id} voucher={voucher} userPoints={userPoints} />
            ))}
        </div>
    );
};

export default StoreTab;
