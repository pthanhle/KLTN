export const STAFF_ROLES = {
    SHOP_FOREMAN: 'SHOP_FOREMAN',
    SERVICE_ADVISOR: 'SERVICE_ADVISOR',
    SALES_EXECUTIVE: 'SALES_EXECUTIVE',
    LEAD_TECHNICIAN: 'LEAD_TECHNICIAN',
    TECHNICIAN: 'TECHNICIAN',
    INVENTORY_MGR: 'INVENTORY_MGR',
    CASHIER: 'CASHIER'
};

export const ROLE_STYLES = {
    [STAFF_ROLES.SHOP_FOREMAN]: {
        color: 'purple',
        className: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30'
    },
    [STAFF_ROLES.SERVICE_ADVISOR]: {
        color: 'blue',
        className: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30'
    },
    [STAFF_ROLES.SALES_EXECUTIVE]: {
        color: 'cyan',
        className: 'bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30'
    },
    [STAFF_ROLES.LEAD_TECHNICIAN]: {
        color: 'yellow',
        className: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-[#0c1324] dark:text-[#ffd165] dark:border-[#ffd165]/30'
    },
    [STAFF_ROLES.TECHNICIAN]: {
        color: 'orange',
        className: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30'
    },
    [STAFF_ROLES.INVENTORY_MGR]: {
        color: 'slate',
        className: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-[#070d1f] dark:text-[#dce1fb] dark:border-white/20'
    },
    [STAFF_ROLES.CASHIER]: {
        color: 'emerald',
        className: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
    }
};

export const STAFF_STATUS = {
    ACTIVE: 'ACTIVE',
    ON_LEAVE: 'ON_LEAVE',
    SUSPENDED: 'SUSPENDED'
};

export const KPI_TYPES = {
    FLAT_RATE: 'FLAT_RATE',
    COMMISSION: 'COMMISSION',
    SALARY_ONLY: 'SALARY_ONLY'
};

export const getRoleFilterOptions = (t) => [
    { label: t('adminStaff:filter_all', 'Tất Cả Chức Vụ'), value: 'ALL' },
    { label: t('adminStaff:filter_sales', 'Kinh Doanh'), value: 'SALES' },
    { label: t('adminStaff:filter_techs', 'Kỹ Thuật'), value: 'TECHS' },
    { label: t('adminStaff:filter_inventory', 'Kho & Kế Toán'), value: 'INVENTORY' }
];

export const getStatusFilterOptions = (t) => [
    { label: t('adminStaff:filter_status_all', 'Tất Cả Trạng Thái'), value: 'ALL' },
    { label: t('adminStaff:status_active', 'Đang Làm Việc'), value: 'ACTIVE' },
    { label: t('adminStaff:status_on_leave', 'Nghỉ Phép'), value: 'ON_LEAVE' },
    { label: t('adminStaff:status_suspended', 'Đình Chỉ'), value: 'SUSPENDED' }
];
