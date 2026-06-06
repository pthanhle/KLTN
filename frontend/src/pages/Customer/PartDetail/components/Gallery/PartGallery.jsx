import { useState, useEffect, useMemo } from 'react';
import { Image } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/utils/cloudinary';

export const PartGallery = ({ images, variantImageUrl, t }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Prepend variant image when a choice with image_url is selected
    const displayImages = useMemo(() => {
        if (!variantImageUrl) return images || [];
        const base = (images || []).filter(img => img !== variantImageUrl);
        return [variantImageUrl, ...base];
    }, [images, variantImageUrl]);

    // Jump to variant image when selection changes
    useEffect(() => {
        if (variantImageUrl) setActiveIndex(0);
    }, [variantImageUrl]);

    if (!displayImages || displayImages.length === 0) {
        return (
            <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-square bg-white dark:bg-[#0a0a0b] rounded-[2rem] flex items-center justify-center border border-slate-200 dark:border-white/5">
                    <span className="text-slate-400 dark:text-slate-500 font-bold">{t('lbl_no_image', 'Không có hình ảnh')}</span>
                </div>
            </div>
        );
    }

    const navigateImage = (direction) => {
        if (direction === 'prev') {
            setActiveIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
        } else {
            setActiveIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
        }
    };

    return (
        <div className="lg:col-span-7 space-y-4">
            {/* Main Image — object-contain so the product is never cropped */}
            <div className="relative aspect-square bg-white dark:bg-[#0d0d0f] rounded-[2rem] overflow-hidden group border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center">
                <Image
                    key={`${activeIndex}-${variantImageUrl}`}
                    src={optimizeCloudinaryUrl(displayImages[activeIndex], { quality: 'auto:best', width: 1200 })}
                    alt="Main Gallery Image"
                    rootClassName="w-full h-full flex items-center justify-center"
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {displayImages.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateImage('prev'); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-800 dark:text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateImage('next'); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-800 dark:text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
                {displayImages.slice(0, 5).map((img, idx) => (
                    <div
                        key={`${idx}-${img}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-square rounded-2xl border-2 overflow-hidden bg-white dark:bg-[#0d0d0f] flex items-center justify-center cursor-pointer transition-all ${activeIndex === idx ? 'border-yellow-500 shadow-md shadow-yellow-500/20' : 'border-transparent hover:border-slate-300 dark:border-white/5 dark:hover:border-white/20'}`}
                    >
                        <Image
                            src={optimizeCloudinaryUrl(img, { quality: 'auto:good', width: 200 })}
                            alt={`Thumb ${idx}`}
                            preview={false}
                            rootClassName={`w-full h-full flex items-center justify-center ${idx === 4 && displayImages.length > 5 ? 'opacity-50' : ''}`}
                            className="max-w-full max-h-full object-contain"
                        />
                        {idx === 4 && displayImages.length > 5 && (
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold pointer-events-none z-10 text-slate-900 dark:text-white bg-black/30 backdrop-blur-sm">
                                +{displayImages.length - 5}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartGallery;
