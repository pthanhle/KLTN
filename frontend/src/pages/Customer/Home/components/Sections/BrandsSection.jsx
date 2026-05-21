import { useTranslation } from 'react-i18next';
import { Image, Skeleton } from 'antd';

const BrandsSection = ({ brands, onBrandClick, isLoading }) => {
    const { t } = useTranslation('layout');

    // Create array of 5 dummy items for skeleton
    const skeletonKeys = [1, 2, 3, 4, 5];

    return (
        <section className="py-20 bg-slate-50/50 dark:bg-[#0a0a0b] border-t border-b border-slate-100 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-10">
                <p className="text-center text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-10">
                    {t('customer.home.brands.title', 'THƯƠNG HIỆU ĐỐI TÁC')}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                    {isLoading ? (
                        skeletonKeys.map(key => (
                            <div key={key} className="w-32 h-16 sm:w-40 sm:h-20 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-4 flex items-center justify-center shadow-sm">
                                <Skeleton.Button active className="!w-24 !h-8" />
                            </div>
                        ))
                    ) : (
                        brands?.map((brand, idx) => (
                            <div
                                key={brand.id || idx}
                                onClick={() => onBrandClick && onBrandClick(brand.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'))}
                                className="w-32 h-16 sm:w-40 sm:h-20 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-yellow-500/5 hover:border-yellow-500/30 dark:hover:border-yellow-500/30 cursor-pointer group relative overflow-hidden"
                                title={brand.name}
                            >
                                {/* Hover background glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/0 to-yellow-500/[0.03] dark:to-yellow-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {brand.image ? (
                                    <div className="w-full h-full flex items-center justify-center filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            preview={false}
                                            className="max-w-full max-h-full object-contain p-1 select-none pointer-events-none"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-yellow-500 transition-colors uppercase tracking-widest text-center">
                                        {brand.name}
                                    </span>
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
