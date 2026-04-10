import { Form } from 'antd';

export const usePricingState = (form) => {
    const price = Form.useWatch('price', form);
    const salePrice = Form.useWatch('salePrice', form);

    let discountPercent = 0;
    if (price > 0 && salePrice > 0 && price > salePrice) {
        discountPercent = Math.round(((price - salePrice) / price) * 100);
    }

    return {
        price,
        salePrice,
        discountPercent
    };
};
