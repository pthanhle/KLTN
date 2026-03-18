import { AlertTriangle } from 'lucide-react';
import { Button } from 'antd';

const MaintenanceAlert = ({ nextDate, t }) => {
    return (
        <div className="bg-yellow-500 text-[#0a0a0b] p-4 lg:p-5 rounded-[20px] lg:rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between shadow-[0_8px_30px_rgba(234,179,8,0.25)] gap-4">
            <div className="flex items-center gap-3">
                <AlertTriangle size={24} className="flex-shrink-0" />
                <span className="font-bold text-sm sm:text-[15px]">
                    {t('service_alert_msg', 'Lịch bảo dưỡng định kỳ tiếp theo khuyến nghị vào:')} {nextDate}
                </span>
            </div>
            <Button 
                type="primary"
                className="!h-10 !px-5 !rounded-xl !bg-[#0a0a0b] !text-white !font-bold !border-0 hover:!opacity-80 transition-opacity w-full sm:w-auto shadow-none"
            >
                {t('service_btn_book_now', 'ĐẶT LỊCH NGAY')}
            </Button>
        </div>
    );
};

export default MaintenanceAlert;
