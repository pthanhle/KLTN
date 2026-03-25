import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import TrackingHero from './components/Hero/TrackingHero';
import TrackingSearchForm from './components/SearchForm/TrackingSearchForm';
import BackgroundArtwork from './components/Layout/BackgroundArtwork';
import { useTrackingSearchLogic } from './hooks/useTrackingSearchLogic';

const ServiceTrackingPage = () => {
    const hookState = useTrackingSearchLogic();
    const { t } = useTranslation('tracking');

    return (
        <main className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0A0A0B] font-sans selection:bg-yellow-500 selection:text-[#0A0A0B]">
            <Helmet>
                <title>{t('page_title_tracking', 'Tra cứu tiến độ | TT AUTO')}</title>
            </Helmet>

            <BackgroundArtwork />

            {/* Content Shell */}
            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 pt-24 pb-8">
                <TrackingHero />
                <TrackingSearchForm hookState={hookState} />
            </div>
        </main>
    );
};

export default ServiceTrackingPage;
