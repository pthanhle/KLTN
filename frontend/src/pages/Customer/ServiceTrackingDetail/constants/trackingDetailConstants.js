import { LayoutDashboard, Microscope, ReceiptText, Wrench, ClipboardCheck, Award, CarFront } from 'lucide-react';

export const TRACKING_MENU_ITEMS = [
    { id: 'overview', labelKey: 'menu_overview', defaultLabel: 'Overview', icon: LayoutDashboard },
    { id: 'diagnostics', labelKey: 'menu_diagnostics', defaultLabel: 'Diagnostics', icon: Microscope },
    { id: 'quotations', labelKey: 'menu_quotations', defaultLabel: 'Quotations', icon: ReceiptText },
    { id: 'progress', labelKey: 'menu_progress', defaultLabel: 'Progress', icon: Wrench },
    { id: 'qc', labelKey: 'menu_qc', defaultLabel: 'Quality Control', icon: ClipboardCheck },
    { id: 'delivery', labelKey: 'menu_delivery', defaultLabel: 'Delivery', icon: Award }
];

export const MOBILE_MENU_ITEMS = [
    { id: 'progress', labelKey: 'nav_status', defaultLabel: 'Status', icon: Wrench },
    { id: 'qc', labelKey: 'menu_qc', defaultLabel: 'Check', icon: ClipboardCheck },
    { id: 'diagnostics', labelKey: 'menu_diagnostics', defaultLabel: 'Diagnostics', icon: Microscope },
    { id: 'quotations', labelKey: 'nav_quotes', defaultLabel: 'Quotes', icon: ReceiptText },
    { id: 'delivery', labelKey: 'menu_delivery', defaultLabel: 'Delivery', icon: CarFront },
];

export const DIAGNOSTIC_STATUS = {
    NORMAL: 'normal',
    WARNING: 'warning',
    CRITICAL: 'critical'
};
