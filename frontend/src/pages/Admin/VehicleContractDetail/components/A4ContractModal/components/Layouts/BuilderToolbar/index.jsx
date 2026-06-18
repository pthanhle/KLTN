import React from 'react';
import { Button, Space, Switch } from 'antd';
import { Printer, Save, ArrowLeft, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BuilderToolbar = ({ contractId, isEditMode, toggleEditMode, onSave, onPrint, isSaving, onClose }) => {
    const { t } = useTranslation('adminVehicleContractBuilder');

    return (
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#141416]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-4">
                <Button 
                    type="text" 
                    icon={<ArrowLeft size={18} />} 
                    onClick={onClose}
                >
                    {t('Trở về')}
                </Button>
                <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
                <span className="font-semibold text-slate-800 dark:text-white">
                    {t('Xây dựng Hợp đồng')}
                </span>
            </div>
            
            <Space size="middle">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10">
                    <Edit3 size={16} className={isEditMode ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">
                        {isEditMode ? t('Chỉnh sửa văn bản') : t('Chế độ xem trước')}
                    </span>
                    <Switch checked={isEditMode} onChange={toggleEditMode} size="small" />
                </div>
                
                {isEditMode && (
                    <Button 
                        type="primary" 
                        icon={<Save size={16} />} 
                        onClick={onSave}
                        loading={isSaving}
                    >
                        {t('Lưu thay đổi')}
                    </Button>
                )}
                
                <Button 
                    icon={<Printer size={16} />} 
                    onClick={onPrint}
                >
                    {t('In Hợp đồng')}
                </Button>
            </Space>
        </div>
    );
};
