import React from 'react';
import { Avatar } from 'antd';
import { Users, ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const NewCustomersWidget = ({ customers }) => {
    const { t } = useTranslation('adminDashboard');
    
    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 h-full flex flex-col">
            <header className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('widget_customers_title')}</h3>
                </div>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-2xl">
                    <Users size={20} className="text-amber-500" />
                </div>
            </header>

            <article className="p-4 flex-1 flex flex-col gap-2">
                {customers && customers.length > 0 ? customers.map((customer) => (
                    <Link 
                        key={customer._id} 
                        to={`/admin/customers/${customer._id}`}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                        <Avatar 
                            src={customer.avatar} 
                            size={44}
                            className="bg-amber-100 text-amber-600 font-bold border-2 border-white dark:border-[#141416] shadow-sm flex-shrink-0"
                        >
                            {customer.full_name?.charAt(0) || 'U'}
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                                    {customer.full_name}
                                </p>
                                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                                    {dayjs(customer.createdAt).fromNow()}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5 mt-1">
                                {customer.phone && (
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                                        <Phone size={12} className="text-slate-400" />
                                        {customer.phone}
                                    </p>
                                )}
                                {customer.email && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                                        <Mail size={12} className="text-slate-400" />
                                        {customer.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={18} className="text-amber-500 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                )) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[200px]">
                        <Users size={32} className="opacity-20" />
                        <span className="text-sm">{t('widget_customers_empty')}</span>
                    </div>
                )}
            </article>
            
            <footer className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <Link to="/admin/customers" className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors">
                    {t('widget_customers_view_all')}
                </Link>
            </footer>
        </section>
    );
};
