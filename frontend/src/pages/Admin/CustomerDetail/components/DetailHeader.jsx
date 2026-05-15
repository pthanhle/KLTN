import { Image, Skeleton, Modal } from 'antd';
import { Lock, Unlock, ArrowUpCircle, Plus, Verified } from 'lucide-react';
import { formatDate } from '../../Customers/utils/format';

export const DetailHeader = ({ 
    customer, 
    isLoading, 
    t, 
    onToggleLock, 
    onOpenTierModal, 
    onOpenPointsModal 
}) => {
    if (isLoading || !customer) {
        return (
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-pulse">
                <div className="flex items-center gap-6">
                    <Skeleton.Avatar active size={96} shape="square" className="!rounded-2xl" />
                    <div>
                        <Skeleton.Input active size="small" className="w-24 mb-2 block" />
                        <Skeleton.Input active size="large" className="w-64 block mb-2" />
                        <Skeleton.Input active size="small" className="w-48 block" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <Skeleton.Button active size="large" shape="round" className="w-32" />
                    <Skeleton.Button active size="large" shape="round" className="w-40" />
                    <Skeleton.Button active size="large" shape="round" className="w-48" />
                </div>
            </header>
        );
    }

    const isLocked = customer.status !== 'active';
    const handleLockConfirm = () => {
        Modal.confirm({
            title: !isLocked ? 'Xác nhận khóa tài khoản?' : 'Xác nhận mở khóa tài khoản?',
            content: !isLocked
                ? 'Khách hàng sẽ không thể đăng nhập hoặc đặt dịch vụ sau khi bị khóa.'
                : 'Khách hàng sẽ có thể truy cập lại toàn bộ tính năng của hệ thống.',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            centered: true,
            okButtonProps: {
                danger: !isLocked,
                className: !isLocked ? 'bg-red-500' : 'bg-emerald-500'
            },
            onOk: onToggleLock
        });
    };

    const tier = customer.loyalty?.tier || 'BRONZE';
    const tierConfig = {
        'BRONZE':   { label: 'Bronze',   cls: 'bg-gradient-to-r from-orange-400 to-amber-600 text-white shadow-orange-500/30' },
        'SILVER':   { label: 'Silver',   cls: 'bg-gradient-to-r from-slate-300 to-slate-500 text-white shadow-slate-400/20' },
        'GOLD':     { label: 'Gold',     cls: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-yellow-500/30' },
        'PLATINUM': { label: 'Platinum', cls: 'bg-gradient-to-r from-cyan-300 to-blue-500 text-white shadow-cyan-400/30' },
        'DIAMOND':  { label: 'Diamond',  cls: 'bg-gradient-to-r from-fuchsia-400 to-purple-600 text-white shadow-purple-500/30' },
        'TITANIUM': { label: 'Titanium', cls: 'bg-gradient-to-r from-gray-600 to-gray-900 text-white shadow-gray-700/30' },
    };
    const tierInfo = tierConfig[tier] || tierConfig['BRONZE'];


    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-yellow-500/20 dark:border-premium-gold/20 flex-shrink-0 bg-white dark:bg-[#141416]">
                        <Image 
                            src={customer.avatar} 
                            alt={customer.full_name} 
                            width="100%" 
                            height="100%" 
                            rootClassName="rounded-2xl overflow-hidden"
                            className="object-cover rounded-2xl" 
                            fallback="https://via.placeholder.com/150"
                        />
                    </div>
                    {customer.status === 'active' && (
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-[3px] border-slate-50 dark:border-[#0a0a0b] shadow-lg flex items-center justify-center">
                            <Verified size={12} className="text-white" />
                        </div>
                    )}
                </div>
                
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
                            {customer.full_name}
                        </h1>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg ${tierInfo.cls}`}>
                            {tierInfo.label}
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold tracking-widest uppercase mt-2">
                        {t('adminCustomers:statusLabel', 'TRẠNG THÁI')}: <span className={customer.status === 'active' ? 'text-emerald-500' : 'text-red-500'}>{customer.status}</span> 
                        <span className="mx-2">•</span> 
                        ID: <span className="text-yellow-600 dark:text-premium-gold">{customer.customer_code}</span>
                        <span className="mx-2">•</span> 
                        {t('adminCustomers:joinedLabel', 'THAM GIA')}: {formatDate(customer.createdAt)}
                    </p>
                </div>
            </div>
            
            <div className="flex gap-3 flex-wrap">
                <button
                    type="button"
                    onClick={handleLockConfirm}
                    className={`group flex items-center gap-2 px-5 py-3 rounded-full border transition-all outline-none active:scale-95 text-[10px] font-black tracking-widest uppercase
                        ${!isLocked
                            ? 'border-slate-200 dark:border-white/10 hover:border-red-200 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400'
                            : 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20'}`}
                >
                    {!isLocked ? <Lock size={14} className="group-hover:animate-pulse" /> : <Unlock size={14} />}
                    {!isLocked ? t('adminCustomers:btnLockAccount', 'Khóa tài khoản') : t('adminCustomers:btnUnlockAccount', 'Mở khóa tài khoản')}
                </button>
                <button 
                    type="button"
                    onClick={onOpenTierModal}
                    className="group flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-white text-[10px] font-black tracking-widest uppercase text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-white/10 transition-all outline-none active:scale-95"
                >
                    <ArrowUpCircle size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                    {t('adminCustomers:btnUpgradeVip', 'Nâng hạng VIP')}
                </button>
                <button 
                    type="button"
                    onClick={onOpenPointsModal}
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-[10px] font-black tracking-widest uppercase text-slate-900 shadow-xl shadow-yellow-500/20 transition-all outline-none active:scale-95"
                >
                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
                    {t('adminCustomers:btnAddPoints', 'Tặng điểm')}
                </button>
            </div>
        </header>
    );
};
