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
    TrendingUp,
    Tag,
    Settings,
    Car,
    CalendarCheck,
    FileText
} from 'lucide-react';

export const useSiderMenu = (collapsed) => {
    const { t } = useTranslation('layout');
    const navigate = useNavigate();
    const location = useLocation();

    const iconSize = 24;

    const menuItems = [
        {
            key: '/admin/dashboard',
            icon: <LayoutDashboard size={iconSize} />,
            label: t('admin.sider.dashboard'),
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
            key: '/admin/contracts',
            icon: <FileText size={iconSize} />,
            label: t('admin.sider.contracts', 'Hợp Đồng'),
        },
        {
            key: '/admin/test-drive-bookings',
            icon: <CalendarCheck size={iconSize} />,
            label: t('admin.sider.test-drive-bookings', 'Lái Thử'),
        },
        {
            key: '/admin/services/reception',
            icon: <Box size={iconSize} />,
            label: t('admin.sider.service-reception', 'Lịch Dịch Vụ'),
        },
        {
            key: '/admin/service-packages',
            icon: <Wrench size={iconSize} />,
            label: t('admin.sider.service-packages'),
        },
        {
            key: '/admin/parts',
            icon: <Settings size={iconSize} />,
            label: t('admin.sider.parts', 'Phụ Tùng'),
        },
        {
            key: '/admin/cars',
            icon: <Car size={iconSize} />,
            label: t('admin.sider.cars', 'Kho Xe'),
        },
        {
            key: '/admin/brands',
            icon: <Tag size={iconSize} />,
            label: t('admin.sider.brands', 'Thương Hiệu'),
        },
        {
            key: '/admin/categories',
            icon: <Layers size={iconSize} />,
            label: t('admin.sider.categories'),
        },
        {
            key: '/admin/promotions',
            icon: <TicketPercent size={iconSize} />,
            label: t('admin.sider.promotions'),
        },
        {
            key: '/admin/staff',
            icon: <UserCog size={iconSize} />,
            label: t('admin.sider.staff'),
        },
        {
            key: '/admin/revenue-reports',
            icon: <TrendingUp size={iconSize} />,
            label: t('admin.sider.revenue-reports'),
        }
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
