import React from 'react';
import { useTranslation } from 'react-i18next';
import MyVoucherCard from './MyVoucherCard';

const MyVouchersTab = ({ myVouchers }) => {
    const { t } = useTranslation('loyalty');

    if (myVouchers.length === 0) {
        return (
            <div className="col-span-full text-center py-12 text-slate-500">
                {t('loyalty_empty_my_vouchers')}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {myVouchers.map(cv => (
                <MyVoucherCard key={cv._id} cv={cv} />
            ))}
        </div>
    );
};

export default MyVouchersTab;
