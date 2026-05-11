import React from 'react';
import { Settings, Calendar } from 'lucide-react';
import { Tabs, DatePicker } from 'antd';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import { useServiceReception } from './hooks/useServiceReception.jsx';

const ServiceReceptionPage = () => {
    const {
        t,
        activeTab,
        setActiveTab,
        selectedDate,
        setSelectedDate,
        breadcrumbItems,
        tabItems
    } = useServiceReception();

    return (
        <div className="w-full h-[calc(100vh-100px)] flex justify-center animate-in fade-in duration-500 overflow-hidden">
            <div className="w-full max-w-[1600px] flex flex-col h-full">
                {/* Standard Admin Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 w-full shrink-0">
                    <div>
                        <PageBreadcrumbs items={breadcrumbItems} />
                        <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mt-2 flex items-center gap-3">
                            {t('header_title', 'Quản lý Lịch dịch vụ')}
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 md:mt-0 w-full md:w-auto shrink-0">
                        <div className="bg-white dark:bg-[#1c1c1e] px-4 py-2 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-white/10 shadow-sm w-full sm:w-auto">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <DatePicker 
                                value={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                format="DD/MM/YYYY"
                                allowClear={false}
                                variant="borderless"
                                className="p-0 font-bold text-slate-800 dark:text-white hover:bg-transparent focus:shadow-none"
                            />
                        </div>

                        <button
                            type="button"
                            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-xl font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none w-full sm:w-auto shrink-0"
                        >
                            <Settings size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                            {t('header_settings', 'Cài đặt Bảng')}
                        </button>
                    </div>
                </div>

                {/* Tabs Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <Tabs 
                        activeKey={activeTab} 
                        onChange={setActiveTab} 
                        items={tabItems} 
                        className="h-full custom-admin-tabs"
                    />
                </div>
            </div>
        </div>
    );
};

export default ServiceReceptionPage;
