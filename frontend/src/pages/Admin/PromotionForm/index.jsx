import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormProvider } from 'react-hook-form';
import { Form } from 'antd';
import { PageLoader } from '@/components/ui/page-loader';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import { usePromotionFormLogic } from './hooks/usePromotionFormLogic';
import { DetailsCard } from './components/DetailsCard';
import { ConditionsLoyaltyCard } from './components/ConditionsLoyaltyCard';

const AdminPromotionFormContent = () => {
    const { form, onSubmit, isLoading, isFetching, isEditMode, t, navigate } = usePromotionFormLogic();

    if (isFetching) {
        return <PageLoader />;
    }

    return (
        <div className="w-full flex justify-center pb-32 pt-4 md:pt-6 animate-in fade-in duration-500 min-h-[calc(100vh-80px)]">
            <Helmet>
                <title>{isEditMode ? t('title_edit') : t('title_create')} | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                    <div>
                        <PageBreadcrumbs items={[
                            { label: t('adminPromotions:breadcrumb_promotions'), href: '/admin/promotions' },
                            { label: isEditMode ? t('title_edit') : t('title_create') }
                        ]} />
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
                            {isEditMode ? t('title_edit') : t('title_create')}
                        </h1>
                    </div>

                    {/* Top Action Buttons */}
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/promotions')}
                            disabled={isLoading}
                            className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-[#141416] text-slate-700 dark:text-white font-bold shadow-sm hover:scale-105 transition-transform active:scale-95 disabled:opacity-50 text-[13px]"
                        >
                            {t('btn_cancel')}
                        </button>
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isLoading}
                            className="px-8 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                        >
                            {isLoading && <span className="w-4 h-4 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin"></span>}
                            {isLoading ? t('btn_saving') : t('btn_save')}
                        </button>
                    </div>
                </div>

                <FormProvider {...form}>
                    <Form component="form" onFinish={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <DetailsCard />
                            <ConditionsLoyaltyCard />
                        </div>
                    </Form>
                </FormProvider>
            </div>
        </div>
    );
};

export const AdminPromotionFormPage = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <AdminPromotionFormContent />
        </Suspense>
    );
};

export default AdminPromotionFormPage;
