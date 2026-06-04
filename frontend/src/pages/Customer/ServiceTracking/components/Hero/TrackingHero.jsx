import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HudStatCard from './HudStatCard';
import trackingApi from '../../../../../services/api/tracking.api';

const TrackingHero = () => {
    const { t } = useTranslation('tracking');
    const [stats, setStats] = useState({
        total_serviced: 1250,
        years_experience: 5,
        service_standard: 'Chính hãng',
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await trackingApi.getStats();
                if (data) {
                    setStats(data);
                }
            } catch (err) {
                console.warn('Could not load tracking stats:', err);
            }
        };
        loadStats();
    }, []);

    const formatNum = (n) => (n === null ? '...' : n.toLocaleString('vi-VN'));

    const statCards = [
        {
            id: 'total_serviced',
            label: t('stat_total_serviced', 'Xe đã phục vụ'),
            value: `${formatNum(stats.total_serviced)}+`,
            unit: null,
        },
        {
            id: 'years_experience',
            label: t('stat_years_experience', 'Năm kinh nghiệm'),
            value: `${stats.years_experience}+`,
            unit: t('stat_unit_years', 'Năm'),
        },
        {
            id: 'service_standard',
            label: t('stat_service_standard', 'Dịch vụ tiêu chuẩn'),
            value: stats.service_standard,
            unit: null,
        },
    ];

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
                {statCards.map((stat) => (
                    <HudStatCard
                        key={stat.id}
                        label={stat.label}
                        value={stat.value}
                        unit={stat.unit}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrackingHero;
