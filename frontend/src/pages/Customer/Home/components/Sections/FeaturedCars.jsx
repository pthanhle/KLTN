import CarCard from '../Cards/CarCard';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedCars = ({ cars, isLoading, onCarClick }) => {
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
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <Skeleton className="h-[250px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[200px]" />
                                    <Skeleton className="h-4 w-[150px]" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                    <Skeleton className="h-10 w-full mt-4" />
                                </div>
                            </div>
                        ))
                        : cars.map((car) => (
                            <CarCard key={car.id} car={car} onClick={() => onCarClick(car.id)} />
                        ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedCars;
