import React from 'react';
import { Modal, Form } from 'antd';
import { useCategoryFormState } from './hooks/useCategoryFormState';

// Micro Components
import { CategoryFormHeader } from './components/CategoryFormHeader';
import { CategoryFormFooter } from './components/CategoryFormFooter';
import { CategoryNameField } from './components/CategoryNameField';
import { CategoryIdField } from './components/CategoryIdField';
import { CategoryDescField } from './components/CategoryDescField';

export const CategoryFormModal = ({ isOpen, onClose, onSave, editingData, t }) => {
    const { form, isEditing, handleValuesChange } = useCategoryFormState(isOpen, editingData);

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
                mask: "backdrop-blur-md bg-slate-950/40 dark:bg-[#000000]/80",
                content: "!p-0 bg-white dark:bg-[#141416] rounded-[32px] shadow-2xl overflow-hidden dark:border dark:border-white/5 animate-in fade-in zoom-in duration-300",
                body: "bg-transparent",
            }}
        >
            <CategoryFormHeader isEditing={isEditing} onClose={onClose} t={t} />

            <Form 
                form={form} 
                layout="vertical" 
                onFinish={handleFinish}
                onValuesChange={handleValuesChange}
                className="px-8 mt-6 space-y-8"
                requiredMark={false}
            >
                <CategoryNameField t={t} />
                <CategoryIdField t={t} isEditing={isEditing} />
                <CategoryDescField t={t} />

                <CategoryFormFooter onClose={onClose} isEditing={isEditing} t={t} />
            </Form>
        </Modal>
    );
};
