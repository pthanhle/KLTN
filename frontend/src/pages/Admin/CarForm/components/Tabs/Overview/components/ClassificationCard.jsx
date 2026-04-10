import { Form, Select, Skeleton, App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDynamicTaxonomies } from '../../../../../Cars/hooks/useDynamicTaxonomies';
import { getOverviewRules } from '../../../../schemas/carOverviewSchema';
import { useState } from 'react';
import { BrandFormModal } from '../../../../../Shared/components/BrandFormModal';
import { BodyStyleFormModal } from '../../../../../Shared/components/BodyStyleFormModal';

const ClassificationCard = () => {
    const { t } = useTranslation('adminCarForm');
    const { t: tBrand } = useTranslation('adminBrands');
    const { brands, bodyStyles, isLoadingTaxonomies, addBrandConfig, addBodyStyleConfig } = useDynamicTaxonomies();
    const rules = getOverviewRules();
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [isBodyStyleModalOpen, setIsBodyStyleModalOpen] = useState(false);
    const { message } = App.useApp();

    const handleSaveBrand = (values) => {
        addBrandConfig(values);
        message.success(tBrand('msgCreateSuccess', 'Thêm mới thương hiệu thành công!'));
        setIsBrandModalOpen(false);
    };

    const handleSaveBodyStyle = (values) => {
        addBodyStyleConfig(values);
        message.success(t('adminCarForm:msgCreateSuccess', 'Thêm mới kiểu dáng thành công!'));
        setIsBodyStyleModalOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <label className="text-[11px] uppercase tracking-widest text-slate-500 font-black">{t('brandLabel', 'Thương Hiệu')}</label>
                    <button 
                        type="button" 
                        onClick={() => setIsBrandModalOpen(true)}
                        className="text-[11px] font-black text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/20 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest cursor-pointer border-none"
                    >
                        {t('addBrandBtn', '+ Thêm hãng')}
                    </button>
                </div>
                {isLoadingTaxonomies ? (
                    <Skeleton.Input active block style={{ height: '56px', borderRadius: '12px' }} />
                ) : (
                    <Form.Item name="brandId" rules={rules.brandId} className="mb-0">
                        <Select 
                            className="w-full !h-[56px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-white/5 [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!px-5 [&_.ant-select-selection-item]:!leading-[56px] [&_.ant-select-selection-item]:text-base [&_.ant-select-selection-item]:font-semibold [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-search-input]:!h-[56px] [&_.ant-select-selection-placeholder]:!leading-[56px] hover:[&_.ant-select-selector]:!bg-slate-100 dark:hover:[&_.ant-select-selector]:!bg-white/10 transition-all cursor-pointer"
                            classNames={{ popup: "!rounded-2xl !p-2 dark:bg-[#1c1c1f]" }}
                            placeholder={t('selectBrand', 'Chọn thương hiệu')}
                            options={brands}
                        />
                    </Form.Item>
                )}
            </div>

            <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <label className="text-[11px] uppercase tracking-widest text-slate-500 font-black">{t('bodyStyleLabel', 'Kiểu Dáng')}</label>
                    <button 
                        type="button" 
                        onClick={() => setIsBodyStyleModalOpen(true)}
                        className="text-[11px] font-black text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/20 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest cursor-pointer border-none"
                    >
                        {t('addBodyStyleBtn', '+ Thêm kiểu dáng')}
                    </button>
                </div>
                {isLoadingTaxonomies ? (
                    <Skeleton.Input active block style={{ height: '56px', borderRadius: '12px' }} />
                ) : (
                    <Form.Item name="bodyStyle" rules={rules.bodyStyle} className="mb-0">
                        <Select 
                            className="w-full !h-[56px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-white/5 [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!px-5 [&_.ant-select-selection-item]:!leading-[56px] [&_.ant-select-selection-item]:text-base [&_.ant-select-selection-item]:font-semibold [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-search-input]:!h-[56px] [&_.ant-select-selection-placeholder]:!leading-[56px] hover:[&_.ant-select-selector]:!bg-slate-100 dark:hover:[&_.ant-select-selector]:!bg-white/10 transition-all cursor-pointer"
                            classNames={{ popup: "!rounded-2xl !p-2 dark:bg-[#1c1c1f]" }}
                            placeholder={t('selectBodyStyle', 'Chọn kiểu dáng')}
                            options={bodyStyles}
                        />
                    </Form.Item>
                )}
            </div>

            <BrandFormModal
                isOpen={isBrandModalOpen}
                onClose={() => setIsBrandModalOpen(false)}
                onSave={handleSaveBrand}
                editingData={null}
                t={tBrand}
            />

            <BodyStyleFormModal
                isOpen={isBodyStyleModalOpen}
                onClose={() => setIsBodyStyleModalOpen(false)}
                onSave={handleSaveBodyStyle}
                t={t}
            />
        </div>
    );
};

export default ClassificationCard;
