import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import HeroImageBox from './components/HeroSection/HeroImageBox';
import PhotosGallery from './components/GallerySection/PhotosGallery';
import VideosManagement from './components/VideosSection/VideosManagement';

const MediaLibraryTab = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="w-full">
            <div className="mb-8">
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    {t('tabLibrary', 'Thư viện Ảnh & Video')}
                </p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                    {t('libraryTitle', 'Bộ Sưu Tập Đa Phương Tiện')}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 max-w-2xl leading-relaxed">
                    {t('libraryDesc', 'Quản lý hình ảnh và video giới thiệu xe. Ảnh chất lượng cao và video trực quan sẽ giúp tăng tỷ lệ chuyển đổi khách hàng đáng kể.')}
                </p>
            </div>

            <Form.Item name={['gallery', 'photos']} hidden />
            <Form.Item name={['gallery', 'videos']} hidden />
            <Form.Item name="image" hidden />

            <div className="grid grid-cols-12 gap-8">
                <HeroImageBox />

                <div className="col-span-12 lg:col-span-8 space-y-12">
                    <PhotosGallery />
                    <VideosManagement />
                </div>
            </div>
        </div>
    );
};

export default MediaLibraryTab;
