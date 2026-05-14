import { useState } from 'react';
import { Image } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PartGallery = ({ images, t }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-square bg-slate-50 dark:bg-[#0a0a0b] rounded-[2rem] flex items-center justify-center border border-slate-200 dark:border-white/5">
                    <span className="text-slate-400 dark:text-slate-500 font-bold">{t('lbl_no_image', 'Không có hình ảnh')}</span>
                </div>
            </div>
        );
    }

    const navigateImage = (direction) => {
        if (direction === 'prev') {
            setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
        } else {
            setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
        }
    };

    return (
        <div className="lg:col-span-7 space-y-4">
            {/* Main Image View */}
            <div className="relative aspect-square bg-slate-50 dark:bg-[#0a0a0b] rounded-[2rem] overflow-hidden group border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center">
                <Image
                    key={activeIndex}
                    src={images[activeIndex]}
                    alt="Main Gallery Image"
                    rootClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {images.length > 1 && (
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
            <div className="grid grid-cols-5 gap-4">
                {images.slice(0, 5).map((img, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-square rounded-2xl border-2 overflow-hidden bg-slate-100 dark:bg-[#0a0a0b] flex items-center justify-center cursor-pointer transition-colors group/thumb ${activeIndex === idx ? 'border-yellow-500' : 'border-transparent hover:border-slate-300 dark:border-white/5 dark:hover:border-white/20'}`}
                    >
                        <Image
                            src={img}
                            alt={`Thumb ${idx}`}
                            preview={false}
                            rootClassName={`w-full h-full ${idx === 4 && images.length > 5 ? 'opacity-50' : ''}`}
                            className="w-full h-full object-cover"
                        />
                        {idx === 4 && images.length > 5 && (
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold pointer-events-none z-10 text-slate-900 dark:text-white">
                                +{images.length - 5}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartGallery;
