import { Table } from 'antd';

export const QuotationPartsTable = ({ parts, formatCurrency, t }) => {
    const columns = [
        {
            title: t('quote_col_stt', 'STT'),
            key: 'stt',
            align: 'center',
            width: 60,
            render: (_, __, index) => <span className="text-slate-400">{String(index + 1).padStart(2, '0')}</span>,
        },
        {
            title: t('quote_col_code', 'Mã Phụ Tùng'),
            dataIndex: 'sku',
            key: 'sku',
            width: 120,
            render: (text) => <span className="font-mono text-[10px] text-slate-500 uppercase">{text}</span>,
        },
        {
            title: t('quote_col_name', 'Tên Sản Phẩm'),
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-medium text-slate-900 dark:text-slate-100">{text}</span>,
        },
        {
            title: t('quote_col_qty', 'SL'),
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 80,
        },
        {
            title: t('quote_col_price', 'Đơn Giá'),
            dataIndex: 'unit_price',
            key: 'unit_price',
            align: 'right',
            width: 120,
            render: (val) => formatCurrency(val),
        },
        {
            title: t('quote_col_total', 'Thành Tiền'),
            dataIndex: 'total_price',
            key: 'total_price',
            align: 'right',
            width: 140,
            render: (val) => (
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {formatCurrency(val)}
                </span>
            ),
        },
    ];

    return (
        <section className="mb-10 w-full overflow-x-auto" data-purpose="spare-parts-list">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4 border-l-4 border-yellow-500 pl-3 text-slate-800 dark:text-slate-100">
                {t('quote_table_parts', 'I. PHỤ TÙNG & VẬT TƯ')}
            </h3>
            <div className="min-w-[600px] rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table 
                    dataSource={parts}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    className="[&_.ant-table]:!bg-transparent [&_.ant-table-thead>tr>th]:!bg-slate-100 dark:[&_.ant-table-thead>tr>th]:!bg-slate-700 [&_.ant-table-thead>tr>th]:!text-slate-600 dark:[&_.ant-table-thead>tr>th]:!text-slate-300 [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-cell]:!border-b [&_.ant-table-cell]:!border-slate-100 dark:[&_.ant-table-cell]:!border-slate-700 hover:[&_.ant-table-tbody>tr>td]:!bg-slate-50 dark:hover:[&_.ant-table-tbody>tr>td]:!bg-slate-700/50 [&_.ant-table-tbody>tr>td]:!bg-white dark:[&_.ant-table-tbody>tr>td]:!bg-slate-800"
                />
            </div>
        </section>
    );
};

export default QuotationPartsTable;
