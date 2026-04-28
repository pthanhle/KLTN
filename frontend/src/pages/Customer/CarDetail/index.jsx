import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';
import { useCarDetailLogic } from './hooks/useCarDetailLogic';
import { useScrollSpy } from './hooks/useScrollSpy';

import HeroSection from './components/ProductInfo/HeroSection';
import StickyNav from './components/Shared/StickyNav';
import PriceAndColorSection from './components/ProductInfo/PriceAndColorSection';
import DescriptionSection from './components/ProductInfo/DescriptionSection';
import FeatureSection from './components/Features/FeatureSection';
import SpecsSection from './components/Features/SpecsSection';
import MediaGallerySection from './components/Gallery/MediaGallerySection';

const CarDetailSkeleton = () => (
    <div className="w-full bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-6 max-w-[1440px]">
            <Skeleton active paragraph={{ rows: 2 }} className="mb-10 max-w-lg" />
            <Skeleton.Image active className="!w-full !h-[400px] lg:!h-[600px] !rounded-[40px] mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton active paragraph={{ rows: 4 }} />
            </div>
        </div>
    </div>
);

const CarDetailPage = () => {
    const { t } = useTranslation(['carDetail']);
    const {
        isLoading,
        car,
        selectedColor,
        setSelectedColor
    } = useCarDetailLogic();

    useScrollSpy();

    if (isLoading) {
        return <CarDetailSkeleton />;
    }

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0b] text-slate-900 dark:text-white text-lg font-bold">
                {t('carNotFound', 'Không tìm thấy dữ liệu xe.')}
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            <div id="hero" className="w-full">
                <HeroSection car={car} t={t} />
            </div>

            <StickyNav t={t} />

            <PriceAndColorSection
                car={car}
                colors={car.colors || []}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                t={t}
            />

            <DescriptionSection description={car.description} />

            {car.features && car.features.length > 0 && (
                <>
                    <FeatureSection
                        id="design"
                        title={car.features[0].title}
                        features={[{ title: '', desc: car.features[0].desc, image: car.features[0].image }]}
                        align="right"
                        subtitle={t('design')}
                    />

                    {car.features[1] && (
                        <FeatureSection
                            id="technology"
                            title={car.features[1].title}
                            features={[{ title: '', desc: car.features[1].desc, image: car.features[1].image }]}
                            align="left"
                            subtitle={t('technology')}
                        />
                    )}
                </>
            )}

            <SpecsSection specs={car.specs} t={t} />

            {car.gallery && <MediaGallerySection gallery={car.gallery} t={t} />}

        </div>
    );
};

export default CarDetailPage;
