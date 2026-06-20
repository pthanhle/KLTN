import React from 'react';
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
    Tag,
    Settings,
    Car,
    CalendarCheck,
    FileText,
    BarChart3,
} from 'lucide-react';
import { useAdminPendingCounts } from '../../../../services/queries/adminDashboard.queries';

const BadgeIcon = ({ icon, count, className }) => {
    if (!count) {
        return React.cloneElement(icon, {
            className: [icon.props.className, className].filter(Boolean).join(' ')
        });
    }
    return (
        <span className={`relative inline-flex ${className || ''}`}>
            {icon}
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm z-10">
                {count > 99 ? '99+' : count}
            </span>
        </span>
    );
};

export const useSiderMenu = (collapsed) => {
    const { t } = useTranslation('layout');
    const navigate = useNavigate();
    const location = useLocation();
    const { data: pendingCounts } = useAdminPendingCounts();

    const iconSize = 24;
    const ordersCount = pendingCounts?.pendingOrdersCount || 0;
    const testDrivesCount = pendingCounts?.pendingTestDrivesCount || 0;
    const appointmentsCount = pendingCounts?.pendingAppointmentsCount || 0;

    const menuItems = [
        {
            key: '/admin/dashboard',
            icon: <LayoutDashboard size={iconSize} />,
            label: t('admin.sider.dashboard'),
        },
        {
            key: '/admin/revenue-report',
            icon: <BarChart3 size={iconSize} />,
            label: t('admin.sider.revenue-report', 'Báo Cáo'),
        },
        {
            key: '/admin/customers',
            icon: <Users size={iconSize} />,
            label: t('admin.sider.customers'),
        },
        {
            key: '/admin/orders',
            icon: <BadgeIcon icon={<ShoppingCart size={iconSize} />} count={ordersCount} />,
            label: t('admin.sider.orders'),
        },
        {
            key: '/admin/vehicle-contracts',
            icon: <FileText size={iconSize} />,
            label: t('admin.sider.contracts', 'Hợp Đồng'),
        },
        {
            key: '/admin/test-drive-bookings',
            icon: <BadgeIcon icon={<CalendarCheck size={iconSize} />} count={testDrivesCount} />,
            label: t('admin.sider.test-drive-bookings', 'Lái Thử'),
        },
        {
            key: '/admin/services/reception',
            icon: <BadgeIcon icon={<Box size={iconSize} />} count={appointmentsCount} />,
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
