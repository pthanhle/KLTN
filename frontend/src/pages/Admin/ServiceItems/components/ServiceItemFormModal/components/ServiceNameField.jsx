import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'antd';

const ServiceNameField = ({ t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                {t('adminServiceItems:form_name')} <span className="text-red-500">*</span>
            </label>
            <Controller
                name="serviceName"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        size="large"
                        placeholder={t('adminServiceItems:form_name_placeholder')}
                        className={`w-full text-[15px] font-medium !bg-slate-50 dark:!bg-zinc-800/50 !border-slate-200 dark:!border-white/10 ${errors.serviceName ? '!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.serviceName && <span className="text-[11px] font-bold text-red-500">{errors.serviceName.message}</span>}
        </div>
    );
};

export default ServiceNameField;
