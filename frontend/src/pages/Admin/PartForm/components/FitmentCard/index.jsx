import React from 'react';
import { CarFront, X, Plus } from 'lucide-react';
import QuickAddModal from '../QuickAddModal';
import FormSelect from '../ui/FormSelect';
import FormInput from '../ui/FormInput';
import { useFitmentLogic } from './hooks/useFitmentLogic';

const FitmentCard = ({ brands, t }) => {
    const {
        control,
        fields,
        append,
        remove,
        localBrands,
        isBrandModalOpen,
        setIsBrandModalOpen,
        handleAddBrand
    } = useFitmentLogic(brands, t);


    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <CarFront className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:fitment')}
                </h3>
            </div>
            
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-center h-[28px] mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:brands')}
                        </label>
                        <button 
                            type="button" 
                            onClick={() => setIsBrandModalOpen(true)}
                            className="text-[11px] uppercase font-black text-yellow-600 dark:text-yellow-500 flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all bg-yellow-500/10 px-3 py-1.5 rounded-lg"
                        >
                            <Plus size={14} strokeWidth={3} /> {t('adminPartForm:btnAddQuick')}
                        </button>
                    </div>
                    <FormSelect
                        name="compatible_brands"
                        control={control}
                        mode="multiple"
                        allowClear
                        placeholder={t('adminPartForm:addBrand')}
                        options={localBrands.map(b => ({ label: b?.name || b, value: b?.name || b }))}
                    />
                </div>
                
                <div className="mt-8">
                    <div className="h-[28px] flex items-center mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:models')}
                        </label>
                    </div>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-slate-50 dark:bg-[#1c1c1e] rounded-3xl flex gap-4 items-center border-2 border-transparent hover:border-yellow-500/20 transition-all group">
                                <div className="w-36">
                                    <FormSelect
                                        name={`fitment_data.${index}.brand`}
                                        control={control}
                                        placeholder={t('adminPartForm:phBrand', 'Hãng')}
                                        options={localBrands.map(b => ({ label: b?.name || b, value: b?.name || b }))}
                                        allowClear
                                    />
                                </div>
                                <div className="flex-1">
                                    <FormInput 
                                        name={`fitment_data.${index}.model`} 
                                        control={control} 
                                        placeholder={t('adminPartForm:phModels', 'Tên Model')} 
                                    />
                                </div>
                                <div className="w-32 sm:w-40">
                                    <FormInput 
                                        name={`fitment_data.${index}.yearRange`} 
                                        control={control} 
                                        placeholder={t('adminPartForm:phYear', 'Ví dụ: 2020-2024')} 
                                        extraClassName="text-slate-500 dark:text-slate-300 placeholder:font-normal text-sm"
                                    />
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all p-3 rounded-xl opacity-0 group-hover:opacity-100"
                                >
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>
                        ))}
                        
                        <button 
                            type="button" 
                            onClick={() => append({ brand: '', model: '', yearRange: '' })}
                            className="w-full py-4 rounded-[1.25rem] border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={18} strokeWidth={3} /> {t('adminPartForm:btnAddModel', 'Thêm Model')}
                        </button>
                    </div>
                </div>
            </div>

            <QuickAddModal 
                title={t('adminPartForm:modalTitleBrand')}
                placeholder={t('adminPartForm:modalPhBrand')}
                visible={isBrandModalOpen}
                onCancel={() => setIsBrandModalOpen(false)}
                onAdd={handleAddBrand}
                t={t}
            />
        </section>
    );
};

export default FitmentCard;
