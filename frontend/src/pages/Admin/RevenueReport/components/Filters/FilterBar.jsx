import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { PERIODS } from '../../constants/revenue.constants';

const { RangePicker } = DatePicker;

export const FilterBar = ({ period, onPeriodChange, dateRange, onDateRangeChange, selectedYear, onYearChange }) => {
    const { t } = useTranslation('adminRevenueReport');
    const currentYear = dayjs().year();
    const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i).map((y) => ({
        value: y,
        label: `${t('Năm')} ${y}`,
    }));

    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-slate-100 dark:bg-white/5 rounded-xl p-1 gap-1">
                {PERIODS.map((p) => (
                    <button
                        key={p.key}
                        onClick={() => onPeriodChange(p.key)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                            period === p.key
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                        {t(p.label)}
                    </button>
                ))}
            </div>

            {period === 'day' && (
                <RangePicker
                    value={dateRange}
                    onChange={onDateRangeChange}
                    format="DD/MM/YYYY"
                    allowClear
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                />
            )}

            {period === 'week' && (
                <RangePicker
                    value={dateRange}
                    onChange={onDateRangeChange}
                    picker="week"
                    allowClear
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                />
            )}

            {period === 'month' && (
                <Select
                    value={selectedYear}
                    onChange={onYearChange}
                    options={yearOptions}
                    style={{ width: 120 }}
                />
            )}
        </div>
    );
};
