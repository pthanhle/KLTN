import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const StickyNav = ({ t }) => {
    const navItems = [
        { id: 'price-color', label: t('priceColor', 'GIÁ BÁN & MÀU SẮC') },
        { id: 'overview', label: t('overview', 'Tổng quan') },
        { id: 'features', label: t('features', 'TÍNH NĂNG') },
        { id: 'design', label: t('design', 'Thiết Kế') },
        { id: 'performance', label: t('performance', 'Hiệu suất') },
        { id: 'technology', label: t('technology', 'Công nghệ') },
        { id: 'specs', label: t('specs', 'THÔNG SỐ KỸ THUẬT') },
        { id: 'gallery', label: t('gallery', 'THƯ VIỆN ẢNH') },
    ];

    return (
        <>
            <motion.div
                id="sticky-nav"
                className="sticky top-[72px] h-[64px] flex items-center z-40 bg-white/95 dark:bg-[#0a0a0b]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 hidden lg:flex transition-all duration-300 shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <style>{`
                    .car-nav-link { color: #64748b !important; border-bottom-color: transparent !important; }
                    .car-nav-link:hover { color: #0f172a !important; }
                    html.dark .car-nav-link { color: #94a3b8 !important; }
                    html.dark .car-nav-link:hover { color: #ffffff !important; }
                    
                    .car-nav-link.active-nav { color: #ca8a04 !important; border-bottom-color: #ca8a04 !important; }
                    html.dark .car-nav-link.active-nav { color: #eab308 !important; border-bottom-color: #eab308 !important; }
                `}</style>
                <div className="container mx-auto px-10 max-w-[1440px] flex items-center justify-center">
                    <ul className="flex items-center gap-8 xl:gap-14">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={item.id}
                                    spy={true}
                                    smooth={true}
                                    offset={-136}
                                    duration={600}
                                    className="car-nav-link inline-block py-5 text-[13px] font-bold uppercase tracking-widest cursor-pointer transition-all border-b-2"
                                    activeClass="active-nav"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </>
    );
};

export default StickyNav;
