import { Image } from 'antd';

export const ThumbnailRow = ({ galleryItems, currentIndex, setCurrentIndex, activeTab, hasItems }) => {
    if (!hasItems) return null;

    return (
        <div className="mt-4 flex justify-start md:justify-center gap-3 lg:gap-4 px-4 overflow-x-auto custom-scrollbar pb-2 max-w-[1000px] mx-auto w-full">
            {galleryItems.map((img, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-[70px] lg:w-[100px] aspect-[4/3] rounded-xl overflow-hidden shrink-0 transition-all duration-300 bg-slate-100 dark:bg-[#141416] ${currentIndex === idx ? 'border-[2px] lg:border-[3px] border-yellow-500 shadow-[0_4px_20px_rgba(234,179,8,0.3)] scale-110 opacity-100 z-10' : 'border-2 border-transparent opacity-60 hover:opacity-100'}`}
                >
                    <Image src={img.thumbnail} rootClassName="w-full h-full" className="!w-full !h-full object-cover" alt={`Thumbnail ${idx}`} preview={false} />
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
    );
};
