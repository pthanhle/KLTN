import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import { Skeleton, Form } from 'antd';

import { usePartData } from './hooks/usePartData';
import { usePartForm } from './hooks/usePartForm';

import FormHeader from './components/FormHeader';
import BasicInfoCard from './components/BasicInfoCard';
import PricingCard from './components/PricingCard';
import FitmentCard from './components/FitmentCard';
import MediaGalleryCard from './components/MediaGalleryCard';
import LandingBuilderCard from './components/LandingBuilderCard';
import InventoryCard from './components/InventoryCard';
import SpecsBuilderCard from './components/SpecsBuilderCard';
import OptionsBuilderCard from './components/OptionsBuilderCard';
import SeoBuilderCard from './components/SeoBuilderCard';
import FormSkeleton from './components/FormSkeleton';

const AdminPartFormIndex = () => {
    const { id } = useParams();
    const { t } = useTranslation(['adminPartForm', 'adminParts', 'common']);

    // 1. Logic Data 
    const { partData, isLoadingPart, categories, brands, savePart, isSaving, isEditMode } = usePartData(id, t);

    // 2. Logic Form RHF
    const { formMethods, onSubmit, onDraft, onDuplicate } = usePartForm(partData, isEditMode, savePart, t);

    if (isLoadingPart) {
        return <FormSkeleton />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <FormProvider {...formMethods}>
                <FormHeader 
                    isEditMode={isEditMode} 
                    onSubmit={onSubmit} 
                    onDraft={onDraft}
                    onDuplicate={onDuplicate}
                    isSaving={isSaving} 
                    t={t} 
                />

                <Form component="form" layout="vertical" onFinish={onSubmit} className="grid grid-cols-12 gap-8">

                    <div className="col-span-12 xl:col-span-8 space-y-8">
                        <BasicInfoCard categories={categories} t={t} />
                        <PricingCard watch={formMethods.watch} t={t} />
                        <MediaGalleryCard control={formMethods.control} name="images" t={t} />
                        <FitmentCard control={formMethods.control} brands={brands} t={t} />
                        <SpecsBuilderCard control={formMethods.control} t={t} />
                    </div>

                    <div className="col-span-12 xl:col-span-4 space-y-8">
                        <InventoryCard t={t} />
                        <SeoBuilderCard control={formMethods.control} setValue={formMethods.setValue} t={t} />
                        <OptionsBuilderCard control={formMethods.control} t={t} />
                    </div>

                    <div className="col-span-12 space-y-8">
                        <LandingBuilderCard control={formMethods.control} t={t} />
                    </div>

                </Form>
            </FormProvider>
        </div>
    );
};

export default AdminPartFormIndex;
