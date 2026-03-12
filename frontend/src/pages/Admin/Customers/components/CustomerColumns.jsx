import { Eye, Edit3, Trash2 } from 'lucide-react';
import i18n from 'i18next'; // Alternatively pass t from parent

export const CustomerColumns = () => {
    const t = i18n.t.bind(i18n);

    return [
        {
            title: t('admin:customers.table.customer'),
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) => (
                <div className="flex items-center gap-3">
                    <img src={customer.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 dark:border-white/10" />
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-800 dark:text-white text-sm">{customer.name}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{customer.email}</span>
                    </div>
                </div>
            )
        },
        {
            title: t('admin:customers.table.phone'),
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => (
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wide">{phone}</span>
            )
        },
        {
            title: t('admin:customers.table.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const getStatusStyle = () => {
                    switch(status) {
                        case 'ACTIVE': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
                        case 'INACTIVE': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
                        case 'BLOCKED': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20';
                        default: return 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-400 border-slate-200 dark:border-white/10';
                    }
                };
                return (
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border ${getStatusStyle()}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            title: t('admin:customers.table.joinDate'),
            dataIndex: 'joinDate',
            key: 'joinDate',
            render: (date) => (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{date}</span>
            )
        },
        {
            title: t('admin:customers.table.actions'),
            key: 'actions',
            render: () => (
                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                    <button className="hover:text-blue-500 dark:hover:text-premium-gold transition-colors" title="View Details">
                        <Eye size={18} />
                    </button>
                    <button className="hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors" title="Edit">
                        <Edit3 size={18} />
                    </button>
                    <button className="hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];
};
