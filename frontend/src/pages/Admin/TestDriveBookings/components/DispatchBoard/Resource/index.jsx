import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import StaffColumn from './StaffColumn';
import BookingSkeleton from '../../BookingSkeleton';

const ResourcePane = ({ staffList, isLoading, searchStaff, setSearchStaff, filterDate, setFilterDate, t, onTaskClick }) => {
    return (
        <section className="flex-1 min-w-0 h-full flex flex-col bg-transparent overflow-hidden relative">
            {/* Header */}
            <div className="h-[88px] px-6 flex justify-between items-center gap-4 bg-white dark:bg-transparent shrink-0 relative z-20 border-b border-slate-200 dark:border-white/5">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white shrink-0">
                    {t('adminTestDriveBookings:sales_staff', 'Nhân Viên Kinh Doanh')}
                </h3>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <DatePicker 
                        value={filterDate}
                        onChange={(date) => setFilterDate(date)}
                        format="DD/MM/YYYY"
                        allowClear
                        placeholder={t('adminTestDriveBookings:filter_date', 'Chọn ngày')}
                        className="h-[38px] rounded-full border-slate-200 dark:border-white/10 dark:bg-[#141416] dark:text-white dark:hover:border-yellow-500 [&_.ant-picker-input_input]:dark:text-white [&_.ant-picker-suffix]:dark:text-slate-400"
                        suffixIcon={<Calendar size={16} />}
                    />
                    <div className="relative w-full md:w-64 group">
                        <input 
                            className="bg-slate-50 dark:bg-[#141416] text-slate-800 dark:text-white text-sm rounded-full py-2 pl-10 pr-4 w-full border border-slate-200 dark:border-white/10 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all duration-300 placeholder:text-slate-400" 
                            placeholder={t('adminTestDriveBookings:search_staff_placeholder', 'Tìm kiếm nhân viên...')}
                            type="text"
                            value={searchStaff}
                            onChange={(e) => setSearchStaff(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500 transition-colors" size={18} />
                    </div>
                </div>
            </div>
            
            {/* Horizontal Scrolling Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 flex gap-6 pb-12 items-start relative z-10 custom-scrollbar">
                {isLoading ? (
                    <div className="flex gap-6 w-full">
                        <BookingSkeleton />
                    </div>
                ) : staffList.length > 0 ? (
                    staffList.map(staff => (
                        <StaffColumn key={staff._id} staff={staff} t={t} onTaskClick={onTaskClick} filterDate={filterDate} />
                    ))
                ) : (
                    <div className="w-full flex justify-center items-center h-full text-slate-500 dark:text-slate-400">
                        {t('adminTestDriveBookings:no_staff_found', 'Không tìm thấy nhân viên kinh doanh nào.')}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResourcePane;
