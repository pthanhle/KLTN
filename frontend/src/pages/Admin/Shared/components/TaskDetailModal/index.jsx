import React from 'react';
import { X, Clock, User, Car, FileText, AlertCircle, MapPin, Building } from 'lucide-react';
import { useTaskDetailModalLogic } from './hooks/useTaskDetailModalLogic';
import { useLockBodyScroll } from '../../../../Admin/StaffDetail/components/Tabs/PerformanceTab/hooks/useLockBodyScroll';

export const TaskDetailModal = ({ task, onClose }) => {
    // Prevent body scroll when modal is open
    useLockBodyScroll(true);

    const {
        isReady,
        isClosing,
        handleClose,
        pStyles,
        translatedPriority,
        t,
        isHighPriority
    } = useTaskDetailModalLogic(task, onClose);

    if (!isReady) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            ></div>

            {/* Modal Panel */}
            <div className={`relative w-full max-w-2xl bg-white dark:bg-[#141416] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] transition-all duration-200 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex items-start justify-between bg-slate-50/50 dark:bg-white/5">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-slate-200 dark:bg-[#2e3447] text-slate-700 dark:text-gray-300 font-mono text-xs font-bold px-2.5 py-1 rounded-md tracking-widest uppercase">
                                {task.id}
                            </span>
                            {task.priority && (
                                <span className={`${pStyles.split(' ').slice(0, 2).join(' ')} font-medium uppercase tracking-widest text-[10px] px-2 py-1 rounded flex items-center gap-1 border`}>
                                    {isHighPriority && <AlertCircle size={10} />}
                                    {translatedPriority} - {t('adminStaffDetail:perf_kanban_priority')}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                            {task.title}
                        </h3>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="p-2 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 rounded-full text-slate-500 dark:text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column: Customer & Vehicle Info */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
                                    <User size={12} />
                                    {t('adminStaffDetail:modal_client_info', 'Thông tin Khách hàng')}
                                </h4>
                                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_name', 'Họ tên')}:</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{task.customerName || t('adminStaffDetail:modal_not_available')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_phone', 'SĐT')}:</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{task.customerPhone || t('adminStaffDetail:modal_not_available')}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
                                    <Car size={12} />
                                    {t('adminStaffDetail:modal_vehicle_info', 'Thông tin Xe')}
                                </h4>
                                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_license', 'Biển số')}:</span>
                                        <span className="text-sm font-mono font-bold text-slate-800 dark:text-white bg-white dark:bg-[#1c1c1e] px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 uppercase tracking-wider">
                                            {task.licensePlate || t('adminStaffDetail:modal_not_available')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_model', 'Dòng xe')}:</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{task.vehicleModel || t('adminStaffDetail:modal_not_available')}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {task.locationType && (
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
                                        {task.locationType === 'HOME' ? <MapPin size={12} className="text-red-500" /> : <Building size={12} className="text-blue-500" />}
                                        {t('adminStaffDetail:modal_location_info', 'Địa điểm trải nghiệm')}
                                    </h4>
                                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5 space-y-3">
                                        {task.locationType === 'HOME' ? (
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                    {t('adminStaffDetail:modal_home', 'Tận nhà')}
                                                </span>
                                                <span className="text-sm text-slate-500 dark:text-gray-400 mt-1">{task.address}</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    {t('adminStaffDetail:modal_showroom', 'Tại Showroom')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Task Status & Details */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
                                    <Clock size={12} />
                                    {t('adminStaffDetail:modal_timing', 'Thời gian & Tiến độ')}
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_appointment_date', 'Ngày hẹn')}:</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{task.appointmentDate || t('adminStaffDetail:date_today', 'Hôm nay')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_appointment', 'Giờ hẹn')}:</span>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{task.appointmentTime || t('adminStaffDetail:modal_not_available')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-gray-400">SLA:</span>
                                        <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">{task.sla || t('adminStaffDetail:modal_not_available')}</span>
                                    </div>
                                    
                                    {task.progress !== undefined && (
                                        <div className="pt-2">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-xs font-medium text-slate-500 dark:text-gray-400">{t('adminStaffDetail:modal_task_progress')}</span>
                                                <span className="text-xs font-bold text-slate-800 dark:text-white">{task.progress}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 rounded-full transition-all duration-1000" style={{ width: `${task.progress}%` }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
                                    <FileText size={12} />
                                    {t('adminStaffDetail:modal_notes', 'Ghi chú / Mô tả')}
                                </h4>
                                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5 min-h-[100px]">
                                    <p className="text-sm text-slate-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {task.description || t('adminStaffDetail:modal_no_notes', 'Không có ghi chú bổ sung.')}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex justify-end gap-3">
                    <button 
                        onClick={handleClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        {t('adminStaffDetail:btn_close', 'Đóng')}
                    </button>
                </div>

            </div>
        </div>
    );
};
