import React from 'react';
import { Input, Select, DatePicker } from 'antd';
import { Search, Filter, Calendar, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONTRACT_STATUS_OPTIONS } from '../../constants/contract.constants.jsx';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ContractToolbar = ({ 
    searchTerm, onSearch, 
    statusFilter, onStatusFilter,
    dateRange, onDateRange,
    salesId, onSalesId,
    staffList, isLoadingStaff 
}) => {
    const { t } = useTranslation('adminVehicleContracts');

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-[#141416] p-4 rounded-2xl border border-slate-200 dark:border-white/5 mb-8 shadow-sm gap-4">
            <div className="w-full lg:w-1/3 relative">
                <Input
                    prefix={<Search className="text-slate-400 dark:text-slate-500 ml-2 mr-1" size={18} />}
                    placeholder={t('Tìm kiếm Hợp đồng, Số VIN, Khách hàng...')}
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full h-12 bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-300 dark:hover:border-white/10 focus:border-yellow-500 dark:focus:border-yellow-500 rounded-xl text-slate-700 dark:text-white"
                />
            </div>

            <div className="flex flex-wrap w-full lg:w-auto gap-4">
                <RangePicker 
                    value={dateRange}
                    onChange={onDateRange}
                    className="w-full lg:w-64 h-12 custom-datepicker"
                    format="DD/MM/YYYY"
                    placeholder={[t('Từ ngày'), t('Đến ngày')]}
                    suffixIcon={<Calendar size={16} />}
                />

                <Select
                    value={salesId}
                    onChange={onSalesId}
                    className="w-full lg:w-48 h-12 custom-select"
                    suffixIcon={<Users size={16} />}
                    loading={isLoadingStaff}
                    showSearch
                    optionFilterProp="children"
                >
                    <Option value="all">{t('Tất cả nhân viên')}</Option>
                    {staffList?.map(staff => (
                        <Option key={staff._id} value={staff._id}>{staff.fullName || staff.full_name || staff.email}</Option>
                    ))}
                </Select>

                <Select
                    value={statusFilter}
                    onChange={onStatusFilter}
                    className="w-full lg:w-40 h-12 custom-select"
                    suffixIcon={<Filter size={16} />}
                >
                    {CONTRACT_STATUS_OPTIONS.map(option => (
                        <Option key={option.value} value={option.value}>
                            {t(option.labelKey)}
                        </Option>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default ContractToolbar;
