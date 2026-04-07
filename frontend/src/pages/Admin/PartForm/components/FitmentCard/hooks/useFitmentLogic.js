import { useState } from 'react';
import { message } from 'antd';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminPartApi } from '../../../../../../services/api/adminPart.api';

export const useFitmentLogic = (brands, t) => {
    const { control } = useFormContext();
    const queryClient = useQueryClient();

    const [addedBrands, setAddedBrands] = useState([]);
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

    // Map `brands` from the API which are objects { _id, name }
    const serverBrands = Array.isArray(brands) ? brands.map(b => b.name || b) : [];
    const combinedBrands = Array.from(new Set([...serverBrands, ...addedBrands]));

    const createBrandMutation = useMutation({
        mutationFn: adminPartApi.createPartBrand,
        onSuccess: (res) => {
            message.success(t('adminPartForm:msgAddSuccess', { name: res.data.name }));
            queryClient.invalidateQueries({ queryKey: ['admin_parts_filters'] });
            setIsBrandModalOpen(false);
        },
        onError: (err) => {
            message.error(err?.response?.data?.message || 'Có lỗi khi thêm hãng!');
        }
    });

    const handleAddBrand = (newBrand) => {
        if (!newBrand || !newBrand.trim()) return;
        
        const normalizedBrand = newBrand.trim();
        // Check local first to avoid unnecessary API trip if obviously duplicate
        if (combinedBrands.some(b => b.toLowerCase() === normalizedBrand.toLowerCase())) {
            message.warning('Thương hiệu này đã tồn tại trong danh sách');
            return;
        }

        // Only optimistic UI for the Fitment Array if the user wants it instantly, 
        // but it's safer to wait for DB since another part could use it. 
        // We add it to addedBrands to instantly show without waiting, then call API.
        setAddedBrands(prev => [...prev, normalizedBrand]);
        createBrandMutation.mutate(normalizedBrand);
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
        localBrands: combinedBrands,
        isBrandModalOpen,
        setIsBrandModalOpen,
        handleAddBrand
    };
};
