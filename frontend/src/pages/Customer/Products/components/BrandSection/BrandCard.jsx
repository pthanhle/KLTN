import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

const BrandCard = ({ brand, t }) => {
    return (
        <Link 
            to={`/brand/${brand.name.toLowerCase()}`}
            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[#141416] border border-slate-100/80 dark:border-white/5 rounded-[32px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 group"
        >
            <div className="w-full h-24 mb-6 relative flex items-center justify-center overflow-hidden mix-blend-multiply dark:mix-blend-normal">
                <Image 
                    src={brand.image} 
                    alt={brand.name} 
                    preview={false}
                    className="w-full h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105"
                />
            </div>
            <h3 className="text-[17px] font-black text-slate-900 dark:text-white mb-2 transition-colors">{brand.name}</h3>
            <p className="text-[13px] font-semibold text-slate-400 dark:text-slate-500">
                {t('availableCars', { count: brand.count })}
            </p>
        </Link>
    );
};

export const BrandCardSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[#141416] border border-slate-100/80 dark:border-white/5 rounded-[32px]">
            <Skeleton className="w-32 h-20 rounded-lg mb-8" />
            <Skeleton className="h-5 w-28 mb-3" />
            <Skeleton className="h-4 w-20" />
        </div>
    );
};

export default BrandCard;
