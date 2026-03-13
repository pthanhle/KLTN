import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
export const useCustomers = () => {
    const { t } = useTranslation(['admin', 'layout']);

    const breadcrumbItems = [
        { label: t('layout:admin.sider.customers'), href: '/admin/customers' },
        { label: t('admin:customers.breadcrumb') }
    ];

    const [isLoading, setIsLoading] = useState(true);

    // Placeholder data
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                key: '1',
                customer: { name: 'Alex Johnson', email: 'alex.j@example.com', avatar: 'https://i.pravatar.cc/150?u=1' },
                phone: '+84 901 234 567',
                status: 'ACTIVE',
                joinDate: 'Oct 24, 2023'
            },
            {
                key: '2',
                customer: { name: 'Sarah Williams', email: 's.williams@web.com', avatar: 'https://i.pravatar.cc/150?u=2' },
                phone: '+84 905 888 999',
                status: 'INACTIVE',
                joinDate: 'Nov 02, 2023'
            },
            {
                key: '3',
                customer: { name: 'Michael Chen', email: 'm.chen@service.io', avatar: 'https://i.pravatar.cc/150?u=3' },
                phone: '+84 988 555 111',
                status: 'ACTIVE',
                joinDate: 'Jan 15, 2024'
            },
            {
                key: '4',
                customer: { name: 'Linh Nguyễn', email: 'linh.n@gmail.com', avatar: 'https://i.pravatar.cc/150?u=4' },
                phone: '+84 912 345 678',
                status: 'BLOCKED',
                joinDate: 'Feb 10, 2024'
            }
        ]);
        setIsLoading(false);
    }, []);

    return {
        t,
        breadcrumbItems,
        data,
        isLoading
    };
};
