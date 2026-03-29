import { Link } from 'react-router-dom';
import BrandLogo from '@/assets/images/brand/logo.png';
import { Image } from 'antd';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-0.5">
                <Image preview={false} src={BrandLogo} alt="TT AUTO Logo" className="!w-full !h-full object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))] transition-all duration-300" rootClassName="flex items-center justify-center w-full h-full" />
            </div>
            <div className="flex flex-col hidden sm:flex">
                <span className="font-extrabold text-lg leading-none tracking-wide text-slate-900 dark:text-white uppercase transition-colors">
                    TT AUTO
                </span>
                <span className="text-[9px] font-bold text-yellow-500 tracking-widest uppercase mt-0.5">
                    Garage
                </span>
            </div>
        </Link>
    );
};

export default Logo;
