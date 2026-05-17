import React from 'react';
import { Card, Tag } from 'antd';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { VOUCHER_STATUS } from '../../../constants/loyalty.constants';

const MyVoucherCard = ({ cv }) => {
    const { t } = useTranslation('loyalty');
    const isUnused = cv.status === VOUCHER_STATUS.UNUSED;
    const isUsed = cv.status === VOUCHER_STATUS.USED;

    const getStatusText = () => {
        if (isUnused) return t('loyalty_status_unused');
        if (isUsed) return t('loyalty_status_used');
        return t('loyalty_status_expired');
    };

    return (
        <Card
            className={`border rounded-2xl overflow-hidden transition-all dark:bg-[#1c1c1f] ${
                isUnused ? 'border-yellow-500 shadow-sm' : 'border-slate-200 dark:border-white/10 opacity-70'
            }`}
            bodyStyle={{ padding: 0 }}
        >
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white pr-4">{cv.voucher.title}</h4>
                    <Tag 
                        color={isUnused ? 'success' : isUsed ? 'default' : 'error'} 
                        className="m-0 font-bold border-0"
                    >
                        {getStatusText()}
                    </Tag>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">{cv.voucher.description}</p>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-dashed border-slate-300 dark:border-white/20 flex justify-between items-center">
                    <span className="font-mono font-bold tracking-widest text-lg text-slate-700 dark:text-slate-300">{cv.code}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Clock size={14} />
                    <span>{t('loyalty_hsd')}: {dayjs(cv.expires_at).format('DD/MM/YYYY HH:mm')}</span>
                </div>
            </div>
        </Card>
    );
};

export default MyVoucherCard;
