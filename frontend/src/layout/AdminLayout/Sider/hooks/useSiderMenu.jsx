import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Box,
    Layers,
    Users,
    ShoppingCart,
    Wrench,
    UserCog,
    TicketPercent,
    CarFront,
    TrendingUp,
    Tag,
    Settings,
    Car
} from 'lucide-react';

export const useSiderMenu = (collapsed) => {
    const { t } = useTranslation('layout');
    const navigate = useNavigate();
    const location = useLocation();

    // Responsive icon sizes
    const iconSize = 24; // Cố định kích thước to

    const menuItems = [
        {
            key: '/admin/dashboard',
            icon: <LayoutDashboard size={iconSize} />,
            label: t('admin.sider.dashboard'),
        },
        {
            key: '/admin/cars',
            icon: <Car size={iconSize} />,
            label: t('admin.sider.cars', 'Kho Xe'),
        },
        {
            key: '/admin/categories',
            icon: <Layers size={iconSize} />,
            label: t('admin.sider.categories'),
        },
        {
            key: '/admin/brands',
            icon: <Tag size={iconSize} />,
            label: t('admin.sider.brands', 'Thương Hiệu'),
        },
        {
            key: '/admin/parts',
            icon: <Settings size={iconSize} />,
            label: t('admin.sider.parts', 'Phụ Tùng'),
        },
        {
            key: '/admin/customers',
            icon: <Users size={iconSize} />,
            label: t('admin.sider.customers'),
        },
        {
            key: '/admin/orders',
            icon: <ShoppingCart size={iconSize} />,
            label: t('admin.sider.orders'),
        },
        {
            key: '/admin/service-packages',
            icon: <Wrench size={iconSize} />,
            label: t('admin.sider.service-packages'),
        },
        {
            key: '/admin/staff',
            icon: <UserCog size={iconSize} />,
            label: t('admin.sider.staff'),
        },
        {
            key: '/admin/promotions',
            icon: <TicketPercent size={iconSize} />,
            label: t('admin.sider.promotions'),
        },
        {
            key: '/admin/tradein-vehicles',
            icon: <CarFront size={iconSize} />,
            label: t('admin.sider.tradein-vehicles'),
        },
        {
            key: '/admin/revenue-reports',
            icon: <TrendingUp size={iconSize} />,
            label: t('admin.sider.revenue-reports'),
        },
    ];

    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    return {
        menuItems,
        handleMenuClick,
        selectedKey: location.pathname
    };
};
