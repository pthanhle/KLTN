import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloudUpload } from 'lucide-react';
import { Upload } from 'antd';

const { Dragger } = Upload;

const DragDropZone = ({ onUpload }) => {
    const { t } = useTranslation('adminCarForm');

    const handleCustomRequest = (options) => {
        onUpload();
        setTimeout(() => options.onSuccess('ok'), 500);
    };

    return (
        <Dragger 
            className="!bg-slate-50 !border-2 !border-dashed !border-slate-300 dark:!bg-[#1c1c1e]/50 hover:dark:!bg-[#1c1c1e]/80 dark:!border-[#4f4633]/30 !rounded-xl !p-0 transition-all cursor-pointer group/dropzone w-full"
            multiple={true}
            showUploadList={false}
            customRequest={handleCustomRequest}
        >
            <div className="p-10 flex flex-col items-center justify-center">
                <CloudUpload className="w-12 h-12 text-yellow-500/40 group-hover/dropzone:scale-110 group-hover/dropzone:text-yellow-500 transition-all mb-4" />
                <p className="text-sm text-center text-slate-500 dark:text-[#d3c5ac] leading-relaxed">
                    {t('uploaderDropText', 'Kéo và thả thư mục hình ảnh vào đây hoặc')} <span className="text-yellow-500 font-bold">{t('uploaderSelectFile', 'Chọn Tệp')}</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-4">
                    {t('uploaderSupportText', 'Hỗ trợ 36-72 khung hình (JPG/PNG)')}
                </p>
            </div>
        </Dragger>
    );
};

export default DragDropZone;
