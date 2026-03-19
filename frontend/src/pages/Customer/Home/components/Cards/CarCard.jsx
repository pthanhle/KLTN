import { ArrowRight } from 'lucide-react';
import { Image } from 'antd';

const CarCard = ({ car, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer flex flex-col w-full bg-slate-50 dark:bg-white/5 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-white/5"
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-[#141416]">
                <Image
                    src={car.image}
                    alt={car.name}
                    preview={true}
                    rootClassName="w-full h-full"
                    className="!w-full !h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 group-hover:bg-yellow-500">
                    <ArrowRight size={18} className="text-white dark:text-slate-900" />
                </button>
            </div>
            <div className="p-5 flex flex-col">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors line-clamp-1">{car.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{car.subtitle}</p>
            </div>
        </div>
    );
};

export default CarCard;
