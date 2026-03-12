import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const NAV_LINKS = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Danh mục Xe', path: '/categories', hasDropdown: true },
    { name: 'Dịch vụ & Đặt lịch', path: '/services' },
    { name: 'Theo dõi tiến độ', path: '/tracking' },
    { name: 'Liên hệ', path: '/contact' },
];

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`text-[13px] font-bold flex items-center gap-1.5 transition-colors relative group py-2 ${
                            isActive 
                            ? 'text-yellow-500 dark:text-yellow-500' 
                            : 'text-slate-800 dark:text-slate-300 hover:text-yellow-500 dark:hover:text-yellow-400'
                        }`}
                    >
                        {link.name}
                        {link.hasDropdown && <ChevronDown size={14} className="mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />}
                        
                        {/* Underline Effect */}
                        {isActive && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 rounded-t-full shadow-[0_-2px_8px_rgba(234,179,8,0.5)]"></span>
                        )}
                        {!isActive && (
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-500 rounded-t-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navigation;
