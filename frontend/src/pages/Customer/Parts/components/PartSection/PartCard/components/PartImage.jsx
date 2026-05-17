import { Image } from 'antd';
import { Heart } from 'lucide-react';

const PartImage = ({ part, t, isWishlisted, onToggleWishlist }) => {
    return (
        <div className="relative w-full h-[180px] bg-[#f8fafc] dark:bg-[#0b0f19] rounded-xl flex items-center justify-center p-3 mb-5 overflow-hidden [&_.ant-image]:!w-full [&_.ant-image]:!h-full">
            {part.image ? (
                <Image
                    src={part.image}
                    alt={part.name}
                    preview={{ classNames: { mask: '!hidden' } }}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700"
                />
            ) : (
                <span className="text-slate-300 dark:text-slate-600 text-sm font-medium">{t('no_image', 'No Image')}</span>
            )}

            <button
                onClick={onToggleWishlist}
                className="absolute top-3 right-3 w-8 h-8 z-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#141416]/90 hover:bg-white transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100/50 dark:border-white/10 group/btn"
            >
                <Heart
                    size={14}
                    fill={isWishlisted ? "currentColor" : "none"}
                    className={isWishlisted ? 'text-pink-500' : 'text-slate-400 dark:text-slate-500 group-hover/btn:text-pink-500'}
                />
            </button>

            {part.category && part.category !== 'all' && (
                <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-white/95 dark:bg-[#141416]/90 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100/50 dark:border-white/10">
                    {t(`category_${part.category}`, part.category)}
                </div>
            )}
        </div>
    );
};

export default PartImage;
