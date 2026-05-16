import React from 'react';
import { Card, Button } from 'antd';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useVoucherRedeem } from '../../../../../../../../services/queries/loyalty.queries';

const VoucherCard = ({ voucher, userPoints }) => {
    const { t } = useTranslation('loyalty');
    const { mutate: redeemVoucher, isLoading: redeeming } = useVoucherRedeem();

    const handleRedeem = () => {
        redeemVoucher(voucher._id, {
            onSuccess: () => {
                message.success(t('loyalty_msg_redeem_success', 'Đổi Voucher thành công!'));
            },
            onError: (error) => {
                message.error(error.response?.data?.message || t('loyalty_msg_redeem_error', 'Có lỗi xảy ra khi đổi Voucher'));
            }
        });
    };

    return (
        <Card
            className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-md transition-shadow dark:bg-[#1c1c1f]"
            bodyStyle={{ padding: 0 }}
        >
            <div className="flex flex-col sm:flex-row h-full">
                <div className="bg-slate-50 dark:bg-white/5 p-6 flex flex-col justify-center items-center border-b sm:border-b-0 sm:border-r border-dashed border-slate-300 dark:border-white/20 min-w-[140px]">
                    <span className="text-3xl font-black text-yellow-600 dark:text-yellow-500">
                        {voucher.discount_type === 'PERCENT' ? `${voucher.discount_value}%` :
                            voucher.discount_type === 'FIXED' ? `${(voucher.discount_value / 1000)}k` : 'FREE'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                        {voucher.discount_type}
                    </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{voucher.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{voucher.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1.5 rounded-lg">
                            <Award size={16} />
                            <span>{voucher.points_required} {t('loyalty_pts')}</span>
                        </div>
                        <Button
                            type="primary"
                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold h-10 px-6 border-0"
                            onClick={handleRedeem}
                            loading={redeeming}
                        >
                            {t('loyalty_btn_redeem')}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default VoucherCard;
