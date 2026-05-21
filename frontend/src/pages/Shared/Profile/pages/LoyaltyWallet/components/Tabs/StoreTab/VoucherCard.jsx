import React from 'react';
import { Button, Tag } from 'antd';
import { Award, Clock, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useVoucherRedeem } from '../../../../../../../../services/queries/loyalty.queries';

const formatDiscount = (discount_type, discount_value) => {
    if (discount_type === 'PERCENT') return `${discount_value}%`;
    if (discount_type === 'FIXED') return `${(discount_value / 1000).toLocaleString()}k`;
    return 'FREE';
};

const discountBg = (discount_type) => {
    if (discount_type === 'PERCENT') return 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    if (discount_type === 'FIXED') return 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400';
    return 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400';
};

const VoucherCard = ({ voucher, userPoints }) => {
    const { t } = useTranslation('loyalty');
    const { mutate: redeemVoucher, isPending: redeeming } = useVoucherRedeem();

    const canRedeem = userPoints >= voucher.points_required;

    const handleRedeem = () => {
        if (!canRedeem) {
            message.warning(t('loyalty_msg_not_enough_points'));
            return;
        }
        redeemVoucher(voucher._id, {
            onSuccess: () => {
                message.success(t('loyalty_msg_redeem_success'));
            },
            onError: (error) => {
                message.error(
                    error?.response?.data?.message ||
                    t('loyalty_msg_redeem_error')
                );
            }
        });
    };

    return (
        <div className={`relative flex flex-col sm:flex-row rounded-2xl border overflow-hidden transition-all duration-200 ${canRedeem ? 'border-slate-200 dark:border-white/10 hover:shadow-lg hover:border-yellow-300 dark:hover:border-yellow-500/40' : 'border-slate-100 dark:border-white/5 opacity-70'} bg-white dark:bg-[#1c1c1f]`}>
            {/* Left — discount badge */}
            <div className={`flex flex-col justify-center items-center px-6 py-5 border-b sm:border-b-0 sm:border-r border-dashed border-slate-200 dark:border-white/10 min-w-[130px] ${discountBg(voucher.discount_type)}`}>
                <span className="text-3xl font-black leading-none">
                    {formatDiscount(voucher.discount_type, voucher.discount_value)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-70">
                    {voucher.discount_type === 'PERCENT' ? 'Giảm %' : voucher.discount_type === 'FIXED' ? 'Giảm tiền' : 'Miễn phí'}
                </span>
            </div>

            {/* Right — info */}
            <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-1">
                        {voucher.title}
                    </h4>
                    {voucher.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            {voucher.description}
                        </p>
                    )}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {voucher.min_order_value > 0 && (
                        <span className="flex items-center gap-1">
                            <ShoppingBag size={12} />
                            Đơn tối thiểu {(voucher.min_order_value / 1000).toLocaleString()}k
                        </span>
                    )}
                    {voucher.validity_days > 0 && (
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Hiệu lực {voucher.validity_days} ngày
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-1">
                    <div className={`flex items-center gap-1.5 font-bold text-sm px-3 py-1.5 rounded-lg ${canRedeem ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                        <Award size={15} />
                        <span>{voucher.points_required?.toLocaleString()} {t('loyalty_pts')}</span>
                    </div>

                    <Button
                        type="primary"
                        disabled={!canRedeem}
                        loading={redeeming}
                        onClick={handleRedeem}
                        className={`rounded-xl font-bold h-9 px-5 border-0 text-sm ${canRedeem ? 'bg-slate-900 hover:bg-slate-700 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-slate-900' : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'}`}
                    >
                        {t('loyalty_btn_redeem')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VoucherCard;
