import React from 'react';
import { History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

const TechnicalObservation = ({ conclusion, technician, lastDate }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="mt-16 md:mt-20 bg-slate-100/50 dark:bg-slate-700/60 backdrop-blur-3xl p-6 md:p-10 rounded-xl relative overflow-hidden border border-slate-200 dark:border-transparent">
            {/* Background glowing circle */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 dark:bg-[#ffd165]/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase">
                    {t('label_conclusion', 'Kết Luận Chuyên Môn')}
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-4">
                        <p className="text-slate-600 dark:text-[#d3c5ac] leading-relaxed text-sm lg:text-base">
                            {conclusion}
                        </p>
                        <div className="flex items-center gap-4 text-yellow-600 dark:text-[#ffd165] font-bold">
                            <History className="w-5 h-5" />
                            <span className="text-xs lg:text-sm uppercase tracking-wider">
                                {t('label_last_maintain', 'Lần cuối bảo dưỡng')}: {lastDate}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end items-start lg:items-end mt-4 lg:mt-0">
                        <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] font-bold uppercase tracking-[0.2em] mb-4">
                            {t('label_signature', 'Chữ ký Kỹ Thuật Viên Trưởng')}
                        </p>
                        <div className="w-40 md:w-48 h-12 md:h-16 border-b border-slate-300 dark:border-white/30 mb-2 overflow-hidden flex justify-start lg:justify-end">
                            {technician?.signature && (
                                <Image
                                    src={technician.signature}
                                    alt="Signature"
                                    preview={false}
                                    className="h-full object-contain opacity-70 grayscale dark:invert"
                                />
                            )}
                        </div>
                        <p className="text-slate-900 dark:text-white font-bold">{technician?.name || ''}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalObservation;
