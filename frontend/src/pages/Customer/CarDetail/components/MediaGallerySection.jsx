import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MediaGallerySection = ({ images, t }) => {
    const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mock dummy data just for the layout
    const galleryItems = activeTab === 'photos' 
        ? images.slice(0, 8) 
        : [images[images.length - 1], images[images.length - 2]];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    };

    const getSafeIndex = (index) => {
        return (index + galleryItems.length) % galleryItems.length;
    };

    // Change tab resets index
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentIndex(0);
    };

    return (
        <section id="gallery" className="h-[calc(100vh-136px)] min-h-[600px] xl:min-h-[700px] w-full flex flex-col justify-center bg-white dark:bg-[#0a0a0b] relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                <div className="flex flex-col items-center mb-6 lg:mb-8 mt-4 lg:mt-0">
                    <h2 className="text-[24px] lg:text-[36px] font-black uppercase text-center text-slate-900 dark:text-white mb-4 transition-colors">
                        {t('products:detail.gallery')}
                    </h2>
                    
                    {/* Custom Tabs */}
                    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-[#141416] rounded-full border border-slate-200 dark:border-white/5 relative transition-colors">
                        <button 
                            onClick={() => handleTabChange('photos')}
                            className={`relative px-6 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all z-10 ${activeTab === 'photos' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
                        >
                            {t('products:detail.photos')}
                        </button>
                        <button 
                            onClick={() => handleTabChange('videos')}
                            className={`relative px-6 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all z-10 ${activeTab === 'videos' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
                        >
                            {t('products:detail.videos')}
                        </button>
                        
                        {/* Tab Indicator background */}
                        <motion.div
                            className="absolute inset-y-1 w-[50%] bg-white dark:bg-[#202022] shadow-sm dark:shadow-none rounded-full z-0 pointer-events-none border border-slate-200 dark:border-white/5 transition-colors"
                            initial={false}
                            animate={{ 
                                left: activeTab === 'photos' ? '6px' : 'calc(50% + 2px)',
                                width: 'calc(50% - 8px)'
                            }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    </div>
                </div>

                {/* Main Slider Area */}
                <div className="relative w-full overflow-hidden flex justify-center items-center py-4">
                    <div className="flex items-center justify-center w-full gap-4 lg:gap-8">
                        
                        {/* Previous Image (Side) */}
                        <div 
                            className="hidden md:block w-[15%] lg:w-[25%] h-[200px] md:h-[30vh] lg:h-[45vh] max-h-[400px] opacity-40 hover:opacity-70 cursor-pointer rounded-r-[32px] lg:rounded-[32px] shrink-0 transition-opacity relative group" 
                            onClick={handlePrev}
                        >
                            <img 
                                src={galleryItems[getSafeIndex(currentIndex - 1)]} 
                                className="w-full h-full object-cover" 
                                alt="Previous view"
                            />
                            {/* Overlay Gradient to fade out edges */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0a0a0b] to-transparent pointer-events-none opacity-80 lg:rounded-[32px] transition-colors"></div>
                            {/* Arrow Button */}
                            <div className="absolute inset-0 flex items-center justify-end lg:justify-center pr-4 lg:pr-0">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-700 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/20 group-hover:bg-white dark:group-hover:bg-black/60 group-hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                                    <ChevronLeft size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Active Image (Center) */}
                        <div className="w-[95%] md:w-[65%] lg:w-[45%] h-[280px] md:h-[40vh] lg:h-[55vh] max-h-[500px] relative shrink-0 rounded-2xl lg:rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-2xl z-10 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141416] transition-colors">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full relative rounded-2xl lg:rounded-[32px] overflow-hidden group"
                                >
                                    <Image
                                        src={galleryItems[currentIndex]}
                                        alt="Active Gallery Image"
                                        wrapperClassName="w-full h-full"
                                        className="!w-full !h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        preview={activeTab === 'videos' ? false : {
                                            mask: <div className="text-slate-900 dark:text-white font-bold text-[10px] tracking-[0.2em] uppercase border border-slate-200 dark:border-white/40 px-6 py-2 rounded-full backdrop-blur-md bg-white/60 dark:bg-black/40 shadow-xl transition-colors">Phóng to</div>
                                        }}
                                    />
                                    {/* Video Mock UI Overlay */}
                                    {activeTab === 'videos' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-20 h-20 rounded-full bg-[#1db954] shadow-[0_0_30px_rgba(29,185,84,0.4)] flex items-center justify-center text-white">
                                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Next Image (Side) */}
                        <div 
                            className="hidden md:block w-[15%] lg:w-[25%] h-[200px] md:h-[30vh] lg:h-[45vh] max-h-[400px] opacity-40 hover:opacity-70 cursor-pointer rounded-l-[32px] lg:rounded-[32px] shrink-0 transition-opacity relative group" 
                            onClick={handleNext}
                        >
                            <img 
                                src={galleryItems[getSafeIndex(currentIndex + 1)]} 
                                className="w-full h-full object-cover" 
                                alt="Next view"
                            />
                            {/* Overlay Gradient to fade out edges */}
                            <div className="absolute inset-0 bg-gradient-to-l from-white dark:from-[#0a0a0b] to-transparent pointer-events-none opacity-80 lg:rounded-[32px] transition-colors"></div>
                            {/* Arrow Button */}
                            <div className="absolute inset-0 flex items-center justify-start lg:justify-center pl-4 lg:pl-0">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-700 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/20 group-hover:bg-white dark:group-hover:bg-black/60 group-hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile arrows (Overlaid on center image) */}
                    <div className="md:hidden absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none">
                        <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-900 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/40 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={handleNext} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-900 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/40 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Thumbnails Row */}
                <div className="mt-4 flex justify-start md:justify-center gap-3 lg:gap-4 px-4 overflow-x-auto custom-scrollbar pb-2 max-w-[1000px] mx-auto w-full">
                    {galleryItems.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-[70px] lg:w-[100px] aspect-[4/3] rounded-xl overflow-hidden shrink-0 transition-all duration-300 bg-slate-100 dark:bg-[#141416] ${currentIndex === idx ? 'border-[2px] lg:border-[3px] border-yellow-500 shadow-[0_4px_20px_rgba(234,179,8,0.3)] scale-110 opacity-100 z-10' : 'border-2 border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                            {activeTab === 'videos' && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                     <div className="w-8 h-8 rounded-full bg-[#1db954] flex items-center justify-center text-white">
                                         <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-white border-b-4 border-b-transparent ml-0.5"></div>
                                     </div>
                                 </div>
                            )}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MediaGallerySection;
