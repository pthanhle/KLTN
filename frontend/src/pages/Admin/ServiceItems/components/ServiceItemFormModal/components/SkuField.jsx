import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'antd';

const SkuField = ({ t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                {t('adminServiceItems:form_sku')} <span className="text-red-500">*</span>
            </label>
            <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        size="large"
                        placeholder={t('adminServiceItems:form_sku_placeholder')}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        className={`w-full text-[15px] font-mono font-medium uppercase !bg-slate-50 dark:!bg-zinc-800/50 !border-slate-200 dark:!border-white/10 ${errors.sku ? '!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.sku && <span className="text-[11px] font-bold text-red-500">{errors.sku.message}</span>}
        </div>
    );
};

export default SkuField;
