import { Form } from 'antd';
import { useAdminServiceCategoryMutations } from '../../../../services/queries/serviceCategoryQueries';

export const useQuickAddCategoryLogic = (onClose) => {
    const [form] = Form.useForm();
    const { createServiceCategory, isCreating } = useAdminServiceCategoryMutations();

    const handleSave = async (values) => {
        try {
            const res = await createServiceCategory(values);
            form.resetFields();
            if (onClose) onClose(res?.category?._id || null);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        form,
        isCreating,
        handleSave,
        handleSubmit: () => form.submit()
    };
};
