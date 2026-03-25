import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Button } from 'antd';

const QcVerification = ({ manager }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-slate-50 dark:bg-[#23293c] p-6 md:p-8 rounded-xl space-y-6 border border-slate-200 dark:border-transparent">
            <div className="flex items-center justify-between">
                <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                    {t('label_manager_verification', 'Xác nhận Quản đốc')}
                </h4>
                <span className="px-2 py-1 bg-emerald-100 dark:bg-[#4edea3]/20 text-emerald-700 dark:text-[#4edea3] text-[10px] font-bold uppercase rounded">
                    {t('status_authorized', 'Authorized')}
                </span>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-lg h-32 flex items-center justify-center relative border border-dashed border-slate-300 dark:border-white/30 group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-30 group-hover:opacity-20 dark:group-hover:opacity-10 pointer-events-none transition-opacity">
                    <span className="font-['Dancing_Script',_cursive] text-4xl text-slate-400 dark:text-[#d3c5ac]">
                        {manager.name}
                    </span>
                </div>
                <Image 
                    src={manager.signature} 
                    alt="Digital Signature" 
                    preview={false}
                    className="max-h-24 mix-blend-multiply dark:mix-blend-screen opacity-90 transition-transform duration-500 group-hover:scale-105" 
                />
            </div>

            <div className="space-y-2">
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase text-center">{manager.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest text-center">{manager.role}</p>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac]/80 leading-tight italic text-center px-4">
                {t('text_verification_pledge', 'Bằng việc ký tên, tôi xác nhận phương tiện đã vượt qua tất cả các bài kiểm tra kỹ thuật và an toàn khắt khe nhất của hệ thống.')}
            </p>

            <div className="mt-8 text-center w-full relative">
                <Button 
                    type="primary" 
                    size="large"
                    className="group relative !w-full !h-[60px] !bg-gradient-to-br from-yellow-400 to-yellow-600 !border-0 !text-[#0a0a0b] font-black !rounded-full !shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:!shadow-[0_15px_40px_rgba(234,179,8,0.5)] active:!scale-[0.98] transition-all duration-300 flex items-center justify-center overflow-hidden hover:!text-[#0a0a0b] hover:-translate-y-0.5"
                >
                    <div className="flex items-center gap-3 z-10 relative">
                        <span className="text-[13px] uppercase tracking-[0.25em] font-black">
                            {t('btn_release_vehicle', 'Xuất xưởng ngay')}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1.5 transition-transform duration-300"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
                </Button>
            </div>
        </div>
    );
};

export default QcVerification;
