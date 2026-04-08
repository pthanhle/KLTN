import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
    const location = useLocation();
    const { t } = useTranslation('layout');

    const NAV_LINKS = [
        { name: t('customer.header.home'), path: '/' },
        { name: t('customer.header.categories'), path: '/brands' },
        { name: t('customer.header.products'), path: '/cars' },
        { name: t('customer.header.parts'), path: '/parts' },
        { name: t('customer.header.services'), path: '/services' },
        { name: t('customer.header.tracking'), path: '/tracking' },
        { name: t('customer.header.contact'), path: '/contact' },
    ];

    return (
        <nav className="flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => {
                const isActive =
                    location.pathname === link.path ||
                    (link.path !== '/' && location.pathname.startsWith(link.path)) ||
                    (link.path === '/cars' && location.pathname.startsWith('/brand/'));
                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors relative group py-2 h-full ${isActive
                            ? '!text-yellow-500 dark:!text-yellow-500'
                            : '!text-slate-900 dark:!text-white hover:!text-yellow-500 dark:hover:!text-yellow-400'
                            }`}
                    >
                        {link.name}

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
