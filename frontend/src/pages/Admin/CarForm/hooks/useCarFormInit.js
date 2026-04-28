import { useEffect } from 'react';
import { useAdminProductDetailQuery } from '../../../../services/queries/adminProduct.queries';

export const useCarFormInit = (id, form) => {
    const { data: carDetail, isLoading: isInitializing } = useAdminProductDetailQuery(id);

    useEffect(() => {
        if (!id) {
            form.resetFields();
            return;
        }

        if (carDetail) {
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
        }
    }, [id, carDetail, form]);

    return { isInitializing };
};
