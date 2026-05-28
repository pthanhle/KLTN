import { useState } from 'react';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createAdminProduct, updateAdminProduct } from '../../../../services/api/adminProduct.api';

export const useCarFormSubmit = (form) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isBinary = (val) => val instanceof File || val instanceof Blob;

    const getRealFile = (val) => {
        if (!val) return null;
        if (isBinary(val)) return val;
        if (val.originFileObj && isBinary(val.originFileObj)) {
            return val.originFileObj;
        }
        if (Array.isArray(val) && val.length > 0) {
            const first = val[0];
            if (isBinary(first)) return first;
            if (first.originFileObj && isBinary(first.originFileObj)) return first.originFileObj;
        }
        return null;
    };

    const getStringUrl = (val) => {
        if (!val) return null;
        if (typeof val === 'string') return val;
        if (val.url && typeof val.url === 'string') {
            return val.url;
        }
        if (Array.isArray(val) && val.length > 0) {
            const first = val[0];
            if (first.url && typeof first.url === 'string') return first.url;
            if (typeof first === 'string') return first;
        }
        return null;
    };

    const convertToFormData = (values) => {
        const formData = new FormData();
        const timestamp = Date.now();

        for (const [key, value] of Object.entries(values)) {
            if (value === undefined || value === null) continue;

            if (key === 'image') {
                const file = getRealFile(value);
                if (file) formData.append('image', file);
                else {
                    const url = getStringUrl(value);
                    if (url) formData.append('image', url);
                }
            } else if (key === 'new_photos' && Array.isArray(value)) {
                value.forEach((item, index) => {
                    const photoFile = getRealFile(item);
                    if (photoFile) {
                        const fileName = photoFile.name || `photo-${index}-${timestamp}.png`;
                        formData.append('photos', photoFile, fileName);
                    }
                });
            } else if (key === 'colors' && Array.isArray(value)) {
                const colorsWithFiles = value.map((color, index) => {
                    const colorImageFile = getRealFile(color.image);
                    if (colorImageFile) {
                        const fieldName = `color_file_${index}_${timestamp}`;
                        const fileName = colorImageFile.name || `color-${index}-${timestamp}.png`;
                        formData.append(fieldName, colorImageFile, fileName);
                        return { ...color, image: `PEND_COL_${index}_${timestamp}` };
                    }
                    return { ...color, image: getStringUrl(color.image) };
                });
                formData.append('colors', JSON.stringify(colorsWithFiles));
            } else if (key === 'features' && Array.isArray(value)) {
                const featuresWithFiles = value.map((feature, index) => {
                    const featureImageFile = getRealFile(feature.image);
                    if (featureImageFile) {
                        const fieldName = `feature_file_${index}_${timestamp}`;
                        const fileName = featureImageFile.name || `feat-${index}-${timestamp}.png`;
                        formData.append(fieldName, featureImageFile, fileName);
                        return { ...feature, image: `PEND_FEAT_${index}_${timestamp}` };
                    }
                    return { ...feature, image: getStringUrl(feature.image) };
                });
                formData.append('features', JSON.stringify(featuresWithFiles));
            } else if (Array.isArray(value) || (typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob))) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        }
        return formData;
    };

    const handlePublish = async () => {
        try {
            console.log('handlePublish triggered');
            setIsSubmitting(true);
            const values = await form.validateFields();
            console.log('form validation success', values);
            const formData = convertToFormData({ ...values, status: 'Published' });

            if (id) {
                console.log('Calling updateAdminProduct api directly for publish');
                await updateAdminProduct(id, formData);
                console.log('updateAdminProduct call successful');

                queryClient.invalidateQueries({ queryKey: ['admin-products'] })
                    .then(() => console.log('Query invalidation for admin-products successful'))
                    .catch(err => console.error('Query invalidation failed', err));

                sessionStorage.setItem('admin_car_success', 'Cập nhật xe thành công!');
                console.log('Redirecting to /admin/cars via window.location.replace');
                window.location.replace('/admin/cars');
            } else {
                console.log('Calling createAdminProduct api directly for publish');
                await createAdminProduct(formData);
                console.log('createAdminProduct call successful');

                queryClient.invalidateQueries({ queryKey: ['admin-products'] })
                    .then(() => console.log('Query invalidation for admin-products successful'))
                    .catch(err => console.error('Query invalidation failed', err));

                sessionStorage.setItem('admin_car_success', 'Thêm xe mới thành công!');
                console.log('Redirecting to /admin/cars via window.location.replace');
                window.location.replace('/admin/cars');
            }
        } catch (error) {
            console.error('handlePublish error', error);
            message.error('Biểu mẫu còn thiếu thông tin hoặc có lỗi xảy ra!');
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = async () => {
        try {
            console.log('handleSaveDraft triggered');
            setIsSubmitting(true);
            const values = form.getFieldsValue();
            console.log('form fields value for draft', values);
            const formData = convertToFormData({ ...values, status: 'Draft' });

            if (id) {
                console.log('Calling updateAdminProduct api directly for draft');
                await updateAdminProduct(id, formData);
                console.log('updateAdminProduct (draft) call successful');

                queryClient.invalidateQueries({ queryKey: ['admin-products'] })
                    .then(() => console.log('Query invalidation for admin-products successful'))
                    .catch(err => console.error('Query invalidation failed', err));

                sessionStorage.setItem('admin_car_success', 'Đã lưu nháp cập nhật!');
                console.log('Redirecting to /admin/cars via window.location.replace');
                window.location.replace('/admin/cars');
            } else {
                console.log('Calling createAdminProduct api directly for draft');
                await createAdminProduct(formData);
                console.log('createAdminProduct (draft) call successful');

                queryClient.invalidateQueries({ queryKey: ['admin-products'] })
                    .then(() => console.log('Query invalidation for admin-products successful'))
                    .catch(err => console.error('Query invalidation failed', err));

                sessionStorage.setItem('admin_car_success', 'Đã lưu bản nháp mới!');
                console.log('Redirecting to /admin/cars via window.location.replace');
                window.location.replace('/admin/cars');
            }
        } catch (error) {
            console.error('handleSaveDraft error', error);
            message.error('Không thể lưu bản nháp!');
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        handlePublish,
        handleSaveDraft
    };
};