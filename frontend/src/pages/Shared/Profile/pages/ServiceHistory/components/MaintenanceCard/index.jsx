import { Button, Rate, Tag } from 'antd';
import { useMaintenanceCard } from '../../hooks/useMaintenanceCard';
import ServiceProgressSteps from './ServiceProgressSteps';
import ServiceGallery from './ServiceGallery';
import { Link } from 'react-router-dom';

const MaintenanceCard = ({ service, index, t }) => {
    const { isCompleted, isInProgress, renderPrice, formattedOdo } = useMaintenanceCard(service);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-[32px] p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:border-slate-200 dark:hover:border-white/10 transition-colors">
            {/* Watermark Index */}
            <div className="absolute top-0 right-0 p-4 pointer-events-none">
                <span className="text-[100px] font-black text-slate-50 dark:text-white/[0.02] absolute -top-8 -right-4 select-none group-hover:scale-105 transition-transform duration-500">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <p className="text-yellow-600 dark:text-yellow-500 font-bold text-xs uppercase tracking-widest">{service.vehicle_info.brand}</p>
                            <Tag className="m-0 border-0 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold tracking-widest uppercase text-[10px]">
                                {service.service_type === 'MAINTENANCE' ? t('service_type_maintenance', 'Bảo dưỡng') : 
                                 service.service_type === 'CAR_SPA' ? t('service_type_car_spa', 'Chăm sóc - Làm đẹp') : 
                                 t('service_type_repair', 'Sửa chữa')}
                            </Tag>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a0a0b] dark:text-white uppercase italic tracking-tight">{service.vehicle_info.model} - {service.vehicle_info.license_plate}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                        <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('service_lbl_odo', 'Số ODO')}
                        </p>
                        <p className="sm:text-lg font-black text-slate-900 dark:text-white">{formattedOdo} KM</p>
                    </div>
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                        <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('service_lbl_advisor', 'Cố vấn dịch vụ')}
                        </p>
                        <p className="sm:text-lg font-black text-slate-900 dark:text-white truncate">{service.advisor_info?.name || 'Chưa phân bổ'}</p>
                    </div>
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                        <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('service_lbl_mechanic', 'Kỹ thuật viên')}
                        </p>
                        <p className="sm:text-lg font-black text-slate-900 dark:text-white truncate">{service.mechanic_info?.name || 'Chưa phân bổ'}</p>
                    </div>
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                        <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('service_lbl_cost', 'Tổng chi phí')}
                        </p>
                        <p className="text-sm sm:text-lg font-black text-slate-900 dark:text-white">
                            {renderPrice(service.total_cost)}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white border-l-4 border-yellow-500 pl-3">
                        {t('service_lbl_tasks', 'Nội dung thực hiện')}
                    </h4>
                    <ul className="space-y-3 text-[13px] sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                        {(service.services || []).map((task, i) => (
                            <li key={task.service_id || i} className="flex items-start sm:items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full flex-shrink-0 mt-1.5 sm:mt-0"></span> {task.service_name || task.name || task}
                            </li>
                        ))}
                    </ul>
                </div>



                <ServiceGallery attachments={service.attachments} t={t} />

                <ServiceProgressSteps isCompleted={isCompleted} isInProgress={isInProgress} t={t} />

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Button
                        type="default"
                        className="flex-1 !h-[48px] !border-slate-200 dark:!border-white/10 !bg-[#f8fafc] dark:!bg-[#0a0a0b] !text-slate-900 dark:!text-white !font-bold !rounded-2xl hover:!border-slate-300 hover:dark:!border-white/20 hover:!bg-white hover:dark:!bg-white/5 transition-all uppercase tracking-widest text-[11px] sm:text-xs shadow-none"
                    >
                        {t('service_btn_rebook', 'ĐẶT LẠI DỊCH VỤ')}
                    </Button>

                    <Link to={`/profile/services/${service.booking_code}`} className="flex-1 w-full m-0 p-0 block">
                        <Button
                            type="primary"
                            className="w-full !h-[48px] !border-0 !bg-slate-900 dark:!bg-white !text-white dark:!text-slate-900 !font-bold !rounded-2xl hover:opacity-90 transition-all uppercase tracking-widest text-[11px] sm:text-xs shadow-none"
                        >
                            {t('service_btn_detail', 'XEM BÁO GIÁ & CHI TIẾT')}
                        </Button>
                    </Link>

                    {isCompleted && service.rating === null && (
                        <Button 
                            type="primary"
                            className="flex-1 !h-[48px] !bg-yellow-500 !text-slate-900 !font-black hover:!bg-yellow-400 !border-0 !rounded-2xl transition-colors shadow-[0_4px_12px_rgba(234,179,8,0.2)] uppercase tracking-widest text-[11px] sm:text-xs"
                        >
                            {t('service_btn_rating', 'Đánh giá dịch vụ')}
                        </Button>
                    )}

                    {isCompleted && service.rating !== null && (
                        <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl h-[48px]">
                            <Rate disabled defaultValue={service.rating} className="text-yellow-500 text-sm" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaintenanceCard;
