import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { Info, Percent, CircleDollarSign, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

export const DetailsCard = () => {
    const { t } = useTranslation('adminPromotionForm');
    const { register, control, setValue, formState: { errors } } = useFormContext();

    const discountType = useWatch({ control, name: 'discount_type' });
    const discountValue = useWatch({ control, name: 'discount_value' });
    const maxDiscount = useWatch({ control, name: 'max_discount' });

    const handleDiscountTypeChange = (e) => {
        const type = e.target.value;
        setValue('discount_type', type, { shouldValidate: true });
        if (type !== 'PERCENT') setValue('max_discount', 0);
        if (type === 'FREE_SHIPPING') setValue('discount_value', 0);
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-sm">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/10 dark:group-hover:bg-yellow-500/20 transition-all duration-700 pointer-events-none"></div>

            <h2 className="text-xl font-black text-slate-900 dark:text-yellow-500 mb-8 flex items-center gap-2 tracking-tight">
                <Info size={24} className="text-yellow-500" />
                {t('card_details')}
            </h2>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                        {t('lbl_name')} <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder={t('ph_name')}
                                status={errors.title ? 'error' : ''}
                                className="h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 text-slate-900 dark:text-white"
                            />
                        )}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                        {t('lbl_desc')}
                    </label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                placeholder={t('ph_desc')}
                                rows={3}
                                status={errors.description ? 'error' : ''}
                                className="rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 text-slate-900 dark:text-white !resize-none py-3"
                            />
                        )}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
                </div>

                {/* Promo Type */}
                <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                        {t('lbl_type')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        {[
                            { value: 'PERCENT', label: t('type_percent'), icon: <Percent size={24} /> },
                            { value: 'FIXED', label: t('type_fixed'), icon: <CircleDollarSign size={24} /> },
                            { value: 'FREE_SHIPPING', label: t('type_free'), icon: <Truck size={24} /> }
                        ].map((type) => (
                            <label
                                key={type.value}
                                className={`
                                    relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2
                                    ${discountType === type.value
                                        ? 'bg-yellow-500/10 border-yellow-500 shadow-md shadow-yellow-500/10'
                                        : 'bg-slate-50 dark:bg-[#0a0a0b] border-transparent hover:border-slate-200 dark:hover:border-white/10'}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="discount_type"
                                    value={type.value}
                                    checked={discountType === type.value}
                                    onChange={handleDiscountTypeChange}
                                    className="hidden"
                                />
                                <div className={`mb-2 transition-colors ${discountType === type.value ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {type.icon}
                                </div>
                                <div className={`font-black uppercase tracking-widest text-[11px] transition-colors ${discountType === type.value ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {type.label}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Discount Values */}
                {discountType !== 'FREE_SHIPPING' && (
                    <div className={`grid grid-cols-1 gap-4 ${discountType === 'PERCENT' ? 'md:grid-cols-2' : ''}`}>
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                {t('lbl_discount_val')} <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center w-full h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus-within:!border-yellow-500 focus-within:!ring-2 focus-within:!ring-yellow-500/20 overflow-hidden transition-all">
                                <Controller
                                    name="discount_value"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            value={field.value === null || field.value === undefined ? '0' : field.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, '');
                                                field.onChange(raw === '' ? 0 : Number(raw));
                                            }}
                                            onFocus={(e) => e.target.select()}
                                            className="flex-1 h-full !border-0 !bg-transparent !shadow-none font-bold text-slate-900 dark:text-white px-0 focus:!shadow-none"
                                            status={errors.discount_value ? 'error' : ''}
                                        />
                                    )}
                                />
                                <div className="flex items-center px-4 h-full bg-slate-200/50 dark:bg-white/5 border-l border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-black">
                                    {discountType === 'PERCENT' ? <Percent size={16} /> : '₫'}
                                </div>
                            </div>
                            {errors.discount_value && <p className="text-red-500 text-xs mt-1 font-medium">{errors.discount_value.message}</p>}
                        </div>

                        {discountType === 'PERCENT' && (
                            <div>
                                <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                    {t('lbl_max_discount')} <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center w-full h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus-within:!border-yellow-500 focus-within:!ring-2 focus-within:!ring-yellow-500/20 overflow-hidden transition-all">
                                    <Controller
                                        name="max_discount"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                value={field.value === null || field.value === undefined ? '0' : field.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/\D/g, '');
                                                    field.onChange(raw === '' ? 0 : Number(raw));
                                                }}
                                                onFocus={(e) => e.target.select()}
                                                className="flex-1 h-full !border-0 !bg-transparent !shadow-none font-bold text-slate-900 dark:text-white px-0 focus:!shadow-none"
                                                status={errors.max_discount ? 'error' : ''}
                                            />
                                        )}
                                    />
                                    <div className="flex items-center px-4 h-full bg-slate-200/50 dark:bg-white/5 border-l border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-black">
                                        ₫
                                    </div>
                                </div>
                                {errors.max_discount && <p className="text-red-500 text-xs mt-1 font-medium">{errors.max_discount.message}</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
