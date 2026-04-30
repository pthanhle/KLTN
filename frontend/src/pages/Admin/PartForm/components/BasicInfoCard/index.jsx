import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Plus } from 'lucide-react';
import QuickAddModal from '../QuickAddModal';
import FormInput from '../ui/FormInput';
import FormSelect from '../ui/FormSelect';
import { useBasicInfoLogic } from './hooks/useBasicInfoLogic';

const BasicInfoCard = ({ categories, conditions = [], createConditionAsync, t }) => {
    const {
        control,
        localCategories,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
        handleAddCategory,
        isConditionModalOpen,
        setIsConditionModalOpen,
        handleAddCondition
    } = useBasicInfoLogic(categories, conditions, createConditionAsync, t);


    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
                <Info className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:basicInfo')}
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="md:col-span-2">
                    <div className="h-[28px] flex items-center mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:partName')}
                        </label>
                    </div>
                    <FormInput 
                        name="name" 
                        control={control} 
                        placeholder={t('adminPartForm:placeholderName')} 
                    />
                </div>
                
                <div>
                    <div className="h-[28px] flex items-center mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:sku')}
                        </label>
                    </div>
                    <FormInput 
                        name="sku" 
                        control={control} 
                        placeholder={t('adminPartForm:phSku')} 
                        isMono={true}
                    />
                </div>
                
                
                <div>
                    <div className="flex justify-between items-center h-[28px] mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:category')}
                        </label>
                        <button 
                            type="button" 
                            onClick={() => setIsCategoryModalOpen(true)}
                            className="text-[11px] uppercase font-black text-yellow-600 dark:text-yellow-500 flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all bg-yellow-500/10 px-3 py-1.5 rounded-lg"
                        >
                            <Plus size={14} strokeWidth={3} /> {t('adminPartForm:btnAddQuick')}
                        </button>
                    </div>
                    <FormSelect
                        name="category"
                        control={control}
                        placeholder={t('adminPartForm:phSelect')}
                        options={localCategories.map(c => ({ label: c?.name || c, value: c?.value || c }))}
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center h-[28px] mb-3">
                        <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {t('adminPartForm:condition', 'Tình trạng')}
                        </label>
                        <button 
                            type="button" 
                            onClick={() => setIsConditionModalOpen(true)}
                            className="text-[11px] uppercase font-black text-yellow-600 dark:text-yellow-500 flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all bg-yellow-500/10 px-3 py-1.5 rounded-lg"
                        >
                            <Plus size={14} strokeWidth={3} /> {t('adminPartForm:btnAddQuick', 'Thêm Nhanh')}
                        </button>
                    </div>
                    <FormSelect
                        name="condition"
                        control={control}
                        placeholder={t('adminPartForm:phSelect')}
                        options={conditions.map(c => ({ label: c?.name || c.value, value: c?.value }))}
                    />
                </div>
            </div>

            <QuickAddModal 
                title={t('adminPartForm:modalTitleCat')}
                placeholder={t('adminPartForm:modalPhCat')}
                visible={isCategoryModalOpen}
                onCancel={() => setIsCategoryModalOpen(false)}
                onAdd={handleAddCategory}
                t={t}
            />

            <QuickAddModal 
                title={t('adminPartForm:modalTitleCondition', 'Thêm tình trạng mới')}
                placeholder={t('adminPartForm:modalPhCondition', 'Nhập tên tình trạng mới... (VD: Hàng OEM)')}
                visible={isConditionModalOpen}
                onCancel={() => setIsConditionModalOpen(false)}
                onAdd={handleAddCondition}
                t={t}
            />
        </section>
    );
};

export default BasicInfoCard;
