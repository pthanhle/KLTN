import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { TRACKING_ASSETS } from '../../constants/trackingConstants';

const BackgroundArtwork = () => {
    const { t } = useTranslation('tracking');

    return (
        <>
            {/* Background Layer (Luxury Car Image + Overlay) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
                <Image 
                    src={TRACKING_ASSETS.BACKGROUND_IMG}
                    alt={t('bg_alt', 'Luxury black sedan service tracking')} 
                    preview={false}
                    rootClassName="w-full h-full"
                    className="w-full h-full object-cover opacity-20 dark:opacity-60 mix-blend-luminosity brightness-75 transition-opacity duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-slate-50/90 to-slate-50 dark:from-[#0A0A0B]/20 dark:via-[#0A0A0B]/60 dark:to-[#0A0A0B]"></div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[4000ms]"></div>
            <div className="absolute bottom-0 right-0 w-[40vw] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        </>
    );
};

export default BackgroundArtwork;
