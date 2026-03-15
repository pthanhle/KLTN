import { Input } from 'antd';
import { PhoneCall } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

const ContactInput = ({ t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <PhoneCall size={16} className="text-yellow-500" />
                {t('booking_phone', 'Số điện thoại liên hệ')}
            </label>
            <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        value={value}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9+]/g, '');
                            onChange(val);
                        }}
                        placeholder="0xxx xxx xxx"
                        maxLength={11}
                        className={`!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white transition-all placeholder:!text-slate-400 ${errors.phoneNumber ? '!border-red-500 focus:!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.phoneNumber && <span className="text-[13px] font-medium text-red-500 block">{errors.phoneNumber.message}</span>}
        </div>
    );
};

export default ContactInput;
