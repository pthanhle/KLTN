import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Warehouse, Store, Activity } from 'lucide-react';
import { Controller } from 'react-hook-form';
import FormNumber from '../ui/FormNumber';
import { PackageOpen, Lock, CheckCircle2 } from 'lucide-react';
import { useInventoryLogic } from '../../hooks/useInventoryLogic';

const InventoryCard = ({ t }) => {
    const {
        control,
        status,
        allocated,
        availableStock
    } = useInventoryLogic();
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
                            {t('adminPartForm:stockOnHand', 'Tồn Kho Thực Tế')}
                        </label>
                        <Warehouse className="text-yellow-500/30 group-hover:text-yellow-500 transition-colors" size={20} strokeWidth={2} />
                    </div>
                    <FormNumber name="inventory.stock_on_hand" control={control} />
                    <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500">{t('adminPartForm:stockOnHandDesc', 'Số lượng vật lý đếm được tại kho.')}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-100/50 dark:bg-white/[0.02] rounded-2xl border border-slate-200/50 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Lock className="text-orange-500" size={16} />
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                                {t('adminPartForm:allocated', 'Tạm Giữ')}
                            </label>
                        </div>
                        <div className="text-2xl font-mono font-bold text-orange-600 dark:text-orange-500">{allocated}</div>
                        <p className="mt-2 text-[9px] text-slate-400">{t('adminPartForm:allocatedDesc', 'Đơn chưa giao')}</p>
                    </div>

                    <div className="p-5 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/10">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="text-emerald-500" size={16} />
                            <label className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-500 font-bold">
                                {t('adminPartForm:availableStock', 'Khả Dụng')}
                            </label>
                        </div>
                        <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{availableStock}</div>
                        <p className="mt-2 text-[9px] text-emerald-600/60 dark:text-emerald-500/60">{t('adminPartForm:availableStockDesc', 'Có thể bán')}</p>
                    </div>
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
                                        className={`flex-1 py-3.5 px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${field.value === 'active'
                                            ? 'bg-yellow-500 text-black shadow-md scale-100'
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-white scale-95 hover:scale-100'
                                            }`}
                                    >
                                        {t('adminPartForm:statusActive')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => field.onChange('draft')}
                                        className={`flex-1 py-3.5 px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg transition-all duration-300 ${field.value !== 'active'
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
