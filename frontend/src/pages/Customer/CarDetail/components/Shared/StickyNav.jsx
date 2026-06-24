import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const StickyNav = ({ t, car }) => {
    const navItems = [];

    // Always show Price & Color
    navItems.push({ id: 'price-color', label: t('priceColor', 'GIÁ BÁN & MÀU SẮC') });

    // Show Overview if there is a description
    if (car?.description) {
        navItems.push({ id: 'overview', label: t('overview', 'Tổng quan') });
    }

    // Show features dynamically up to 4
    if (car?.features && car.features.length > 0) {
        navItems.push({ id: 'design', label: t('design', 'Thiết Kế') });
    }
    if (car?.features && car.features.length > 1) {
        navItems.push({ id: 'technology', label: t('technology', 'Công nghệ') });
    }
    if (car?.features && car.features.length > 2) {
        navItems.push({ id: 'performance', label: t('performance', 'Hiệu suất') });
    }
    if (car?.features && car.features.length > 3) {
        navItems.push({ id: 'features', label: t('features', 'TÍNH NĂNG') });
    }

    // Show Specs if there are specs
    if (car?.specs && car.specs.length > 0) {
        navItems.push({ id: 'specs', label: t('specs', 'THÔNG SỐ KỸ THUẬT') });
    }

    // Show Gallery if there are photos or videos
    if (car?.gallery && (car.gallery.photos?.length > 0 || car.gallery.videos?.length > 0)) {
        navItems.push({ id: 'gallery', label: t('gallery', 'THƯ VIỆN ẢNH') });
    }

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
