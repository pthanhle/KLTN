import { Table, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCarsTableColumns } from './hooks/useCarsTableColumns';

const CarsTable = ({ cars, loading, selectedKeys, toggleSelection, toggleAllSelections, handleToggleDemo, handleToggleFeatured }) => {
    const { t } = useTranslation('adminCars');
    const { columns } = useCarsTableColumns(handleToggleDemo, handleToggleFeatured);

    const rowSelection = {
        selectedRowKeys: selectedKeys,
        onChange: (newSelectedRowKeys) => {
        },
        onSelect: (record, selected) => toggleSelection(record.id),
        onSelectAll: (selected, selectedRows, changeRows) => toggleAllSelections(!selected)
    };

    if (loading && cars.length === 0) {
        return (
            <div className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm p-8">
                <Skeleton active paragraph={{ rows: 6 }} className="mt-4" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <Table
                loading={loading}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={cars}
                rowKey="id"
                scroll={{ x: 1360 }}
                pagination={{
                    pageSize: 10,
                    total: cars.length,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    showTotal: (total, range) => `${t('show', 'Hiển thị')} ${range[0]} - ${range[1]} ${t('of', 'của')} ${total} ${t('cars', 'xe')}`,
                    className: '!mt-2 !mb-0 !pt-4 !pb-4 !px-6 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5'
                }}
                rowClassName={() => "group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"}
                className="
                    custom-dark-table w-full whitespace-nowrap 
                    [&_.ant-table]:!bg-transparent 

                    /* Header Base */
                    [&_.ant-table-thead_th]:!bg-[#f8fafc] 
                    dark:[&_.ant-table-thead_th]:!bg-[#141416] 
                    [&_.ant-table-thead_th]:!text-slate-500 
                    [&_.ant-table-thead_th]:!font-bold 
                    [&_.ant-table-thead_th]:!uppercase 
                    [&_.ant-table-thead_th]:!text-[10px] 
                    [&_.ant-table-thead_th]:!tracking-wider 
                    [&_.ant-table-thead_th]:!px-4
                    
                    /* Header Hover & Sorter */
                    [&_.ant-table-thead>tr>th:hover]:!bg-slate-100 
                    dark:[&_.ant-table-thead>tr>th:hover]:!bg-white/[0.04]
                    [&_.ant-table-column-sort]:!bg-slate-100
                    dark:[&_.ant-table-column-sort]:!bg-white/[0.04]
                    dark:[&_.ant-table-column-sorter-inner]:text-slate-500
                    dark:[&_.ant-table-column-sorter-up.active]:text-yellow-500
                    dark:[&_.ant-table-column-sorter-down.active]:text-yellow-500
                "
            />
        </div>
    );
};

export default CarsTable;
