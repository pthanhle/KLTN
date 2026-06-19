import React from 'react';
import { Car, Clock, ArrowRight, CheckCircle, XCircle, AlertCircle, MapPin, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { TEST_DRIVE_STATUS_CONFIG } from '../../constants/dashboard.constants';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const iconMap = { AlertCircle, CheckCircle, Car, XCircle };

export const TestDriveWidget = ({ bookings }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('adminDashboard');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('widget_test_drive_title')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('widget_appointments_subtitle')}</p>
                </div>
                <div className="p-2.5 bg-sky-50 dark:bg-sky-500/10 rounded-2xl">
                    <Car size={20} className="text-sky-500" />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2">
                {bookings && bookings.length > 0 ? bookings.map((booking, idx) => {
                    const statusKey = booking.booking_status || 'PENDING';
                    const cfg = TEST_DRIVE_STATUS_CONFIG[statusKey] || TEST_DRIVE_STATUS_CONFIG.PENDING;
                    const StatusIcon = iconMap[cfg.icon] || AlertCircle;
                    const carName = booking.product_id?.name || t('widget_test_drive_no_car');
                    const isHome = booking.test_drive_type === 'home';

                    return (
                        <button
                            key={booking._id || idx}
                            onClick={() => navigate('/admin/test-drive-bookings')}
                            className="w-full text-left flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                            <div className={`p-2 rounded-xl ${cfg.bg} flex-shrink-0 mt-0.5`}>
                                <StatusIcon size={16} className={cfg.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-white truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                        {booking.customer_info?.full_name || t('widget_test_drive_customer')}
                                    </p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                                        {t(cfg.labelKey)}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{carName}</p>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock size={11} />
                                        {booking.time_slot}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock size={11} />
                                        {dayjs(booking.booking_date).format('DD/MM/YYYY')}
                                    </span>
                                    <span className={`flex items-center gap-1 text-xs ${isHome ? 'text-purple-500' : 'text-slate-400'}`}>
                                        {isHome ? <Home size={11} /> : <MapPin size={11} />}
                                        {isHome ? t('widget_test_drive_home') : t('widget_test_drive_showroom')}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                }) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[160px]">
                        <Car size={32} className="opacity-20" />
                        <span className="text-sm">{t('widget_test_drive_empty')}</span>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <Link to="/admin/test-drive-bookings" className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition-colors">
                    {t('widget_test_drive_view_all')} <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};
