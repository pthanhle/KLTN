import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Warehouse, Store, Activity } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import FormNumber from '../ui/FormNumber';

const InventoryCard = ({ t }) => {
    const { control, watch } = useFormContext();
    const status = watch('status') || 'draft';
    return (
        <section className="bg-slate-50 dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:inventory')}
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {t('adminPartForm:inStock')}
                    </span>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-[#1c1c1e] rounded-[1.5rem] border-2 border-transparent transition-all shadow-sm group hover:border-yellow-500/30">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:warehouse')}
                        </label>
                        <Warehouse className="text-yellow-500/30 group-hover:text-yellow-500 transition-colors" size={20} strokeWidth={2} />
                    </div>
                    <FormNumber name="inventory.warehouse" control={control} />
                </div>
                
                <div className="p-6 bg-white dark:bg-[#1c1c1e] rounded-[1.5rem] border-2 border-transparent transition-all shadow-sm group hover:border-yellow-500/30">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:showroom')}
                        </label>
                        <Store className="text-yellow-500/30 group-hover:text-yellow-500 transition-colors" size={20} strokeWidth={2} />
                    </div>
                    <FormNumber name="inventory.showroom" control={control} />
                </div>

                <div className="p-6 bg-white dark:bg-[#1c1c1e] rounded-[1.5rem] border-2 border-transparent transition-all shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className={status === 'active' ? "text-yellow-500" : "text-slate-400"} size={16} />
                        <label className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:statusLbl')}
                        </label>
                    </div>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} className="mb-0">
                                <div className="flex bg-slate-50 dark:bg-[#141416] p-1.5 rounded-xl shadow-inner">
                                    <button
                                        type="button"
                                        onClick={() => field.onChange('active')}
                                        className={`flex-1 py-3.5 px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${
                                            field.value === 'active' 
                                            ? 'bg-yellow-500 text-black shadow-md scale-100' 
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-white scale-95 hover:scale-100'
                                        }`}
                                    >
                                        {t('adminPartForm:statusActive')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => field.onChange('draft')}
                                        className={`flex-1 py-3.5 px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${
                                            field.value !== 'active' 
                                            ? 'bg-slate-200 dark:bg-white/5 text-slate-800 dark:text-white shadow-md scale-100' 
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-white scale-95 hover:scale-100'
                                        }`}
                                    >
                                        {t('adminPartForm:statusDraft')}
                                    </button>
                                </div>
                            </Form.Item>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default InventoryCard;
