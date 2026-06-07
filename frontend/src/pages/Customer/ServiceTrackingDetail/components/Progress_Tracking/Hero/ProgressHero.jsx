import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { formatDateTimeShort } from '../../../utils/trackingDataUtils';

const ProgressHero = ({ data }) => {
    const { t } = useTranslation('tracking');

    const progressValue = data.overall_progress || 0;
    const isCompleted = progressValue === 100;
    const circleCircumference = 2 * Math.PI * 110;
    const strokeDashoffset = circleCircumference - (progressValue / 100) * circleCircumference;

    return (
        <section className="mb-12" data-purpose="progress-hero-hud">
            <div className="bg-white dark:bg-[#141416] rounded-xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 border border-slate-200 dark:border-white/5 shadow-sm">
                <div className="relative w-64 h-64 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle 
                            className="text-slate-100 dark:text-[#23293c]" 
                            cx="128" cy="128" 
                            fill="transparent" 
                            r="110" 
                            stroke="currentColor" 
                            strokeWidth="12"
                        />
                        <circle 
                            className={`${isCompleted ? 'text-emerald-500 dark:text-[#4edea3] drop-shadow-[0_0_15px_rgba(78,222,163,0.4)]' : 'text-yellow-500 dark:text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]'}`}
                            cx="128" cy="128" 
                            fill="transparent" 
                            r="110" 
                            stroke="currentColor" 
                            strokeDasharray={circleCircumference} 
                            strokeDashoffset={strokeDashoffset} 
                            strokeLinecap="round" 
                            strokeWidth="12"
                            style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 1s ease' }}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className={`text-4xl font-bold tracking-tighter ${isCompleted ? 'text-emerald-500 dark:text-[#4edea3]' : 'text-yellow-600 dark:text-[#d4af37]'}`}>
                            {progressValue}%
                        </span>
                        <span className={`text-[10px] uppercase font-bold mt-1 ${isCompleted ? 'text-emerald-500 dark:text-[#4edea3]' : 'text-slate-500 dark:text-[#a0a0a0]'}`}>
                            {isCompleted ? t('prog_complete_full', 'Tuyệt Hảo') : t('prog_complete', 'Hoàn thành')}
                        </span>
                    </div>
                </div>

                <div className="flex-1 text-center lg:text-left z-10">
                    {isCompleted ? (
                        <>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-2">
                                {t('prog_status_ready', 'Sẵn Sàng Bàn Giao')}
                            </h2>
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-6 leading-tight text-slate-900 dark:text-white uppercase" dangerouslySetInnerHTML={{ __html: t('prog_finale_title_html', 'XE ĐÃ SẴN SÀNG<br/>BÀN GIAO') }} />
                            <p className="text-slate-500 dark:text-[#a0a0a0] mb-8 max-w-md font-medium">
                                {t('prog_finale_desc', 'Tất cả các hạng mục bảo dưỡng đã được kiểm định chất lượng nghiêm ngặt. Vui lòng di chuyển tới Quầy Giao Xe.')}
                            </p>
                            
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                                <button className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold px-10 py-4 rounded-full shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest text-sm">
                                    {t('prog_btn_checkout', 'Ký Mộc & Thanh Toán')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600 dark:text-[#d4af37] mb-2">
                                {t('prog_current_op', 'Công đoạn hiện tại')}
                            </h2>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-white uppercase" dangerouslySetInnerHTML={{ __html: data.current_operation_name.replace(' / ', ' /<br/>') }} />
                            
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                                <div className="bg-slate-50 dark:bg-[#1e1e20] px-6 py-4 rounded-lg flex flex-col border border-slate-100 dark:border-white/5">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-[#a0a0a0] mb-1">
                                        {t('prog_eta', 'Dự kiến hoàn thành')}
                                    </span>
                                    <span className="text-sm font-bold text-emerald-600 dark:text-[#4edea3]">
                                        {formatDateTimeShort(data.estimated_ready_at) || t('prog_eta_unknown', 'Chưa xác định')}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Decorative image */}
                {data.hero_image && (
                    <div className="absolute -right-12 -bottom-12 opacity-10 dark:opacity-[0.15] lg:opacity-100 lg:static lg:w-96 shrink-0 mix-blend-multiply dark:mix-blend-lighten pointer-events-none">
                        <Image
                            src={data.hero_image} 
                            alt="Workshop Hero" 
                            preview={false}
                            className="w-full h-full object-cover"
                            rootClassName="rounded-xl overflow-hidden shadow-2xl grayscale dark:opacity-80 border border-slate-200 dark:border-transparent block"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProgressHero;
