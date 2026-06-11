import { useCarFormUI } from './hooks/useCarFormUI';
import { useCarFormSubmit } from './hooks/useCarFormSubmit';
import BuilderSidebar from './components/BuilderSidebar';
import BuilderHeader from './components/BuilderHeader';
import OverviewTab from './components/Tabs/Overview/index';
import PricingInventoryTab from './components/Tabs/PricingInventory/index';
import SpecsTab from './components/Tabs/Specs/index';
import ColorsTab from './components/Tabs/Colors/index';
import FeaturesTab from './components/Tabs/Features/index';
import SEOTab from './components/Tabs/SEO/index';
import MediaLibraryTab from './components/Tabs/MediaLibrary/index';
import ThreeSixtyTab from './components/Tabs/ThreeSixty/index';
import { useTranslation } from 'react-i18next';
import { Form, Skeleton, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useCarFormInit } from './hooks/useCarFormInit';

const CarForm = () => {
    const { activeTab, setActiveTab } = useCarFormUI();
    const { t } = useTranslation('adminCarForm');
    const { id } = useParams();
    const [form] = Form.useForm();
    const { isSubmitting, handleSaveDraft, handlePublish } = useCarFormSubmit(form);
    const { isInitializing } = useCarFormInit(id, form);

    const renderTabContent = () => {
        const tabs = [
            { key: 'overview', component: <OverviewTab form={form} /> },
            { key: 'pricing', component: <PricingInventoryTab form={form} /> },
            { key: 'specs', component: <SpecsTab form={form} /> },
            { key: 'colors', component: <ColorsTab form={form} /> },
            { key: 'features', component: <FeaturesTab form={form} /> },
            { key: 'seo', component: <SEOTab form={form} /> },
            { key: 'library', component: <MediaLibraryTab form={form} /> },
            { key: '360', component: <ThreeSixtyTab form={form} /> },
        ];

        return (
            <>
                {tabs.map(tab => (
                    <div key={tab.key} className={activeTab === tab.key ? 'block' : 'hidden'}>
                        {tab.component}
                    </div>
                ))}
            </>
        );
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
                
                <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 py-6">
                        {isInitializing ? (
                            <div className="w-full max-w-4xl mx-auto mt-4 p-8 bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                                <Skeleton active paragraph={{ rows: 2 }} className="mb-8" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Space direction="vertical" size="large" className="w-full">
                                        <Skeleton.Input active block size="large" />
                                        <Skeleton.Input active block size="large" />
                                        <Skeleton.Input active block size="large" />
                                    </Space>
                                    <Space direction="vertical" size="large" className="w-full">
                                        <Skeleton.Input active block size="large" />
                                        <Skeleton.Input active block size="large" />
                                        <Skeleton.Image active className="!w-full !h-[120px]" />
                                    </Space>
                                </div>
                            </div>
                        ) : (
                            <Form 
                                form={form} 
                                layout="vertical"
                                className="w-full"
                            >
                                <Form.Item name="image" hidden />
                                <Form.Item name="new_photos" hidden />
                                <Form.Item name={['gallery', 'photos']} hidden />
                                <Form.Item name={['gallery', 'videos']} hidden />

                                {renderTabContent()}
                            </Form>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CarForm;
