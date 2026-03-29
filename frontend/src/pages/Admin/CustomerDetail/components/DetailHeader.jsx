import { Image, Skeleton } from 'antd';
import { Lock, ArrowUpCircle, Plus, Verified } from 'lucide-react';
import { formatDate } from '../../Customers/utils/format';

export const DetailHeader = ({ customer, isLoading, t }) => {
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
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg
                            ${customer.tier === 'platinum' ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-yellow-500/30' : 
                              customer.tier === 'gold' ? 'bg-amber-500 text-white shadow-amber-500/20' : 
                              customer.tier === 'silver' ? 'bg-slate-400 text-white shadow-slate-400/20' : 
                              'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                            VIP {customer.tier}
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
                    className="group flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 dark:border-white/10 hover:border-red-200 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all outline-none active:scale-95"
                >
                    <Lock size={14} className="group-hover:animate-pulse" />
                    {t('adminCustomers:btnLockAccount', 'Khóa tài khoản')}
                </button>
                <button 
                    type="button"
                    className="group flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-white text-[10px] font-black tracking-widest uppercase text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-white/10 transition-all outline-none active:scale-95"
                >
                    <ArrowUpCircle size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                    {t('adminCustomers:btnUpgradeVip', 'Nâng hạng VIP')}
                </button>
                <button 
                    type="button"
                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-[10px] font-black tracking-widest uppercase text-slate-900 shadow-xl shadow-yellow-500/20 transition-all outline-none active:scale-95"
                >
                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
                    {t('adminCustomers:btnAddPoints', 'Tặng điểm')}
                </button>
            </div>
        </header>
    );
};
