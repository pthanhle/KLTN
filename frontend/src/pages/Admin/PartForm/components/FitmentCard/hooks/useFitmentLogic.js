import { useState } from 'react';
import { message } from 'antd';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const useFitmentLogic = (brands, t) => {
    const { control } = useFormContext();
    const [localBrands, setLocalBrands] = useState(brands || []);
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

    const handleAddBrand = (newBrand) => {
        if (!localBrands.includes(newBrand)) {
            setLocalBrands([...localBrands, newBrand]);
            message.success(t('adminPartForm:msgAddSuccess', { name: newBrand }));
        }
        setIsBrandModalOpen(false);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fitment_data'
    });

    return {
        control,
        fields,
        append,
        remove,
        localBrands,
        isBrandModalOpen,
        setIsBrandModalOpen,
        handleAddBrand
    };
};
