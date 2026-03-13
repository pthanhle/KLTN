import { Table, Pagination } from 'antd';
import { CustomerColumns } from './components/CustomerColumns';
import { CustomerHeader } from './components/CustomerHeader';
import { CustomerToolbar } from './components/CustomerToolbar';
import { useCustomers } from './hooks/useCustomers';

const CustomersPage = () => {
    const { t, breadcrumbItems, data, isLoading } = useCustomers();

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1400px]">

                <CustomerHeader t={t} breadcrumbItems={breadcrumbItems} />

                <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">

                    <CustomerToolbar t={t} />

                    <Table
                        loading={isLoading}
                        dataSource={data}
                        columns={CustomerColumns()}
                        pagination={false}
                        className="custom-admin-table"
                        scroll={{ x: 'max-content' }}
                    />

                    <div className="px-6 py-5 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400 gap-4">
                        <span className="font-medium">
                            {t('admin:customers.showing', { start: 1, end: 4, total: 48 })}
                        </span>
                        <Pagination
                            defaultCurrent={1}
                            total={50}
                            showSizeChanger={false}
                            className="dark:text-slate-400 font-semibold"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;
