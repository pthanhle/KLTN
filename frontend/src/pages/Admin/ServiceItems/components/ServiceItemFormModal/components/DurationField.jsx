import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'antd';

const DurationField = ({ t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
                {t('adminServiceItems:form_duration')}
            </label>
            <div className="relative">
                <Controller
                    name="estimatedDuration"
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                            type="number"
                            value={value ?? ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                onChange(val === '' ? null : Number(val));
                            }}
                            onBlur={onBlur}
                            size="large"
                            min={0}
                            placeholder={t('adminServiceItems:form_duration_placeholder')}
                            className={`w-full text-[15px] font-medium !bg-slate-50 dark:!bg-zinc-800/50 !border-slate-200 dark:!border-white/10 !pr-16 [&::-webkit-inner-spin-button]:appearance-none ${errors.estimatedDuration ? '!border-red-500' : ''}`}
                        />
                    )}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">
                    MIN
                </span>
            </div>
            {errors.estimatedDuration && <span className="text-[11px] font-bold text-red-500">{errors.estimatedDuration.message}</span>}
        </div>
    );
};

export default DurationField;
