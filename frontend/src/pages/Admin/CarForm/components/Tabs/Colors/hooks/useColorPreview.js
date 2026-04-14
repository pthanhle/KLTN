import { Form } from 'antd';
import { DEFAULT_PREVIEW_HEX, DEFAULT_PREVIEW_NAME } from '../../../../constants/carColors';

export const useColorPreview = (name) => {
    const form = Form.useFormInstance();
    const hexColor = Form.useWatch(['colors', name, 'value'], form) || DEFAULT_PREVIEW_HEX;
    const colorName = Form.useWatch(['colors', name, 'name'], form) || DEFAULT_PREVIEW_NAME;

    return {
        hexColor,
        colorName
    };
};
