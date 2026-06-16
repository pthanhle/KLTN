import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

const EMPTY_ARRAY = [];

export const useMediaLibrary = () => {
    const { t } = useTranslation('adminCarForm');
    const form = Form.useFormInstance();

    const rawHeroImage = Form.useWatch('image', form);
    const photos = Form.useWatch(['gallery', 'photos'], form) || EMPTY_ARRAY;
    const newPhotos = Form.useWatch('new_photos', form) || EMPTY_ARRAY;
    const videos = Form.useWatch(['gallery', 'videos'], form) || EMPTY_ARRAY;

    const getRealFile = (val) => {
        if (!val) return null;
        if (val instanceof File || val instanceof Blob) return val;
        if (val.originFileObj instanceof File || val.originFileObj instanceof Blob) return val.originFileObj;
        if (val.file instanceof File || val.file instanceof Blob) return val.file;
        if (typeof val === 'object' && val.uid && val.type) return val;

        return null;
    };

    const [heroImageUri, setHeroImageUri] = React.useState(null);

    React.useEffect(() => {
        if (!rawHeroImage) {
            setHeroImageUri(null);
            return;
        }

        const fileObj = getRealFile(rawHeroImage);

        if (fileObj) {
            const url = URL.createObjectURL(fileObj);
            setHeroImageUri(url);

            return () => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            };
        } else if (typeof rawHeroImage === 'string') {
            setHeroImageUri(rawHeroImage.startsWith('http') || rawHeroImage.startsWith('/') || rawHeroImage.startsWith('blob:') ? rawHeroImage : `/${rawHeroImage}`);
        } else if (Array.isArray(rawHeroImage) && rawHeroImage.length > 0) {
            const firstItem = rawHeroImage[0];
            if (firstItem.url || firstItem.thumbUrl) {
                setHeroImageUri(firstItem.url || firstItem.thumbUrl);
            } else if (firstItem.originFileObj) {
                const url = URL.createObjectURL(firstItem.originFileObj);
                setHeroImageUri(url);
                return () => URL.revokeObjectURL(url);
            } else {
                setHeroImageUri(null);
            }
        } else if (typeof rawHeroImage === 'object' && (rawHeroImage.url || rawHeroImage.thumbUrl)) {
            setHeroImageUri(rawHeroImage.url || rawHeroImage.thumbUrl);
        } else {
            setHeroImageUri(null);
        }
    }, [rawHeroImage]);

    const [displayPhotos, setDisplayPhotos] = React.useState([]);

    React.useEffect(() => {
        const urlsToCleanup = [];

        const localPreviews = (newPhotos || []).map(file => {
            if (file instanceof File || file instanceof Blob) {
                const url = URL.createObjectURL(file);
                urlsToCleanup.push(url);
                return { url, raw: file };
            }
            return null;
        }).filter(Boolean);

        const remotePhotos = (photos || []).map(url => ({
            url: url,
            raw: url
        }));

        setDisplayPhotos([...remotePhotos, ...localPreviews]);

        return () => {
            urlsToCleanup.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photos, newPhotos]);

    const handleSetHeroImage = (fileOrUrl) => {
        if (!form) return;
        form.setFieldValue('image', fileOrUrl);
    };

    const handleRemoveHeroImage = () => {
        if (!form) return;
        form.setFieldValue('image', null);
    };

    const handleAddPhotos = (newPhotosArr) => {
        if (!form) return;
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
        if (!form) return;
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        const updatedPhotos = (currentGallery.photos || []).filter(p => p !== photoToRemove);
        form.setFieldValue('gallery', { ...currentGallery, photos: updatedPhotos });

        const currentFiles = form.getFieldValue('new_photos') || [];
        const updatedFiles = currentFiles.filter(f => f !== photoToRemove);
        form.setFieldValue('new_photos', updatedFiles);
    };

    const handleMakeHero = (photoOrFile) => {
        handleSetHeroImage(photoOrFile);
    };

    const handleAddVideo = (videoObj) => {
        if (!form) return;
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        form.setFieldValue('gallery', {
            ...currentGallery,
            videos: [...(currentGallery.videos || []), videoObj]
        });
    };

    const handleRemoveVideo = (indexToRemove) => {
        if (!form) return;
        const currentGallery = form.getFieldValue('gallery') || { photos: [], videos: [] };
        form.setFieldValue('gallery', {
            ...currentGallery,
            videos: (currentGallery.videos || []).filter((_, index) => index !== indexToRemove)
        });
    };

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
