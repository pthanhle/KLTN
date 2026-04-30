import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useQuickAddCategoryLogic } from '../../../hooks/useQuickAddCategoryLogic';

const QuickAddCategoryModal = ({ isOpen, onClose, t }) => {
    const { form, isCreating, handleSave, handleSubmit } = useQuickAddCategoryLogic(onClose);

    return (
        <Modal
            title={t('adminServiceItems:modal_quick_add_category_title', 'Thêm Danh Mục Nhanh')}
            open={isOpen}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={isCreating}
            okText={t('adminServiceItems:form_category_add_btn', 'Thêm')}
            cancelText={t('adminServiceItems:form_cancel', 'Hủy')}
            width={400}
        >
            <Form form={form} layout="vertical" onFinish={handleSave} className="mt-4">
                <Form.Item
                    name="name"
                    label={t('adminServiceItems:form_category_name', 'Tên Danh Mục')}
                    rules={[{ required: true, message: t('adminServiceItems:form_category_name_required', 'Vui lòng nhập tên danh mục') }]}
                >
                    <Input size="large" placeholder={t('adminServiceItems:form_category_name_placeholder', 'VD: Độ đèn, Phủ gầm...')} autoFocus />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default QuickAddCategoryModal;