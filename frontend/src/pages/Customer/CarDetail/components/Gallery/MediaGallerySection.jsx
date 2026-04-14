import { useMediaGallery } from './hooks/useMediaGallery';
import { GalleryTabs } from './components/GalleryTabs';
import { GallerySlider } from './components/GallerySlider';
import { ThumbnailRow } from './components/ThumbnailRow';

const MediaGallerySection = ({ gallery, t }) => {
    const {
        activeTab,
        currentIndex,
        galleryItems,
        handleNext,
        handlePrev,
        getSafeIndex,
        handleTabChange,
        setCurrentIndex,
        hasItems
    } = useMediaGallery(gallery);

    return (
        <section id="gallery" className="h-[calc(100vh-136px)] min-h-[600px] xl:min-h-[700px] w-full flex flex-col justify-center bg-white dark:bg-[#0a0a0b] relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                <div className="flex flex-col items-center mb-6 lg:mb-8 mt-4 lg:mt-0">
                    <h2 className="text-[24px] lg:text-[36px] font-black uppercase text-center text-slate-900 dark:text-white mb-4 transition-colors">
                        {t('products:detail.gallery')}
                    </h2>

                    <GalleryTabs 
                        activeTab={activeTab} 
                        onTabChange={handleTabChange} 
                        t={t} 
                    />
                </div>

                <GallerySlider 
                    activeTab={activeTab}
                    galleryItems={galleryItems}
                    currentIndex={currentIndex}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    getSafeIndex={getSafeIndex}
                    hasItems={hasItems}
                />

                <ThumbnailRow 
                    galleryItems={galleryItems}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    activeTab={activeTab}
                    hasItems={hasItems}
                />
            </div>
        </section>
    );
};

export default MediaGallerySection;
