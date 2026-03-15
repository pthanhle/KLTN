import { BriefcaseBusiness, ShieldCheck, Clock } from 'lucide-react';

const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const EmployeeInfo = ({ employeeInfo, t }) => {
    if (!employeeInfo) return null;

    const formatDate = (dateString) => {
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    return (
        <div className="relative mt-8 bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
            {/* Accent Line Left */}
            <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-yellow-500 rounded-r-full"></div>
            
            <div className="flex flex-col h-full pl-2">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                        <BriefcaseBusiness size={20} className="text-yellow-500" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">{t('employee_title', 'Thông Tin Nhân Viên')}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-[#0a0a0b] p-5 rounded-2xl flex flex-col justify-center">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('employee_position', 'CHỨC VỤ')}</span>
                        <span className="text-[15px] font-black text-slate-800 dark:text-white leading-snug">{employeeInfo.position}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#0a0a0b] p-5 rounded-2xl flex flex-col justify-center">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('employee_salary', 'MỨC LƯƠNG')}</span>
                        <span className="text-[15px] font-black text-slate-800 dark:text-white leading-snug">{formatVND(employeeInfo.salary)}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#0a0a0b] p-5 rounded-2xl flex flex-col justify-center">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t('employee_hired_date', 'NGÀY GIA NHẬP')}</span>
                        <span className="text-[15px] font-black text-slate-800 dark:text-white leading-snug">{formatDate(employeeInfo.hired_date)}</span>
                    </div>
                </div>

                <div className="w-full border-t border-dashed border-slate-200 dark:border-white/10 my-6"></div>
                
                <div className="flex items-center gap-6 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-green-500" />
                        <span>{t('employee_verified', 'Đã xác thực danh tính')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{t('employee_workingTime', 'Thời gian làm việc: >1 năm')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeInfo;
