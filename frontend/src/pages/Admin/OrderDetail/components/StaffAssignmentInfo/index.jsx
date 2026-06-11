import React from 'react';
import { Image } from 'antd';
import { UserCog, Tag, Phone, RefreshCw, UserPlus } from 'lucide-react';
import { mockStaffData } from '../../../Staff/data/mockStaffData';

export const StaffAssignmentInfo = ({ assignment, t, onReassign, orderStatus }) => {
    const hasStaff = assignment?.assigned_staff_id;
    const canAssign = ['CONFIRMED', 'PROCESSING'].includes(orderStatus);

    if (!hasStaff) {
        if (!canAssign) return null;
        return (
            <section className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5 mt-8 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                    <UserCog size={16} className="text-yellow-600 dark:text-yellow-500" />
                    <h3 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                        {t('staff_assigned_title', 'Nhân viên phụ trách đóng gói')}
                    </h3>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center gap-3 text-center">
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                        {t('no_staff_assigned', 'Chưa có nhân viên được phân công')}
                    </p>
                    <button
                        onClick={onReassign}
                        className="px-5 py-2 rounded-xl bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center gap-2"
                    >
                        <UserPlus size={14} />
                        {t('assign_now_btn', 'Phân công ngay')}
                    </button>
                </div>
            </section>
        );
    }

    const staffId = typeof assignment.assigned_staff_id === 'object'
        ? assignment.assigned_staff_id._id
        : assignment.assigned_staff_id;

    const staff = typeof assignment.assigned_staff_id === 'object'
        ? assignment.assigned_staff_id
        : mockStaffData.find(s => s._id === staffId || s.employeeId === staffId) || {
            fullName: t('unknown_staff', 'Nhân viên không xác định'),
            employeeId: staffId,
            department: t('department_logistics', 'Logistics'),
            phone: t('not_available', 'N/A'),
            avatarUrl: `https://ui-avatars.com/api/?name=Staff`
        };

    const assignedDate = assignment?.assigned_at ? new Date(assignment.assigned_at).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN');

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5 mt-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity opacity-50 group-hover:opacity-100 duration-500"></div>

            <div className="flex items-center gap-2 mb-5">
                <UserCog size={16} className="text-yellow-600 dark:text-yellow-500" />
                <h3 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                    {t('staff_assigned_title', 'Nhân viên phụ trách đóng gói')}
                </h3>
            </div>

            <div className="flex flex-col gap-5 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm flex-shrink-0">
                            <Image
                                src={staff.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.fullName)}&background=random`}
                                alt={staff.fullName}
                                className="w-full h-full object-cover"
                                fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(staff.fullName)}&background=random`}
                                preview={false}
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#141416] rounded-full"></div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                                {staff.fullName}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#202022] border border-slate-200 dark:border-white/5 text-[9px] font-bold uppercase tracking-widest text-slate-600 dark:text-yellow-600">
                                {staff.department || t('department_logistics', 'Logistics')}
                            </span>
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                            {assignedDate}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-[#1a1a1c] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-1.5 flex-1 justify-center">
                        <Tag size={14} className="text-slate-400" />
                        <span className="font-medium text-xs">{staff.employeeId}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-1.5 flex-1 justify-center">
                        <Phone size={14} className="text-slate-400" />
                        <span className="font-medium text-xs">{staff.phone || t('not_available', 'N/A')}</span>
                    </div>
                </div>

                {canAssign && (
                    <button
                        onClick={onReassign}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-yellow-500/10 text-slate-700 dark:text-yellow-500 text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-yellow-500/20 hover:bg-slate-200 dark:hover:bg-yellow-500/20 hover:text-slate-900 dark:hover:text-yellow-400 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <RefreshCw size={14} />
                        {t('reassign_btn', 'Phân công lại')}
                    </button>
                )}
            </div>
        </section>
    );
};
