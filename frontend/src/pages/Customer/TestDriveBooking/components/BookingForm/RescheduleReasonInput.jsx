import { Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { RefreshCcw } from 'lucide-react';

const RescheduleReasonInput = ({ t, isReschedule }) => {
    const { control, formState: { errors } } = useFormContext();

    if (!isReschedule) return null;

    return (
        <div className="space-y-2.5 mt-6 border-t border-dashed border-slate-200 dark:border-white/10 pt-6 animate-in fade-in duration-500">
            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <RefreshCcw size={16} className="text-slate-400" />
                {t('booking_rescheduleReason', 'Lý do dời lịch')}
            </label>
            <Controller
                name="rescheduleReason"
                control={control}
                render={({ field }) => (
                    <Input.TextArea 
                        {...field}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        className={`!px-4 !py-3 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white transition-all custom-scrollbar ${errors.rescheduleReason ? '!border-red-500 dark:!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.rescheduleReason && (
                <p className="text-red-500 text-xs font-medium ml-2">{errors.rescheduleReason.message}</p>
            )}
        </div>
    );
};

export default RescheduleReasonInput;
