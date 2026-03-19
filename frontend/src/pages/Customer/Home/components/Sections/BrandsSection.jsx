import { useTranslation } from 'react-i18next';

const BrandsSection = ({ brands }) => {
    const { t } = useTranslation('layout');
    return (
        <section className="py-16 bg-white dark:bg-[#0a0a0b] border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-10">
                <p className="text-center text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-8">
                    {t('customer.home.brands.title')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16 opacity-60 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand, idx) => (
                        <div 
                            key={idx} 
                            className="w-16 h-8 sm:w-20 sm:h-10 bg-slate-300 dark:bg-slate-700 rounded-md flex items-center justify-center text-xs font-bold text-slate-50 dark:text-slate-500 shadow-sm transition-all hover:scale-110 hover:bg-slate-800 dark:hover:bg-slate-200 dark:hover:text-slate-900 cursor-pointer"
                            title={brand}
                        >
                            {/* Dummy box simulating logo */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
