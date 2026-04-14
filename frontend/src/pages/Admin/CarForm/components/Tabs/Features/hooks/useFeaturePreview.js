import { Form } from 'antd';

export const useFeaturePreview = (index) => {
    const form = Form.useFormInstance();
    const image = Form.useWatch(['features', index, 'image'], form);
    
    return {
        image: image || null,
    };
};
