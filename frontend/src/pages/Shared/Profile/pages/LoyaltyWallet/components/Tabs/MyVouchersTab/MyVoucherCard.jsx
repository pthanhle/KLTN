import React from 'react';
import { Tag } from 'antd';
import { Clock, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import dayjs from 'dayjs';
import { VOUCHER_STATUS } from '../../../constants/loyalty.constants';

const MyVoucherCard = ({ cv }) => {
    const { t } = useTranslation('loyalty');
    const isUnused = cv.status === VOUCHER_STATUS.UNUSED;
    const isUsed = cv.status === VOUCHER_STATUS.USED;

    // Hỗ trợ cả Promotion mới lẫn Voucher cũ (legacy)
    const info = cv.promotion || cv.voucher || {};

    const getStatusText = () => {
        if (isUnused) return t('loyalty_status_unused');
        if (isUsed) return t('loyalty_status_used');
        return t('loyalty_status_expired');
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(cv.code);
        message.success('Đã sao chép mã voucher!');
    };

    const formatDiscount = () => {
        if (!info.discount_type) return '';
        if (info.discount_type === 'PERCENT') return `Giảm ${info.discount_value}%`;
        if (info.discount_type === 'FIXED') return `Giảm ${(info.discount_value / 1000).toLocaleString()}k`;
        return 'Miễn phí';
    };

    return (
        <div className={`rounded-2xl border overflow-hidden transition-all bg-white dark:bg-[#1c1c1f] ${
            isUnused
                ? 'border-yellow-400 dark:border-yellow-500/50 shadow-sm shadow-yellow-100 dark:shadow-yellow-500/10'
                : 'border-slate-200 dark:border-white/10 opacity-60'
        }`}>
            <div className="p-5 flex flex-col gap-3">
                {/* Header */}
                <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug truncate">
                            {info.title || 'Voucher'}
                        </h4>
                        {info.description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                {info.description}
                            </p>
                        )}
                    </div>
                    <Tag
                        color={isUnused ? 'success' : isUsed ? 'default' : 'error'}
                        className="m-0 font-bold border-0 shrink-0"
                    >
                        {getStatusText()}
                    </Tag>
                </div>

                {/* Discount badge */}
                {info.discount_type && (
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1 rounded-lg w-fit">
                        {formatDiscount()}
                    </div>
                )}

                {/* Code box */}
                <div
                    onClick={isUnused ? handleCopyCode : undefined}
                    className={`flex items-center justify-between bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3 border border-dashed border-slate-300 dark:border-white/20 ${isUnused ? 'cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-500/5 transition-colors' : ''}`}
                >
                    <span className="font-mono font-bold tracking-widest text-base text-slate-700 dark:text-slate-200">
                        {cv.code}
                    </span>
                    {isUnused && <Copy size={15} className="text-slate-400 shrink-0" />}
                </div>

                {/* Expiry */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock size={13} />
                    <span>{t('loyalty_hsd')}: {dayjs(cv.expires_at).format('DD/MM/YYYY')}</span>
                </div>
            </div>
        </div>
    );
};

export default MyVoucherCard;
