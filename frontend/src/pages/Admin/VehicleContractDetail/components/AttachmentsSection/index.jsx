import React from 'react';
import { useTranslation } from 'react-i18next';
import { PaperClipOutlined } from '@ant-design/icons';
import { UploadZone } from './UploadZone';
import { FileList } from './FileList';
import { useAttachments } from '../../hooks/useAttachments';

export const AttachmentsSection = ({ contract }) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const { customRequest, isUploading, handleRemove } = useAttachments(contract._id, contract.attachments);
    const canUpload = !['cancelled', 'delivered'].includes(contract.status);
    const canDelete = ['draft', 'issued'].includes(contract.status);
    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <PaperClipOutlined className="text-xl text-indigo-500" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-slate-800 dark:text-white">
                        {t('Chứng từ đính kèm')}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {t('Bản scan hợp đồng có chữ ký, ủy nhiệm chi, giấy tờ liên quan')}
                    </p>
                </div>
            </div>

            {canUpload && (
                <UploadZone
                    customRequest={customRequest}
                    isUploading={isUploading}
                />
            )}

            <FileList
                attachments={contract.attachments}
                onRemove={handleRemove}
                disabled={!canDelete}
            />
        </div>
    );
};
