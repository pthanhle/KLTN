import { Image } from 'antd';

export const ThumbnailRow = ({ galleryItems, currentIndex, setCurrentIndex, hasItems }) => {
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
                </button>
            ))}
        </div>
    );
};
