import React from 'react';
import { Form, Switch, Tooltip } from 'antd';
import { InfoCircleOutlined, StarOutlined } from '@ant-design/icons';

export const BrandPartnerSwitch = ({ t }) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20 mb-8">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <StarOutlined className="text-orange-500 text-lg" />
                    <span className="font-bold text-[15px] text-slate-800 dark:text-white">
                        {t('adminBrands:partnerToggleLbl', 'Thương Hiệu Đối Tác')}
                    </span>
                    <Tooltip title={t('adminBrands:partnerTooltip', 'Nếu bật, thương hiệu này sẽ được ưu tiên hiển thị logo trên Trang Chủ.')}>
                        <InfoCircleOutlined className="text-slate-400 cursor-help ml-1" />
                    </Tooltip>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    {t('adminBrands:partnerDesc', 'Hiển thị nổi bật ở khu vực Đối Tác Đồng Hành.')}
                </span>
            </div>
            
            <Form.Item 
                name="is_partner" 
                valuePropName="checked"
                className="m-0"
            >
                <Switch 
                    className="bg-slate-200 dark:bg-white/10 checked:bg-orange-500 hover:checked:bg-orange-400 focus:outline-none"
                />
            </Form.Item>
        </div>
    );
};
