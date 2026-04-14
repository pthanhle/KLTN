import { Form } from 'antd';

export const useSeoPreview = () => {
    const form = Form.useFormInstance();
    const slug = Form.useWatch('slug', form);
    const metaTitle = Form.useWatch('metaTitle', form);
    const metaDescription = Form.useWatch('metaDescription', form);
    const name = Form.useWatch('name', form);

    return {
        slug: slug || name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
        metaTitle: metaTitle || name || '',
        metaDescription: metaDescription || '',
    };
};
