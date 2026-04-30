import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'antd';

const { TextArea } = Input;

const DescriptionField = ({ t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
                {t('adminServiceItems:form_description')}
            </label>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextArea
                        {...field}
                        rows={4}
                        placeholder={t('adminServiceItems:form_description_placeholder')}
                        className={`w-full text-[14px] font-medium !bg-slate-50 dark:!bg-zinc-800/50 !border-slate-200 dark:!border-white/10 custom-scrollbar !min-h-[120px] !py-3 ${errors.description ? '!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.description && <span className="text-[11px] font-bold text-red-500">{errors.description.message}</span>}
        </div>
    );
};

export default DescriptionField;
