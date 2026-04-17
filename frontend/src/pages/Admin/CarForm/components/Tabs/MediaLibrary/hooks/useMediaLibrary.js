import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

export const useMediaLibrary = () => {
    const { t } = useTranslation('adminCarForm');
    const form = Form.useFormInstance();
    
    // Watch fields to trigger re-renders
    const rawHeroImage = Form.useWatch('image', form);
    const photos = Form.useWatch(['gallery', 'photos'], form) || [];
    const newPhotos = Form.useWatch('new_photos', form) || [];
    const videos = Form.useWatch(['gallery', 'videos'], form) || [];

    // Local state for previews (since we don't want to pollute form values with blobs if possible, 
    // but actually putting them in the heroImage field is easier for rendering)
    // Using a wrapper logic to return the best available URI
    const heroImageUri = React.useMemo(() => {
        if (!rawHeroImage) return null;
        if (rawHeroImage instanceof File) {
            return URL.createObjectURL(rawHeroImage);
        }
        return rawHeroImage;
    }, [rawHeroImage]);

    // Helper functions
    const handleSetHeroImage = (fileOrUrl) => {
        form.setFieldValue('image', fileOrUrl);
    };

    const handleRemoveHeroImage = () => {
        form.setFieldValue('image', null);
    };

    const handleAddPhotos = (newPhotosArr) => {
        // Here we track files to upload separately from existing photo URLs
        const filesToUpload = newPhotosArr.filter(p => p instanceof File);
        const existingUrls = newPhotosArr.filter(p => typeof p === 'string');

        if (filesToUpload.length > 0) {
            const currentFiles = form.getFieldValue('new_photos') || [];
            form.setFieldValue('new_photos', [...currentFiles, ...filesToUpload]);
        }

        if (existingUrls.length > 0) {
            const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
            form.setFieldValue('gallery', {
                ...currentGallery,
                photos: [...(currentGallery.photos || []), ...existingUrls]
            });
        }
    };

    const handleRemovePhoto = (photoToRemove) => {
        // Check if it's in the existing photos
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        const updatedPhotos = (currentGallery.photos || []).filter(p => p !== photoToRemove);
        form.setFieldValue('gallery', { ...currentGallery, photos: updatedPhotos });

        // Check if it's in the new photos (Files)
        const currentFiles = form.getFieldValue('new_photos') || [];
        const updatedFiles = currentFiles.filter(f => f !== photoToRemove);
        form.setFieldValue('new_photos', updatedFiles);
    };

    const handleMakeHero = (photoOrFile) => {
        handleSetHeroImage(photoOrFile);
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

    // UI Representation of photos
    const displayPhotos = React.useMemo(() => {
        const localPreviews = (newPhotos || []).map(file => ({
            url: URL.createObjectURL(file),
            raw: file
        }));
        const remotePhotos = (photos || []).map(url => ({
            url: url,
            raw: url
        }));
        return [...remotePhotos, ...localPreviews];
    }, [photos, newPhotos]);

    return {
        heroImage: heroImageUri,
        photos: displayPhotos, 
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
