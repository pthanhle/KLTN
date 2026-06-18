import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilePdfOutlined, PictureOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip, Image } from 'antd';

export const FileList = ({ attachments, onRemove, disabled }) => {
    const { t } = useTranslation('adminVehicleContractDetail');

    if (!attachments || attachments.length === 0) return null;

    const isImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;
    };

    return (
        <div className="flex flex-col gap-3 mt-4">
            {attachments.map((url, index) => {
                const isImg = isImage(url);
                let fileName = `${t('Chứng từ đính kèm')} ${index + 1}`;
                const match = url.match(/image-(\d{13})/);
                if (match) {
                    const date = new Date(parseInt(match[1]));
                    const timeString = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                    const dateString = date.toLocaleDateString('vi-VN');
                    fileName = `${t('Bản scan')} - ${timeString} ${dateString}`;
                }
                return (
                    <div 
                        key={url} 
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#141416] border border-slate-100 dark:border-white/5 group"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            {isImg ? (
                                <div className="shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-100 dark:bg-white/5">
                                    <Image 
                                        src={url} 
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                        preview={{
                                            mask: <EyeOutlined />
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-red-100 dark:bg-red-500/20 text-red-600">
                                    <FilePdfOutlined className="text-lg" />
                                </div>
                            )}
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                                {fileName}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!isImg && (
                                <Tooltip title={t('Tải xuống/Xem')}>
                                    <a 
                                        href={url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
                                    >
                                        <EyeOutlined />
                                    </a>
                                </Tooltip>
                            )}
                            
                            {!disabled && (
                                <Popconfirm
                                    title={t('Xóa file này?')}
                                    onConfirm={() => onRemove(url)}
                                    okText={t('Xóa')}
                                    cancelText={t('Hủy')}
                                    okButtonProps={{ danger: true }}
                                >
                                    <Tooltip title={t('Xóa file')}>
                                        <button className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-500 transition-colors">
                                            <DeleteOutlined />
                                        </button>
                                    </Tooltip>
                                </Popconfirm>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
