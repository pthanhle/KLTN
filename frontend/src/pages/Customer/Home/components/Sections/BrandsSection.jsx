import { useTranslation } from 'react-i18next';
import { Image, Skeleton } from 'antd';

const BrandsSection = ({ brands, onBrandClick, isLoading }) => {
    const { t } = useTranslation('layout');

    // Create array of 5 dummy items for skeleton
    const skeletonKeys = [1, 2, 3, 4, 5];

    return (
        <section className="py-16 bg-white dark:bg-[#0a0a0b] border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-10">
                <p className="text-center text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-8">
                    {t('customer.home.brands.title', 'THƯƠNG HIỆU ĐỐI TÁC')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16 opacity-60 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {isLoading ? (
                        skeletonKeys.map(key => (
                            <div key={key} className="w-20 h-10 sm:w-28 sm:h-14 flex flex-col items-center justify-center">
                                <Skeleton.Image active className="!w-16 !h-8 sm:!w-24 sm:!h-10" />
                            </div>
                        ))
                    ) : (
                        brands?.map((brand, idx) => (
                            <div 
                                key={brand.id || idx} 
                                onClick={() => onBrandClick && onBrandClick(brand.name.toLowerCase())}
                                className="w-20 h-10 sm:w-28 sm:h-14 bg-transparent flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                                title={brand.name}
                            >
                                {brand.image ? (
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        preview={false}
                                        className="max-h-12 object-contain"
                                    />
                                ) : (
                                    <span className="text-xs font-bold text-slate-500">{brand.name}</span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
