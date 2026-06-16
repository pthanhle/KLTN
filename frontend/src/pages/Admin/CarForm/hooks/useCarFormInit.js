import { useEffect, useState } from 'react';
import { useAdminProductDetailQuery } from '../../../../services/queries/adminProduct.queries';

export const useCarFormInit = (id, form) => {
    const { data: carDetail, isLoading: isInitializing } = useAdminProductDetailQuery(id);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!id) {
            form.resetFields();
            return;
        }

        if (carDetail && !isInitialized) {
            const sanitizedData = {
                ...carDetail,
                brandId: carDetail.brandId?._id || carDetail.brandId,
                category: carDetail.category?._id || carDetail.category,
                versions: carDetail.versions || [],
                colors: carDetail.colors || [],
                features: (carDetail.features || []).map((f, idx) => ({
                    ...f,
                    image: f.image ? [{
                        uid: `feat-${idx}`,
                        name: 'image',
                        status: 'done',
                        url: f.image
                    }] : []
                })),
                specs: carDetail.specs || [],
                gallery: carDetail.gallery || { photos: [], videos: [] },
                threeSixty: carDetail.threeSixty || { images: [], lighting: 'Studio', environment: 'Minimalist Studio' }
            };
            form.setFieldsValue(sanitizedData);
            setIsInitialized(true);
        } else if (carDetail && isInitialized) {
            form.setFieldValue('stock', carDetail.stock);
            form.setFieldValue('availableShowrooms', carDetail.availableShowrooms);
        }
    }, [id, carDetail, form]);

    return { isInitializing: isInitializing && !isInitialized };
};
