import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { Switch, Input, DatePicker, Button } from 'antd';
import { Stars, Coins, Tag, Dices } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { generateRandomCode } from '../utils/generateCode';

const { RangePicker } = DatePicker;

export const ConditionsLoyaltyCard = () => {
    const { t } = useTranslation('adminPromotionForm');
    const { register, control, setValue, formState: { errors } } = useFormContext();
    
    const isLoyalty = useWatch({ control, name: 'is_loyalty' });
    const dateRange = useWatch({ control, name: 'date_range' });
    const pointsRequired = useWatch({ control, name: 'points_required' });
    const validityDays = useWatch({ control, name: 'validity_days' });
    const minOrderValue = useWatch({ control, name: 'min_order_value' });

    const handleGenerateCode = () => {
        const code = generateRandomCode(8);
        setValue('code', code, { shouldValidate: true });
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-sm h-full">
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none"></div>
            
            <h2 className="text-xl font-black text-slate-900 dark:text-emerald-400 mb-8 flex items-center gap-2 tracking-tight">
                <Stars size={24} className="text-emerald-500 dark:text-emerald-400" />
                {t('card_conditions')}
            </h2>
            
            <div className="space-y-6 relative z-10">
                {/* Loyalty Switch */}
                <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-[#0a0a0b] rounded-xl border border-slate-200/50 dark:border-white/5">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{t('lbl_loyalty_switch')}</h3>
                        <p className="text-xs text-slate-500 mt-1">{t('desc_loyalty_switch')}</p>
                    </div>
                    <Switch
                        checked={isLoyalty}
                        onChange={(checked) => {
                            setValue('is_loyalty', checked, { shouldValidate: true });
                        }}
                        className="bg-slate-200 dark:bg-white/10 [&.ant-switch-checked]:bg-emerald-500"
                    />
                </div>

                {/* Conditional Fields: Loyalty vs Code */}
                {isLoyalty ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                                {t('lbl_points_req')} <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center w-full h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus-within:!border-emerald-500 focus-within:!ring-2 focus-within:!ring-emerald-500/20 overflow-hidden transition-all">
                                <div className="flex items-center px-4 h-full bg-slate-200/50 dark:bg-white/5 border-r border-slate-200 dark:border-white/10">
                                    <Coins size={16} className="text-emerald-500" />
                                </div>
                                <Controller
                                    name="points_required"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            value={field.value === null || field.value === undefined ? '0' : field.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, '');
                                                field.onChange(raw === '' ? 0 : Number(raw));
                                            }}
                                            onFocus={(e) => e.target.select()}
                                            className="flex-1 h-full !border-0 !bg-transparent !shadow-none font-bold text-emerald-600 px-0 focus:!shadow-none"
                                            status={errors.points_required ? 'error' : ''}
                                        />
                                    )}
                                />
                            </div>
                            {errors.points_required && <p className="text-red-500 text-xs mt-1 font-medium">{errors.points_required.message}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                {t('lbl_validity_days')} <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center w-full h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus-within:!border-emerald-500 focus-within:!ring-2 focus-within:!ring-emerald-500/20 overflow-hidden transition-all">
                                <Controller
                                    name="validity_days"
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
                                            status={errors.validity_days ? 'error' : ''}
                                        />
                                    )}
                                />
                                <div className="flex items-center px-4 h-full bg-slate-200/50 dark:bg-white/5 border-l border-slate-200 dark:border-white/10">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('suffix_days')}</span>
                                </div>
                            </div>
                            {errors.validity_days && <p className="text-red-500 text-xs mt-1 font-medium">{errors.validity_days.message}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                {t('lbl_common_code')} <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder={t('ph_common_code')}
                                            prefix={<Tag size={16} className="text-slate-400 mr-2" />}
                                            status={errors.code ? 'error' : ''}
                                            className="flex-1 h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:border-yellow-500 uppercase font-black tracking-widest"
                                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                        />
                                    )}
                                />
                                <Button 
                                    onClick={handleGenerateCode}
                                    className="!h-12 !w-12 rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-[#141416] text-slate-600 dark:text-slate-400 hover:!text-yellow-500 hover:!border-yellow-500 flex items-center justify-center p-0"
                                >
                                    <Dices size={20} />
                                </Button>
                            </div>
                            {errors.code && <p className="text-red-500 text-xs mt-1 font-medium">{errors.code.message}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                {t('lbl_date_range')} <span className="text-red-500">*</span>
                            </label>
                            <RangePicker 
                                value={dateRange}
                                onChange={(dates) => setValue('date_range', dates, { shouldValidate: true })}
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                                format="DD/MM/YYYY"
                                className="w-full h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:border-yellow-500"
                                status={errors.date_range ? 'error' : ''}
                            />
                            {errors.date_range && <p className="text-red-500 text-xs mt-1 font-medium">{errors.date_range.message}</p>}
                        </div>
                    </div>
                )}

                <div className="h-px bg-slate-100 dark:bg-white/5 my-6 w-full"></div>

                {/* Min Order Value */}
                <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                        {t('lbl_min_order')} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center w-full h-12 rounded-xl bg-slate-50 dark:bg-[#0a0a0b] border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus-within:!border-yellow-500 focus-within:!ring-2 focus-within:!ring-yellow-500/20 overflow-hidden transition-all">
                        <Controller
                            name="min_order_value"
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
                                    status={errors.min_order_value ? 'error' : ''}
                                />
                            )}
                        />
                        <div className="flex items-center px-4 h-full bg-slate-200/50 dark:bg-white/5 border-l border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-black">
                            ₫
                        </div>
                    </div>
                    {errors.min_order_value && <p className="text-red-500 text-xs mt-1 font-medium">{errors.min_order_value.message}</p>}
                </div>
            </div>
        </div>
    );
};
