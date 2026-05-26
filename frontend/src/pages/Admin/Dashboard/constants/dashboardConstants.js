import { ShoppingCart, Users, Box, Settings } from 'lucide-react';

export const ORDER_STATUS_MAP = {
    PENDING:    { labelKey: 'status_pending',   color: '#f59e0b' },
    CONFIRMED:  { labelKey: 'status_confirmed', color: '#3b82f6' },
    PROCESSING: { labelKey: 'status_processing',  color: '#8b5cf6' },
    SHIPPED:    { labelKey: 'status_shipped',   color: '#06b6d4' },
    DELIVERED:  { labelKey: 'status_delivered',     color: '#10b981' },
    COMPLETED:  { labelKey: 'status_completed',  color: '#22c55e' },
    CANCELLED:  { labelKey: 'status_cancelled',  color: '#ef4444' },
};

export const QUICK_ACTIONS = [
    { labelKey: 'action_orders', link: '/admin/orders', icon: ShoppingCart, gradient: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
    { labelKey: 'action_customers', link: '/admin/customers', icon: Users, gradient: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
    { labelKey: 'action_services', link: '/admin/services/reception', icon: Box, gradient: 'from-emerald-500 to-emerald-600', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
    { labelKey: 'action_inventory', link: '/admin/parts', icon: Settings, gradient: 'from-amber-500 to-amber-600', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
];
