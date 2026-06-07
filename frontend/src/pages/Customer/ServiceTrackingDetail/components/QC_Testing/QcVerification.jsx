import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

const QcVerification = ({ manager }) => {
    const { t } = useTranslation('tracking');

    if (!manager) return null;

    return (
        <div className="bg-slate-50 dark:bg-[#23293c] p-6 md:p-8 rounded-xl space-y-6 border border-slate-200 dark:border-transparent">
            <div className="flex items-center justify-between">
                <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                    {t('label_manager_verification', 'Xác nhận Cố vấn dịch vụ')}
                </h4>
                <span className="px-2 py-1 bg-emerald-100 dark:bg-[#4edea3]/20 text-emerald-700 dark:text-[#4edea3] text-[10px] font-bold uppercase rounded">
                    {t('status_authorized', 'Authorized')}
                </span>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-lg h-32 flex items-center justify-center relative border border-dashed border-slate-300 dark:border-white/30 group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-30 pointer-events-none">
                    <span className="font-['Dancing_Script',_cursive] text-4xl text-slate-400 dark:text-[#d3c5ac]">
                        {manager.name}
                    </span>
                </div>
                {manager.signature ? (
                    <Image
                        src={manager.signature}
                        alt="Digital Signature"
                        preview={false}
                        className="max-h-24 mix-blend-multiply dark:mix-blend-screen opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="relative z-10 text-xs text-slate-400 dark:text-slate-500 italic">
                        {t('label_awaiting_signature', 'Chưa có chữ ký')}
                    </span>
                )}
            </div>

            <div className="space-y-2">
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase text-center">{manager.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest text-center">{manager.role}</p>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac]/80 leading-tight italic text-center px-4">
                {t('text_verification_pledge', 'Bằng việc ký tên, tôi xác nhận phương tiện đã vượt qua tất cả các bài kiểm tra kỹ thuật và an toàn khắt khe nhất của hệ thống.')}
            </p>
        </div>
    );
};

export default QcVerification;
