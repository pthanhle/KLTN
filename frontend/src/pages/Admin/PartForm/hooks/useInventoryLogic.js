import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const useInventoryLogic = () => {
    const { control, watch, setValue } = useFormContext();
    const status = watch('status') || 'draft';
    
    const stockOnHand = watch('inventory.stock_on_hand') || 0;
    const allocated = watch('inventory.allocated') || 0;
    
    useEffect(() => {
        const available = Math.max(0, stockOnHand - allocated);
        setValue('inventory.available_stock', available, { shouldValidate: true, shouldDirty: true });
    }, [stockOnHand, allocated, setValue]);

    const availableStock = Math.max(0, stockOnHand - allocated);

    return {
        control,
        status,
        stockOnHand,
        allocated,
        availableStock
    };
};
