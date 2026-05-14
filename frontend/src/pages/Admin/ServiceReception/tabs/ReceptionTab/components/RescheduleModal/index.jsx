import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, CalendarClock } from 'lucide-react';
import { DatePicker, TimePicker, ConfigProvider, theme } from 'antd';
import { Controller } from 'react-hook-form';
import { useRescheduleModal } from './hooks/useRescheduleModal';

const RescheduleModal = ({ booking, isOpen, onClose, onSave }) => {
    const { t } = useTranslation('adminServiceReception');
    const { control, handleSubmit, errors } = useRescheduleModal(booking, isOpen, onSave);

    if (!isOpen || !booking) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
                <ConfigProvider
                    theme={{
                        algorithm: document.documentElement.classList.contains('dark') ? theme.darkAlgorithm : theme.defaultAlgorithm,
                        token: {
                            colorPrimary: document.documentElement.classList.contains('dark') ? '#D4AF37' : '#eab308',
                            colorBorder: '#e2e8f0',
                            borderRadius: 8,
                            controlHeight: 40,
                        },
                    }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col h-full m-0">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-yellow-50/30 dark:bg-yellow-900/10">
                            <div className="flex items-center gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
                                    <CalendarClock className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                                    {t('modal_reschedule_title', 'Reschedule Booking')}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                    {t('modal_reschedule_desc', 'Please select a new date and time for this booking.')}
                                </p>

                                <div className="bg-slate-50 dark:bg-[#0a0a0b] p-4 rounded-xl border border-slate-200 dark:border-white/5 mb-6">
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">{booking.customer_name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{booking.vehicle_brand} {booking.vehicle_model} • {booking.license_plate}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div id="date-picker-container" className="relative">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        {t('modal_reschedule_new_date', 'New Date')}
                                    </label>
                                    <Controller
                                        name="newDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                className="w-full bg-white dark:bg-[#141416] text-slate-900 dark:text-white dark:border-white/10"
                                                format="DD/MM/YYYY"
                                                placeholder={t('modal_reschedule_new_date', 'New Date')}
                                                popupClassName="!z-[10000]"
                                            />
                                        )}
                                    />
                                    {errors.newDate && <span className="text-red-500 text-xs mt-1 block">{errors.newDate.message}</span>}
                                </div>

                                <div id="time-picker-container" className="relative">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        {t('modal_reschedule_new_time', 'New Time')}
                                    </label>
                                    <Controller
                                        name="newTime"
                                        control={control}
                                        render={({ field }) => (
                                            <TimePicker
                                                {...field}
                                                className="w-full bg-white dark:bg-[#141416] text-slate-900 dark:text-white dark:border-white/10"
                                                format="HH:mm"
                                                minuteStep={15}
                                                placeholder={t('modal_reschedule_new_time', 'New Time')}
                                                popupClassName="!z-[10000]"
                                            />
                                        )}
                                    />
                                    {errors.newTime && <span className="text-red-500 text-xs mt-1 block">{errors.newTime.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex justify-end gap-3 mt-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full md:w-auto bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 uppercase text-[11px] font-bold tracking-widest px-6 py-3 rounded-full transition-all"
                            >
                                {t('modal_reschedule_btn_cancel', 'Cancel')}
                            </button>
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-900 uppercase text-[11px] font-black tracking-widest px-6 py-3 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                            >
                                {t('modal_reschedule_btn_save', 'Save Changes')}
                            </button>
                        </div>
                    </form>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default RescheduleModal;
