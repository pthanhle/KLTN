import React from 'react';
import { Modal, Form } from 'antd';
import { FormProvider } from 'react-hook-form';
import { useServiceItemFormLogic } from '../../hooks/useServiceItemFormLogic';
import ServiceItemFormHeader from './components/ServiceItemFormHeader';
import ServiceItemFormFooter from './components/ServiceItemFormFooter';
import SkuField from './components/SkuField';
import ServiceNameField from './components/ServiceNameField';
import CategoryField from './components/CategoryField';
import DurationField from './components/DurationField';
import PriceConfigBox from './components/PriceConfigBox';
import PackageToggle from './components/PackageToggle';
import DescriptionField from './components/DescriptionField';

const ServiceItemFormModal = ({ isOpen, onClose, onSave, editingItem, categoryOptions, t }) => {
    const { form, isEditing, onSubmit } = useServiceItemFormLogic(isOpen, editingItem, onSave);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={800}
            footer={null}
            closeIcon={false}
            centered
            focusable={{ focusTriggerAfterClose: false }}
            destroyOnHidden
            classNames={{
                mask: "bg-[#070d1f]/80 backdrop-blur-md",
                content: "!p-0 bg-white dark:bg-[#141416] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/5 flex flex-col max-h-[90vh]",
                body: "bg-transparent flex-1 overflow-hidden flex flex-col",
            }}
        >
            <ServiceItemFormHeader isEditing={isEditing} onClose={onClose} t={t} />

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <FormProvider {...form}>
                    <Form id="service-item-form" component="form" onFinish={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <SkuField t={t} />
                        <CategoryField t={t} categoryOptions={categoryOptions} />
                        <ServiceNameField t={t} />
                        <DurationField t={t} />
                        <PackageToggle t={t} />
                        <PriceConfigBox t={t} />
                        <DescriptionField t={t} />
                    </Form>
                </FormProvider>
            </div>

            <ServiceItemFormFooter onClose={onClose} isEditing={isEditing} t={t} />
        </Modal>
    );
};

export default ServiceItemFormModal;
