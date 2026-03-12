import CarCard from './CarCard';
import { useTranslation } from 'react-i18next';

const FeaturedCars = ({ cars }) => {
    const { t } = useTranslation('layout');
    return (
        <section className="py-20 lg:py-28 bg-white dark:bg-[#0a0a0b] transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-10">
                
                <div className="mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tighter text-slate-900 dark:text-white mb-2 leading-tight">
                        {t('customer.home.featuredCars.title')}
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium italic">
                        {t('customer.home.featuredCars.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedCars;
