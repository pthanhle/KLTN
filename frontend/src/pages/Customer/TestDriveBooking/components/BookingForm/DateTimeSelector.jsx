import { DatePicker } from 'antd';
import { CalendarDays, Clock } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const disabledDate = (current) => {
    return current && current.valueOf() < Date.now() - 86400000;
};

const DateTimeSelector = ({ timeSlots, t }) => {
    const { control, formState: { errors } } = useFormContext();
    const { i18n } = useTranslation();

    if (i18n.language === 'vi') {
        dayjs.locale('vi');
    } else {
        dayjs.locale('en');
    }

    const currentLocale = i18n.language === 'vi' ? viVN.DatePicker : enUS.DatePicker;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <CalendarDays size={16} className="text-yellow-500" />
                    {t('booking_date', 'Ngày lái thử')}
                </label>
                <Controller
                    name="selectedDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            placeholder="dd/mm/yyyy"
                            locale={currentLocale}
                            className={`!h-[52px] !w-full !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 [&_input]:!text-[15px] [&_input]:!font-medium [&_input]:!text-slate-900 dark:[&_input]:!text-white [&_.ant-picker-input_input::placeholder]:!text-slate-400 [&_.ant-picker-suffix]:!text-slate-800 dark:[&_.ant-picker-suffix]:!text-white ${errors.selectedDate ? '!border-red-500' : ''}`}
                            classNames={{ popup: "custom-datepicker-popup [&_.ant-picker-panel-container]:!rounded-2xl [&_.ant-picker-today-btn]:!text-yellow-600 dark:[&_.ant-picker-today-btn]:!text-yellow-500 hover:[&_.ant-picker-today-btn]:!text-yellow-500 [&_.ant-picker-cell-in-view.ant-picker-cell-today_.ant-picker-cell-inner::before]:!border-yellow-500 [&_.ant-picker-cell-in-view.ant-picker-cell-selected_.ant-picker-cell-inner]:!bg-yellow-500 [&_.ant-picker-cell-in-view.ant-picker-cell-selected_.ant-picker-cell-inner]:!text-slate-900 [&_.ant-picker-header-view_button:hover]:!text-yellow-500" }}
                        />
                    )}
                />
                {errors.selectedDate && <span className="text-[13px] font-medium text-red-500 block">{errors.selectedDate.message}</span>}
            </div>

            <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Clock size={16} className="text-yellow-500" />
                    {t('booking_time', 'Khung giờ')}
                </label>
                <Controller
                    name="selectedTimeSlot"
                    control={control}
                    render={({ field }) => (
                        <div className="grid grid-cols-2 gap-3">
                            {timeSlots.map(time => {
                                const isSelected = field.value === time;
                                return (
                                    <button
                                        type="button"
                                        key={time}
                                        onClick={() => field.onChange(time)}
                                        className={`h-[52px] rounded-2xl text-[14px] font-bold transition-all border ${isSelected
                                                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 shadow-[0_4px_14px_rgba(234,179,8,0.15)]'
                                                : 'bg-white dark:bg-[#141416] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-yellow-500 hover:text-yellow-500 dark:hover:text-yellow-500'
                                            } ${errors.selectedTimeSlot && !field.value ? 'border-red-500' : ''}`}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                />
                {errors.selectedTimeSlot && <span className="text-[13px] font-medium text-red-500 block">{errors.selectedTimeSlot.message}</span>}
            </div>
        </div>
    );
};

export default DateTimeSelector;
