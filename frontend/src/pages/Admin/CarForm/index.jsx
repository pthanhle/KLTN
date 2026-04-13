import { useCarFormUI } from './hooks/useCarFormUI';
import { useCarFormSubmit } from './hooks/useCarFormSubmit';
import BuilderSidebar from './components/BuilderSidebar';
import BuilderHeader from './components/BuilderHeader';
import OverviewTab from './components/Tabs/Overview/index';
import PricingInventoryTab from './components/Tabs/PricingInventory/index';
import SpecsTab from './components/Tabs/Specs/index';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

const CarForm = () => {
    const { activeTab, setActiveTab } = useCarFormUI();
    const { t } = useTranslation('adminCarForm');
    const [form] = Form.useForm();
    const { isSubmitting, handleSaveDraft, handlePublish } = useCarFormSubmit(form);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab form={form} />;
            case 'pricing': return <PricingInventoryTab form={form} />;
            case 'specs': return <SpecsTab form={form} />;
            case 'colors': return <div className="text-center p-20 dark:text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('colorsPending', 'Colors Module Pending...')}</div>;
            case 'features': return <div className="text-center p-20 dark:text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('featuresPending', 'Features Module Pending...')}</div>;
            case 'seo': return <div className="text-center p-20 dark:text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('seoPending', 'SEO Module Pending...')}</div>;
            case 'library': return <div className="text-center p-20 dark:text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('libraryPending', 'Library Module Pending...')}</div>;
            case '360': return <div className="text-center p-20 dark:text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('360Pending', '360 View Module Pending...')}</div>;
            default: return null;
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-slate-50 dark:bg-[#0a0a0b] overflow-hidden w-full">
            <BuilderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <BuilderHeader 
                    handleSaveDraft={handleSaveDraft} 
                    handlePublish={handlePublish} 
                    isSubmitting={isSubmitting} 
                />
                
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 py-6">
                        <Form 
                            form={form} 
                            layout="vertical"
                            className="w-full"
                        >
                            {renderTabContent()}
                        </Form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CarForm;
