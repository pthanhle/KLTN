import React from 'react';
import { CalendarDays, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

export const GreetingBanner = ({ stats, greetingKey }) => {
    const { t } = useTranslation('adminDashboard');
    const user = useSelector((state) => state.auth.user);

    const pendingAppointments = (stats.pendingAppointmentsCount || 0) + (stats.pendingTestDrivesCount || 0);
    const pendingOrders = stats.pendingOrdersCount || 0;

    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <article className="flex-1">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3 text-sm">
                        <CalendarDays size={16} />
                        <span className="capitalize font-medium">{dayjs().format('dddd, DD MMMM YYYY')}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                        {t(greetingKey)}, {user?.full_name || 'Admin'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 max-w-xl text-base leading-relaxed">
                        {t('greeting_desc_1')} {' '}
                        <strong className="font-semibold text-amber-600 dark:text-amber-400">{pendingOrders} {t('greeting_desc_2')}</strong> {t('greeting_desc_3')} {' '}
                        <strong className="font-semibold text-amber-600 dark:text-amber-400">{pendingAppointments} {t('greeting_desc_4')}</strong> {t('greeting_desc_5')}
                    </p>
                </article>

                {(pendingOrders > 0 || pendingAppointments > 0) && (
                    <aside className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-4 min-w-[280px]">
                        <div className="bg-amber-500 p-2.5 rounded-lg text-white flex-shrink-0">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-1">{t('alert_title')}</h2>
                            <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                                {pendingOrders > 0 && <li>• {pendingOrders} {t('alert_pending_orders')}</li>}
                                {pendingAppointments > 0 && <li>• {pendingAppointments} {t('alert_pending_appointments')}</li>}
                            </ul>
                        </div>
                    </aside>
                )}
            </div>
        </section>
    );
};
