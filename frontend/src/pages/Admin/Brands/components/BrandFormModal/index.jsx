import React from 'react';
import { Modal, Form } from 'antd';
import { useBrandFormState } from './hooks/useBrandFormState';

// Micro Components
import { BrandFormHeader } from './components/BrandFormHeader';
import { BrandFormFooter } from './components/BrandFormFooter';
import { BrandNameField } from './components/BrandNameField';
import { BrandIdField } from './components/BrandIdField';
import { BrandLogoDragger } from './components/BrandLogoDragger';
import { BrandPartnerSwitch } from './components/BrandPartnerSwitch';

export const BrandFormModal = ({ isOpen, onClose, onSave, editingData, t }) => {
    // Tách riêng logic xử lý State Data
    const { form, isEditing, handleValuesChange } = useBrandFormState(isOpen, editingData);

    const handleFinish = (values) => {
        onSave(values);
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={520}
            footer={null}
            closeIcon={false}
            focusable={{ focusTriggerAfterClose: false }}
            destroyOnHidden
            classNames={{
                mask: "bg-[#070d1f]/80 backdrop-blur-md",
                content: "!p-0 bg-white dark:bg-[#151b2d] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] dark:border dark:border-white/5",
                body: "bg-transparent",
            }}
        >
            <BrandFormHeader isEditing={isEditing} onClose={onClose} t={t} />

            <Form 
                form={form} 
                layout="vertical" 
                onFinish={handleFinish}
                onValuesChange={handleValuesChange}
                className="px-8 mt-4 space-y-6"
                requiredMark={false}
            >
                <BrandNameField t={t} />
                <BrandIdField isEditing={isEditing} t={t} />
                <BrandLogoDragger t={t} />
                <BrandPartnerSwitch t={t} />

                <BrandFormFooter onClose={onClose} isEditing={isEditing} t={t} />
            </Form>
        </Modal>
    );
};
