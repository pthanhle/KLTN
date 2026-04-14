import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

export const useMediaLibrary = () => {
    const { t } = useTranslation('adminCarForm');
    const form = Form.useFormInstance();
    
    // Watch fields to trigger re-renders
    const heroImage = Form.useWatch('image', form);
    const gallery = Form.useWatch('gallery', form);
    const photos = Form.useWatch(['gallery', 'photos'], form) || [];
    const videos = Form.useWatch(['gallery', 'videos'], form) || [];

    // Helper functions for updating state without mutating directly
    const handleSetHeroImage = (imageUrl) => {
        form.setFieldValue('image', imageUrl);
    };

    const handleRemoveHeroImage = () => {
        form.setFieldValue('image', null);
    };

    const handleAddPhotos = (newPhotos) => {
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        form.setFieldValue('gallery', {
            ...currentGallery,
            photos: [...(currentGallery.photos || []), ...newPhotos]
        });
    };

    const handleRemovePhoto = (photoToRemove) => {
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        form.setFieldValue('gallery', {
            ...currentGallery,
            photos: (currentGallery.photos || []).filter(p => p !== photoToRemove)
        });
    };

    const handleMakeHero = (photoUrl) => {
        handleSetHeroImage(photoUrl);
    };

    const handleAddVideo = (videoObj) => {
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        form.setFieldValue('gallery', {
            ...currentGallery,
            videos: [...(currentGallery.videos || []), videoObj]
        });
    };

    const handleRemoveVideo = (indexToRemove) => {
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        form.setFieldValue('gallery', {
            ...currentGallery,
            videos: (currentGallery.videos || []).filter((_, index) => index !== indexToRemove)
        });
    };

    return {
        heroImage,
        photos,
        videos,
        handleSetHeroImage,
        handleRemoveHeroImage,
        handleAddPhotos,
        handleRemovePhoto,
        handleMakeHero,
        handleAddVideo,
        handleRemoveVideo
    };
};
