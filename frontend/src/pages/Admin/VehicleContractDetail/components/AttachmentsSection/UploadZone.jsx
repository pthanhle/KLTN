import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;

export const UploadZone = ({ customRequest, isUploading, disabled }) => {
    const { t } = useTranslation('adminVehicleContractDetail');

    return (
        <Dragger 
            customRequest={customRequest}
            showUploadList={false}
            disabled={disabled || isUploading}
            className="bg-slate-50 dark:bg-[#141416] border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all rounded-2xl"
        >
            <div className="py-6 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
                    {isUploading ? <LoadingOutlined /> : <InboxOutlined />}
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700 dark:text-white mb-1">
                        {t('Kéo thả hoặc click để tải lên bản Scan Hợp Đồng')}
                    </p>
                    <p className="text-xs text-slate-500">
                        {t('Hỗ trợ PDF, PNG, JPG. Tối đa 10MB.')}
                    </p>
                </div>
            </div>
        </Dragger>
    );
};
