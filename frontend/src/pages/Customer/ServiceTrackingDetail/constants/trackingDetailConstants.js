import { LayoutDashboard, Microscope, ReceiptText, Wrench, ClipboardCheck, Award, CarFront } from 'lucide-react';

// Status order for access control
export const REPAIR_STATUS_ORDER = [
    'RECEIVED', 'DIAGNOSING', 'QUOTING', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED', 'CANCELLED'
];

export const isTabAccessible = (minStatus, currentStatus) => {
    const minIdx = REPAIR_STATUS_ORDER.indexOf(minStatus);
    const curIdx = REPAIR_STATUS_ORDER.indexOf(currentStatus);
    return curIdx >= minIdx;
};

export const TRACKING_MENU_ITEMS = [
    { id: 'overview',     labelKey: 'menu_overview',     defaultLabel: 'Tổng quan',       icon: LayoutDashboard, minStatus: 'RECEIVED'   },
    { id: 'diagnostics',  labelKey: 'menu_diagnostics',  defaultLabel: 'Chẩn đoán',       icon: Microscope,      minStatus: 'QUOTING'    },
    { id: 'quotations',   labelKey: 'menu_quotations',   defaultLabel: 'Báo giá',         icon: ReceiptText,     minStatus: 'QUOTING'    },
    { id: 'progress',     labelKey: 'menu_progress',     defaultLabel: 'Tiến độ',         icon: Wrench,          minStatus: 'IN_PROGRESS' },
    { id: 'qc',           labelKey: 'menu_qc',           defaultLabel: 'Kiểm định',       icon: ClipboardCheck,  minStatus: 'QC_TESTING' },
    { id: 'delivery',     labelKey: 'menu_delivery',     defaultLabel: 'Bàn giao',        icon: Award,           minStatus: 'COMPLETED'  },
];

export const MOBILE_MENU_ITEMS = [
    { id: 'progress',    labelKey: 'nav_status',       defaultLabel: 'Status',      icon: Wrench,         minStatus: 'IN_PROGRESS' },
    { id: 'qc',          labelKey: 'menu_qc',          defaultLabel: 'Check',       icon: ClipboardCheck, minStatus: 'QC_TESTING'  },
    { id: 'diagnostics', labelKey: 'menu_diagnostics', defaultLabel: 'Diagnostics', icon: Microscope,     minStatus: 'QUOTING'     },
    { id: 'quotations',  labelKey: 'nav_quotes',       defaultLabel: 'Quotes',      icon: ReceiptText,    minStatus: 'QUOTING'     },
    { id: 'delivery',    labelKey: 'menu_delivery',    defaultLabel: 'Delivery',    icon: CarFront,       minStatus: 'COMPLETED'   },
];

export const DIAGNOSTIC_STATUS = {
    NORMAL: 'normal',
    WARNING: 'warning',
    CRITICAL: 'critical'
};
