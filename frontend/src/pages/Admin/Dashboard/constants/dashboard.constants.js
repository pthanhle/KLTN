import { ShoppingCart, Users, Box, Settings, BarChart3 } from 'lucide-react';

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
    { 
        id: 'orders',
        label: 'action_orders', 
        link: '/admin/orders', 
        icon: ShoppingCart, 
        iconBg: 'bg-blue-100 dark:bg-blue-900/30', 
        iconColor: 'text-blue-600 dark:text-blue-400' 
    },
    { 
        id: 'customers',
        label: 'action_customers', 
        link: '/admin/customers', 
        icon: Users, 
        iconBg: 'bg-purple-100 dark:bg-purple-900/30', 
        iconColor: 'text-purple-600 dark:text-purple-400' 
    },
    { 
        id: 'services',
        label: 'action_services', 
        link: '/admin/services/reception', 
        icon: Box, 
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', 
        iconColor: 'text-emerald-600 dark:text-emerald-400' 
    },
    { 
        id: 'inventory',
        label: 'action_inventory', 
        link: '/admin/parts', 
        icon: Settings, 
        iconBg: 'bg-amber-100 dark:bg-amber-900/30', 
        iconColor: 'text-amber-600 dark:text-amber-400' 
    },
    { 
        id: 'report',
        label: 'action_report', 
        link: '/admin/revenue-report', 
        icon: BarChart3, 
        iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', 
        iconColor: 'text-indigo-600 dark:text-indigo-400' 
    },
];

export const SERVICE_STATUS_CONFIG = {
    PENDING:   { labelKey: 'status_pending',   icon: 'AlertCircle', color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-500/10' },
    CONFIRMED: { labelKey: 'status_confirmed', icon: 'CheckCircle', color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-500/10' },
    ARRIVED:   { labelKey: 'status_arrived',   icon: 'CheckCircle', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    CANCELLED: { labelKey: 'status_cancelled', icon: 'XCircle',     color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-500/10' },
};

export const TEST_DRIVE_STATUS_CONFIG = {
    PENDING:     { labelKey: 'status_pending',     icon: 'AlertCircle', color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-500/10' },
    CONFIRMED:   { labelKey: 'status_confirmed',   icon: 'CheckCircle', color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-500/10' },
    RECEIVED:    { labelKey: 'status_received',    icon: 'CheckCircle', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    IN_PROGRESS: { labelKey: 'status_in_progress', icon: 'Car',         color: 'text-emerald-500',bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    COMPLETED:   { labelKey: 'status_completed',   icon: 'CheckCircle', color: 'text-teal-500',   bg: 'bg-teal-50 dark:bg-teal-500/10' },
    CANCELLED:   { labelKey: 'status_cancelled',   icon: 'XCircle',     color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-500/10' },
};
