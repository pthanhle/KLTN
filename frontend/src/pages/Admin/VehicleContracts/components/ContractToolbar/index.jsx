import React from 'react';
import { Input, Select } from 'antd';
import { Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const ContractToolbar = ({ searchTerm, onSearch, statusFilter, onStatusFilter }) => {
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

            <div className="flex w-full lg:w-auto gap-4">
                <Select
                    value={statusFilter}
                    onChange={onStatusFilter}
                    className="w-full lg:w-48 h-12 custom-select"
                    suffixIcon={<Filter size={16} />}
                >
                    <Option value="all">{t('Tất cả')}</Option>
                    <Option value="pending_approval">{t('Chờ duyệt')}</Option>
                    <Option value="approved">{t('Đã duyệt')}</Option>
                    <Option value="paid">{t('Đã thanh toán')}</Option>
                    <Option value="delivered">{t('Đã giao xe')}</Option>
                    <Option value="cancelled">{t('Đã hủy')}</Option>
                </Select>
            </div>
        </div>
    );
};

export default ContractToolbar;
