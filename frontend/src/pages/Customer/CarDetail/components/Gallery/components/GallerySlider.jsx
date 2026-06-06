import { Image } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySlider = ({
    galleryItems,
    currentIndex,
    handlePrev,
    handleNext,
    getSafeIndex,
    hasItems
}) => {
    if (!hasItems) {
        return (
            <div className="relative w-full h-[280px] md:h-[40vh] lg:h-[55vh] flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-[32px]">
                <span className="text-slate-400 dark:text-slate-500 font-medium">No photos available</span>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden flex justify-center items-center py-4">
            <div className="flex items-center justify-center w-full gap-4 lg:gap-8">
                <div
                    className="hidden md:block w-[15%] lg:w-[25%] h-[200px] md:h-[30vh] lg:h-[45vh] max-h-[400px] opacity-40 hover:opacity-70 cursor-pointer rounded-r-[32px] lg:rounded-[32px] shrink-0 transition-opacity relative group"
                    onClick={handlePrev}
                >
                    <Image
                        src={galleryItems[getSafeIndex(currentIndex - 1)]?.thumbnail}
                        rootClassName="w-full h-full"
                        className="!w-full !h-full object-cover"
                        alt="Previous view"
                        preview={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0a0a0b] to-transparent pointer-events-none opacity-80 lg:rounded-[32px] transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-end lg:justify-center pr-4 lg:pr-0">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-700 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/20 group-hover:bg-white dark:group-hover:bg-black/60 group-hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                            <ChevronLeft size={24} />
                        </div>
                    </div>
                </div>

                <div className="w-[95%] md:w-[65%] lg:w-[45%] h-[280px] md:h-[40vh] lg:h-[55vh] max-h-[500px] relative shrink-0 rounded-2xl lg:rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-2xl z-10 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141416] transition-colors">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full relative rounded-2xl lg:rounded-[32px] overflow-hidden"
                        >
                            <Image
                                src={galleryItems[currentIndex]?.thumbnail}
                                alt="Active Gallery Image"
                                rootClassName="w-full h-full"
                                className="!w-full !h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                                preview={true}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div
                    className="hidden md:block w-[15%] lg:w-[25%] h-[200px] md:h-[30vh] lg:h-[45vh] max-h-[400px] opacity-40 hover:opacity-70 cursor-pointer rounded-l-[32px] lg:rounded-[32px] shrink-0 transition-opacity relative group"
                    onClick={handleNext}
                >
                    <Image
                        src={galleryItems[getSafeIndex(currentIndex + 1)]?.thumbnail}
                        rootClassName="w-full h-full"
                        className="!w-full !h-full object-cover"
                        alt="Next view"
                        preview={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-white dark:from-[#0a0a0b] to-transparent pointer-events-none opacity-80 lg:rounded-[32px] transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-start lg:justify-center pl-4 lg:pl-0">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-700 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/20 group-hover:bg-white dark:group-hover:bg-black/60 group-hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                            <ChevronRight size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none">
                <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-900 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/40 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={handleNext} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/40 flex items-center justify-center text-slate-900 dark:text-white backdrop-blur-md bg-white/50 dark:bg-black/40 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-none">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
