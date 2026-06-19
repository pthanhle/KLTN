import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { getRevenueTableColumns } from './columns';

export const RevenueDataTable = ({ timeSeries }) => {
    const { t } = useTranslation('adminRevenueReport');

    const columns = getRevenueTableColumns(t, timeSeries);

    const tableData = (timeSeries || []).map((item, i) => ({ ...item, key: i }));

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm">
            <header className="mb-5">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('Dữ liệu chi tiết')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {t('Tổng hợp {{count}} kỳ — có thể sắp xếp theo cột', { count: tableData.length })}
                </p>
            </header>
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 15, showSizeChanger: false, size: 'small' }}
                    size="small"
                    rowClassName="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                />
            </div>
        </section>
    );
};
