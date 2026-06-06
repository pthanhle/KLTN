import { useMemo } from 'react';
import { PlayCircle } from 'lucide-react';
import { useMediaGallery } from './hooks/useMediaGallery';
import { GallerySlider } from './components/GallerySlider';
import { ThumbnailRow } from './components/ThumbnailRow';
import { normalizeMediaGallery, getEmbedUrl } from './utils/media.util';

const MediaGallerySection = ({ gallery, t }) => {
    const {
        currentIndex,
        galleryItems,
        handleNext,
        handlePrev,
        getSafeIndex,
        setCurrentIndex,
        hasItems
    } = useMediaGallery(gallery);

    const firstVideo = useMemo(() => {
        const { videos } = normalizeMediaGallery(gallery);
        return videos[0] ?? null;
    }, [gallery]);

    const embedUrl = useMemo(() => getEmbedUrl(firstVideo?.url), [firstVideo]);

    return (
        <>
            {/* Photo Gallery */}
            <section id="gallery" className="min-h-[600px] xl:min-h-[700px] w-full flex flex-col justify-center bg-white dark:bg-[#0a0a0b] relative transition-colors duration-300 py-12">
                <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                    <div className="flex flex-col items-center mb-6 lg:mb-8">
                        <h2 className="text-[24px] lg:text-[36px] font-black uppercase text-center text-slate-900 dark:text-white mb-4 transition-colors">
                            {t('imageGallery', 'THƯ VIỆN ẢNH')}
                        </h2>
                    </div>

                    <GallerySlider
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
                        hasItems={hasItems}
                    />
                </div>
            </section>

            {/* Video Section */}
            {firstVideo && (
                <section className="w-full bg-[#0a0a0b] py-16 lg:py-24 transition-colors duration-300">
                    <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
                        <div className="max-w-5xl mx-auto space-y-10">
                            <div className="text-center">
                                <h2 className="text-[24px] lg:text-[36px] font-black uppercase text-white tracking-tight">
                                    {t('videoGallery', 'Video giới thiệu sản phẩm')}
                                </h2>
                            </div>

                            <div className="w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl relative bg-black border border-white/10">
                                {embedUrl ? (
                                    <iframe
                                        src={embedUrl}
                                        title={firstVideo.title || 'Video'}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full border-0 absolute inset-0"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white/40 space-y-4">
                                        <PlayCircle size={64} strokeWidth={1} />
                                        <p className="font-medium">Video chưa được cung cấp.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default MediaGallerySection;
