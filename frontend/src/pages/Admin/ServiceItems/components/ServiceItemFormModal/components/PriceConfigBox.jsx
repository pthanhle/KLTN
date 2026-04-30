import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input, Radio } from 'antd';

const PriceConfigBox = ({ t }) => {
    const { control, watch, formState: { errors } } = useFormContext();
    const priceType = watch('priceType');

    const formatValue = (val) => {
        if (val === null || val === undefined || val === '') return '';
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const parseValue = (val) => {
        if (!val) return '';
        return val.replace(/,/g, '');
    };

    return (
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 dark:bg-zinc-800/30 p-6 rounded-2xl border border-slate-200/60 dark:border-white/5">
            <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
                    {t('adminServiceItems:form_price_type')}
                </label>
                <Controller
                    name="priceType"
                    control={control}
                    render={({ field }) => (
                        <Radio.Group
                            {...field}
                            className="flex gap-4 flex-wrap"
                        >
                            <Radio value="FIXED" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t('adminServiceItems:form_price_fixed')}
                            </Radio>
                            <Radio value="STARTING_AT" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t('adminServiceItems:form_price_starting')}
                            </Radio>
                            <Radio value="CONTACT" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t('adminServiceItems:form_price_contact')}
                            </Radio>
                        </Radio.Group>
                    )}
                />
                {errors.priceType && <span className="text-[11px] font-bold text-red-500">{errors.priceType.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">
                    {t('adminServiceItems:form_base_price')}
                </label>
                <div className="relative">
                    <Controller
                        name="basePrice"
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <Input
                                value={formatValue(value)}
                                onChange={(e) => {
                                    const raw = parseValue(e.target.value);
                                    if (!/^\d*$/.test(raw)) return;
                                    onChange(raw === '' ? 0 : Number(raw));
                                }}
                                onBlur={onBlur}
                                size="large"
                                disabled={priceType === 'CONTACT'}
                                placeholder={t('adminServiceItems:form_base_price_placeholder')}
                                className={`w-full text-[15px] font-mono font-medium !bg-white dark:!bg-zinc-800/50 !border-slate-200 dark:!border-white/10 !pr-16 text-right ${errors.basePrice ? '!border-red-500' : ''}`}
                            />
                        )}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-widest pointer-events-none">
                        VND
                    </span>
                </div>
                {errors.basePrice && <span className="text-[11px] font-bold text-red-500">{errors.basePrice.message}</span>}
            </div>
        </div>
    );
};

export default PriceConfigBox;
