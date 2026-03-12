import { Link } from 'react-router-dom';
import { CarFront } from 'lucide-react';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="bg-yellow-500 p-2 rounded-xl text-slate-900 group-hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                <CarFront size={24} />
            </div>
            <div className="flex flex-col">
                <span className="font-extrabold text-lg leading-none tracking-wide text-slate-900 dark:text-white uppercase transition-colors">
                    TT AUTO
                </span>
                <span className="text-[9px] font-bold text-yellow-500 tracking-widest uppercase mt-0.5">
                    Premium Garage
                </span>
            </div>
        </Link>
    );
};

export default Logo;
