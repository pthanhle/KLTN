import { Upload, Spin } from 'antd';
import { Image as ImageIcon, CloudUpload } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableImageItem from './SortableImageItem';
import { useMediaGallery } from './hooks/useMediaGallery';

const { Dragger } = Upload;

const MediaGalleryCard = ({ control, name, t }) => {
    const {
        images,
        sensors,
        handleUpload,
        handleRemove,
        handleDragEnd,
        isUploading
    } = useMediaGallery(control, name, t);

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <ImageIcon className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:gallery')}
                </h3>
            </div>

            <Spin spinning={isUploading} tip={t('adminPartForm:uploading', 'Đang tải ảnh...')}>
                <Dragger
                    multiple={true}
                    showUploadList={false}
                    customRequest={({ onSuccess }) => {
                        setTimeout(() => onSuccess("ok"), 0);
                    }}
                    onChange={handleUpload}
                    disabled={isUploading}
                    className="[&_.ant-upload-drag]:!bg-slate-50 dark:[&_.ant-upload-drag]:!bg-[#1c1c1e] [&_.ant-upload-drag]:!border-2 [&_.ant-upload-drag]:!border-dashed [&_.ant-upload-drag]:!border-slate-300 dark:[&_.ant-upload-drag]:!border-white/20 [&_.ant-upload-drag]:hover:!border-yellow-500 disabled:[&_.ant-upload-drag]:!opacity-50"
                >
                    <div className="py-8 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                            <CloudUpload className="text-yellow-600 dark:text-yellow-500" size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-slate-800 dark:text-white font-bold">{t('adminPartForm:dragDrop')}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('adminPartForm:orClick')} {t('adminPartForm:uploadLimit')}</p>
                        </div>
                    </div>
                </Dragger>
            </Spin>

            {images.length > 0 && (
                <div className="mt-8">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
                        {t('adminPartForm:dragToReorder')}
                    </p>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={images} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <SortableImageItem
                                        key={img}
                                        id={img}
                                        imgUrl={img}
                                        index={idx}
                                        onRemove={handleRemove}
                                        t={t}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            )}
        </section>
    );
};

export default MediaGalleryCard;
