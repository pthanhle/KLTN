import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLoader } from '@/components/ui/page-loader';
import { useCarDetailLogic } from './hooks/useCarDetailLogic';
import { scroller } from 'react-scroll';

import HeroSection from './components/HeroSection';
import StickyNav from './components/StickyNav';
import PriceAndColorSection from './components/PriceAndColorSection';
import FeatureSection from './components/FeatureSection';
import SpecsSection from './components/SpecsSection';
import MediaGallerySection from './components/MediaGallerySection';

const CarDetailPage = () => {
    const { t } = useTranslation(['products', 'layout']);
    const {
        isLoading,
        car,
        colors,
        selectedColor,
        setSelectedColor
    } = useCarDetailLogic();

    useEffect(() => {
        let isScrolling = false;
        let activeIndex = 0;
        let scrollTimeout = null;

        // Collect all snapable sections dynamically
        const sectionIds = ['hero', 'price-color', 'design', 'technology', 'specs', 'gallery'];

        // Helper to forcefully jump to a section
        const jumpToSection = (index) => {
            if (index < 0 || index >= sectionIds.length) return;
            activeIndex = index;
            isScrolling = true;

            if (index === 0) {
                // Hero is special, snap strictly to absolute top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Other sections respect the sticky nav offset (-136)
                scroller.scrollTo(sectionIds[index], {
                    duration: 900,
                    smooth: 'easeInOutQuart',
                    offset: -136
                });
            }

            // Lock scrolling until animation completes
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { isScrolling = false; }, 950);
        };

        const handleWheel = (e) => {
            // Check if user is scrolling inside a table/container that has scrollbar
            const scrollableContainer = e.target.closest('.custom-scrollbar');
            if (scrollableContainer) {
                const { scrollTop, scrollHeight, clientHeight } = scrollableContainer;
                const isAtTop = scrollTop <= 0;
                const isAtBottom = Math.max(0, scrollHeight - (scrollTop + clientHeight)) <= 1;

                // Only intercept to allow native scroll if not at the boundaries
                if (e.deltaY > 0 && !isAtBottom) {
                    return; // allow native scroll down
                }
                if (e.deltaY < 0 && !isAtTop) {
                    return; // allow native scroll up
                }
            }

            e.preventDefault(); // Take 100% control of the wheel
            if (isScrolling) return;

            if (e.deltaY > 0) {
                // Scroll Down -> Next Section
                jumpToSection(activeIndex + 1);
            } else if (e.deltaY < 0) {
                // Scroll Up -> Prev Section
                jumpToSection(activeIndex - 1);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                if (!isScrolling) jumpToSection(activeIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                if (!isScrolling) jumpToSection(activeIndex - 1);
            }
        };

        // Force activeIndex back to 0 when the component mounts specifically
        const handleInitialScroll = () => {
             // Forcing top scroll to prevent browser from returning to middle-of-page state from previous navigation
             window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
             activeIndex = 0;
        };
        handleInitialScroll();

        // Must run in setTimeout to beat browser's native scroll restoration on soft navigations
        setTimeout(() => {
             window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 10);

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(scrollTimeout);
        };
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    if (!car) {
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Không tìm thấy dữ liệu xe.</div>;
    }

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            {/* 1. Hero Animated Banner */}
            <div id="hero" className="w-full">
                <HeroSection car={car} t={t} />
            </div>

            {/* 2. Sticky Scroll Spy Nav */}
            <StickyNav t={t} />

            {/* 3. Price & Color (360 Viewer) */}
            <PriceAndColorSection 
                car={car}
                colors={colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                t={t}
            />

            {/* 4. Features Zig-Zag Layout */}
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

            {/* 5. Specifications Table */}
            <SpecsSection specs={car.specs} t={t} />

            {/* 6. Media Gallery */}
            <MediaGallerySection images={car.gallery} t={t} />

        </div>
    );
};

export default CarDetailPage;
