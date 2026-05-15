import { Avatar, Popover, Dropdown } from 'antd';
import { MoreHorizontal, Mail, Eye, Edit3, Lock } from 'lucide-react';

const formatVND = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);

const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getAvatarUrl = (path) => {
    if (!path) return null;
    if (typeof path !== 'string') return null;
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL 
        ? import.meta.env.VITE_API_URL.replace('/api', '') 
        : 'http://localhost:5000';
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const getCustomerColumns = (t, onViewDetails, onEditDetails) => [
    {
        title: t('adminCustomers:tableCode', 'MÃ KH'),
        dataIndex: 'customer_code',
        key: 'customer_code',
        fixed: 'left',
        width: 110,
        render: (code) => (
            <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">{code}</span>
        )
    },
    {
        title: t('adminCustomers:tableCustomer', 'Khách Hàng'),
        dataIndex: 'customer',
        key: 'customer',
        fixed: 'left',
        width: 250,
        render: (_, record) => (
            <div className="flex items-center gap-3 py-1 cursor-pointer group" onClick={() => onViewDetails(record)}>
                <Avatar 
                    src={getAvatarUrl(record.avatar)} 
                    alt="Avatar" 
                    size={42}
                    className="border border-slate-200 dark:border-white/10 object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                >
                    {record.full_name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div className="flex flex-col truncate">
                    <span className="font-black text-slate-800 dark:text-white text-[13px] tracking-tight truncate group-hover:text-yellow-600 dark:group-hover:text-premium-gold transition-colors">{record.full_name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate flex items-center gap-1"><Mail size={10} /> {record.email}</span>
                </div>
            </div>
        )
    },
    {
        title: t('adminCustomers:tablePhone', 'SĐT'),
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
        render: (phone) => <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{phone}</span>
    },
    {
        title: t('adminCustomers:tableJoinDate', 'NGÀY TẠO'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (date) => <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{formatDate(date)}</span>
    },
    {
        title: t('adminCustomers:tableTier', 'Hạng'),
        dataIndex: 'tier',
        key: 'tier',
        width: 120,
        render: (tier, record) => {
            const displayTier = (tier || record.loyalty?.tier || 'BRONZE').toLowerCase();
            const getTierStyle = () => {
                switch(displayTier) {
                    case 'platinum': return 'bg-yellow-500/10 text-yellow-600 dark:text-premium-gold border-yellow-500/20 shadow-[0_0_15px_rgba(247,190,29,0.2)]';
                    case 'titanium': return 'bg-slate-800 text-white dark:bg-slate-500/10 dark:text-slate-200 border-slate-700 dark:border-slate-500/20';
                    case 'gold': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
                    case 'silver': return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
                    case 'bronze': return 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20';
                    default: return 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400 border-slate-200 dark:border-white/10';
                }
            };
            return (
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getTierStyle()}`}>
                    {displayTier}
                </span>
            );
        }
    },
    {
        title: t('adminCustomers:tableSpend', 'Tổng chi tiêu'),
        dataIndex: 'total_spent',
        key: 'total_spent',
        align: 'right',
        width: 150,
        render: (spend) => (
            <p className="font-black text-slate-800 dark:text-white text-sm">
                {formatVND(spend).replace('₫', '')} <span className="text-[9px] opacity-60 font-medium">₫</span>
            </p>
        )
    },
    {
        title: t('adminCustomers:tableDebt', 'CÔNG NỢ'),
        dataIndex: 'debt',
        key: 'debt',
        align: 'right',
        width: 130,
        render: (debt) => {
            if (!debt) return <span className="text-slate-400 dark:text-slate-600 font-medium text-sm">-</span>;
            return (
                <p className="font-black text-red-500 text-sm">
                    {formatVND(debt).replace('₫', '')} <span className="text-[9px] opacity-60 font-medium">₫</span>
                </p>
            );
        }
    },
    {
        title: t('adminCustomers:tableGarage', 'Garage'),
        dataIndex: 'garage',
        key: 'garage',
        align: 'center',
        width: 100,
        render: (garage) => {
            if (!garage || garage.length === 0) return <span className="text-slate-400 dark:text-slate-600 font-medium">-</span>;
            const content = (
                <div className="w-56 space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-yellow-500 dark:text-premium-gold mb-2">{t('adminCustomers:tableCarInfo', 'Chi tiết xe')}</p>
                    {garage.map(car => (
                        <div key={car.id} className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/10 last:border-0 last:pb-0">
                            <div>
                                <p className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">{car.brand} {car.model}</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{car.license_plate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
            return (
                <Popover content={content} placement="top" styles={{ body: { borderRadius: '1rem', padding: '16px' } }}>
                    <span className="cursor-help inline-block bg-slate-100 dark:bg-white/10 px-3.5 py-1.5 rounded-lg font-black text-slate-800 dark:text-white text-xs hover:bg-slate-900 hover:text-white dark:hover:bg-premium-gold dark:hover:text-slate-900 transition-all">
                        {garage.length}
                    </span>
                </Popover>
            );
        }
    },
    {
        title: t('adminCustomers:tableLastVisit', 'Lần cuối'),
        dataIndex: 'last_visit',
        key: 'last_visit',
        width: 130,
        render: (visit) => {
            if (!visit) return <span className="text-slate-400 dark:text-slate-600 font-medium">{t('adminCustomers:tableNoData', 'Chưa có')}</span>;
            return (
                <div>
                    <p className={`text-xs font-bold ${visit.is_overdue ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
                        {formatDate(visit.date)}
                    </p>
                    <p className={`text-[9px] uppercase tracking-tighter mt-1 font-bold ${visit.is_overdue ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                        {visit.is_overdue ? t('adminCustomers:tableOverdue', 'Quá hạn') : visit.service_type}
                    </p>
                </div>
            );
        }
    },
    {
        title: t('adminCustomers:tableStatus', 'Trạng Thái'),
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status) => {
            const isSuspended = status === 'suspended';
            const isInactive = status === 'inactive';
            return (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isSuspended ? 'bg-red-500' : isInactive ? 'bg-slate-400' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`}></div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${isSuspended ? 'text-red-500' : isInactive ? 'text-slate-400' : 'text-emerald-500'}`}>
                        {isSuspended ? t('adminCustomers:statusSuspended', 'Bị Khóa') : isInactive ? t('adminCustomers:statusInactive', 'Nháp') : t('adminCustomers:statusActive', 'Đang hoạt động')}
                    </span>
                </div>
            );
        }
    },
    {
        title: '',
        key: 'actions',
        align: 'center',
        fixed: 'right',
        width: 80,
        render: (_, record) => (
            <Dropdown menu={{
                items: [
                    { 
                        key: '1', 
                        label: (
                            <div className="flex items-center gap-3 px-2 py-1.5 min-w-[160px] text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Eye size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold">{t('adminCustomers:actionView', 'Xem hồ sơ 360')}</span>
                            </div>
                        ), 
                        onClick: () => onViewDetails(record) 
                    },
                    { 
                        key: '2', 
                        label: (
                            <div className="flex items-center gap-3 px-2 py-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-premium-gold transition-colors">
                                <Edit3 size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold">{t('adminCustomers:actionEdit', 'Chỉnh sửa nhanh')}</span>
                            </div>
                        ),
                        onClick: () => onEditDetails(record)
                    },
                    { type: 'divider', className: 'dark:border-white/10 my-1' },
                    { 
                        key: '3', 
                        danger: true,
                        label: (
                            <div className="flex items-center gap-3 px-2 py-1.5 text-red-500 hover:text-red-600 transition-colors">
                                <Lock size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold">{t('adminCustomers:actionLock', 'Khóa tài khoản')}</span>
                            </div>
                        )
                    },
                ],
                className: 'custom-dropdown-menu p-1.5 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 dark:bg-[#141416]',
            }} trigger={['click']} placement="bottomRight">
                <div className="w-8 h-8 mx-auto flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer">
                    <MoreHorizontal size={18} />
                </div>
            </Dropdown>
        )
    }
];
