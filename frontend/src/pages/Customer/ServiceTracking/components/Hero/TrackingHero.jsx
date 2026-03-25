import React from 'react';
import { useTranslation } from 'react-i18next';
import { TRACKING_HERO_STATS } from '../../constants/trackingConstants';
import HudStatCard from './HudStatCard';

const TrackingHero = () => {
    const { t } = useTranslation('tracking');

    return (
        <div className="flex-1 text-center lg:text-left z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-[1.1]">
                {t('tracking_title_1', 'Theo Dõi')} <br className="hidden lg:block" />
                <span className="text-yellow-600 dark:text-yellow-500">{t('tracking_title_2', 'Tiến Độ Dịch Vụ')}</span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t('tracking_subtitle', 'Nhập mã định danh để kiểm tra tình trạng xe của bạn trong thời gian thực. Trải nghiệm sự minh bạch tuyệt đối từ showroom của chúng tôi.')}
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
                {TRACKING_HERO_STATS.map((stat) => (
                    <HudStatCard 
                        key={stat.id}
                        label={t(stat.labelKey, stat.defaultLabel)}
                        value={stat.value}
                        unit={stat.unitKey ? t(stat.unitKey, stat.defaultUnit) : null}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrackingHero;
