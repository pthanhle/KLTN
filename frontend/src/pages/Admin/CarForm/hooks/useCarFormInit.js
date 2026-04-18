import { useEffect, useState } from 'react';
import { getAdminProductById } from '../../../../services/api/adminProduct.api';

export const useCarFormInit = (id, form) => {
    const [isInitializing, setIsInitializing] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchCarData = async () => {
            if (!id) {
                form.resetFields();
                return;
            }

            try {
                setIsInitializing(true);
                const carDetail = await getAdminProductById(id);
                
                if (isMounted && carDetail) {
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
            } catch (error) {
                console.error(error);
            } finally {
                if (isMounted) {
                    setIsInitializing(false);
                }
            }
        };

        fetchCarData();

        return () => {
            isMounted = false;
        };
    }, [id, form]);

    return { isInitializing };
};
