import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

const SubmitButton = ({ isSearching }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="pt-4">
            <Button 
                htmlType="submit"
                loading={isSearching}
                className="group relative !w-full !h-[60px] !bg-gradient-to-br from-yellow-400 to-yellow-600 !border-0 !text-[#0A0A0B] font-black !rounded-full !shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:!shadow-[0_15px_40px_rgba(234,179,8,0.5)] active:!scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:!text-[#0A0A0B] hover:-translate-y-0.5"
            >
                <div className="flex items-center gap-2 z-10 relative">
                    <span className="text-[13px] uppercase tracking-[0.2em] font-black">
                        {isSearching ? t('btn_processing', 'Đang Xử Lý...') : t('btn_track_now', 'Tra Cứu Ngay')}
                    </span>
                    {!isSearching && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
            </Button>
        </div>
    );
};

export default SubmitButton;
