import { Package, Clock, CheckCircle2, Truck, CheckCheck, Box } from 'lucide-react';

export const getStepperItems = (t) => [
    {
        id: 'created',
        title: t('step_created'),
        icon: Package,
    },
    {
        id: 'pending',
        title: t('step_pending'),
        icon: Clock,
    },
    {
        id: 'confirmed',
        title: t('step_confirmed'),
        icon: CheckCircle2,
    },
    {
        id: 'packed',
        title: t('step_packed', 'Đã Đóng Gói'),
        icon: Box,
    },
    {
        id: 'shipping',
        title: t('step_shipping'),
        icon: Truck,
    },
    {
        id: 'completed',
        title: t('step_completed'),
        icon: CheckCheck,
    }
];
