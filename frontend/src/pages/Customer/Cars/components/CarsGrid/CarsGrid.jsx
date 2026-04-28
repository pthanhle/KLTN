import CarCard, { CarCardSkeleton } from '../CarCard';

const CarsGrid = ({ isLoading, isFiltering, cars, t }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading || isFiltering ? (
                Array.from({ length: 9 }).map((_, i) => (
                    <CarCardSkeleton key={i} />
                ))
            ) : cars.length > 0 ? (
                cars.map(car => (
                    <CarCard key={car.id || car._id} car={car} t={t} />
                ))
            ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white dark:bg-[#141416] rounded-[32px] border border-dashed border-slate-200 dark:border-white/10">
                    <p className="text-2xl text-slate-700 dark:text-slate-200 font-black tracking-tight mb-3">{t('cars.noCarsFound', 'Không tìm thấy xe phù hợp')}</p>
                    <p className="text-[15px] font-medium text-slate-400 dark:text-slate-500">{t('cars.noCarsDesc', 'Vui lòng điều chỉnh bộ lọc.')}</p>
                </div>
            )}
        </div>
    );
};

export default CarsGrid;
