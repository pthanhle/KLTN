import { Input, Select, Button } from 'antd';
import { Search, PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STATUS_OPTIONS, FILTER_DEFAULT_VALUE } from '../../constants/carsConstants';

const FilterBar = ({
    brands = [],
    bodyStyles = [],
    searchTerm, setSearchTerm,
    filterBrand, setFilterBrand,
    filterBodyStyle, setFilterBodyStyle,
    filterStatus, setFilterStatus
}) => {
    const { t } = useTranslation('adminCars');

    return (
        <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-6 rounded-2xl mb-10 flex flex-wrap items-end gap-6 shadow-sm">
            <div className="flex-1 min-w-[300px]">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                    {t('searchLabel', 'Tìm kiếm sản phẩm')}
                </label>
                <Input
                    prefix={<Search className="text-slate-400 dark:text-[#d3c5ac]/40" size={16} />}
                    placeholder={t('searchPlaceholder', 'Tên xe hoặc mã SKU...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 rounded-full"
                />
            </div>

            <div className="w-48">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                    {t('brandLabel', 'Thương hiệu')}
                </label>
                <Select
                    value={filterBrand}
                    onChange={setFilterBrand}
                    className="w-full h-12"
                    options={[
                        { value: FILTER_DEFAULT_VALUE, label: t('all', 'Tất cả') },
                        ...brands
                    ]}
                />
            </div>

            <div className="w-48">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                    {t('bodyStyleLabel', 'Kiểu dáng')}
                </label>
                <Select
                    value={filterBodyStyle}
                    onChange={setFilterBodyStyle}
                    className="w-full h-12"
                    options={[
                        { value: FILTER_DEFAULT_VALUE, label: t('all', 'Tất cả') },
                        ...bodyStyles
                    ]}
                />
            </div>

            <div className="w-48">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac]/60 mb-2 ml-4">
                    {t('statusLabel', 'Trạng thái')}
                </label>
                <Select
                    value={filterStatus}
                    onChange={setFilterStatus}
                    className="w-full h-12"
                    options={[
                        { value: FILTER_DEFAULT_VALUE, label: t('all', 'Tất cả') },
                        ...STATUS_OPTIONS
                    ]}
                />
            </div>
        </div>
    );
};

export default FilterBar;
