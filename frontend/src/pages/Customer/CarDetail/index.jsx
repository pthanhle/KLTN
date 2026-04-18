import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLoader } from '@/components/ui/page-loader';
import { useCarDetailLogic } from './hooks/useCarDetailLogic';
import { useScrollSpy } from './hooks/useScrollSpy';

import HeroSection from './components/ProductInfo/HeroSection';
import StickyNav from './components/Shared/StickyNav';
import PriceAndColorSection from './components/ProductInfo/PriceAndColorSection';
import DescriptionSection from './components/ProductInfo/DescriptionSection';
import FeatureSection from './components/Features/FeatureSection';
import SpecsSection from './components/Features/SpecsSection';
import MediaGallerySection from './components/Gallery/MediaGallerySection';

const CarDetailPage = () => {
    const { t } = useTranslation(['products', 'layout']);
    const {
        isLoading,
        car,
        selectedColor,
        setSelectedColor
    } = useCarDetailLogic();

    useScrollSpy();

    if (isLoading) {
        return <PageLoader />;
    }

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0b] text-slate-900 dark:text-white text-lg font-bold">
                {t('products:detail.carNotFound', 'Không tìm thấy dữ liệu xe.')}
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
                        subtitle={t('products:detail.design')}
                    />

                    {car.features[1] && (
                        <FeatureSection
                            id="technology"
                            title={car.features[1].title}
                            features={[{ title: '', desc: car.features[1].desc, image: car.features[1].image }]}
                            align="left"
                            subtitle={t('products:detail.technology')}
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
