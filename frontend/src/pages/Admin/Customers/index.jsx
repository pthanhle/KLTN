import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import { CustomerHeader } from './components/CustomerHeader';
import { CustomerToolbar } from './components/CustomerToolbar';
import { CustomerStats } from './components/CustomerStats';
import { CustomerSelectionBar } from './components/CustomerSelectionBar';
import { CustomerFormModal } from './components/CustomerFormModal';
import { getCustomerColumns } from './constants/customerColumns';
import { useCustomers } from './hooks/useCustomers';
import { withSkeletonColumns, generateSkeletonData } from './utils/withSkeleton';
import { useNavigate } from 'react-router-dom';

const CustomersPage = () => {
    const navigate = useNavigate();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const { 
        t, breadcrumbItems, data, stats, pagination, isLoading, handlePaginationChange,
        filters, handleFilterChange,
        selectedRowKeys, handleSelectChange, handleClearSelection, handleBulkAction,
        refetch,
    } = useCustomers();

    const startRecord = (pagination.currentPage - 1) * pagination.pageSize + 1;
    const endRecord = Math.min(pagination.currentPage * pagination.pageSize, pagination.total);

    return (
        <div className="w-full flex justify-center pb-20">
            <div className="w-full max-w-[1400px]">

                <CustomerHeader 
                    t={t} 
                    breadcrumbItems={breadcrumbItems} 
                    onAddCustomer={() => { setEditingCustomer(null); setIsFormOpen(true); }}
                />

                <CustomerStats stats={stats} isLoading={isLoading} t={t} />

                <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden relative">

                    <CustomerToolbar t={t} filters={filters} onFilterChange={handleFilterChange} />

                    <Table
                        loading={false}
                        dataSource={isLoading ? generateSkeletonData(10) : data}
                        rowKey="id"
                        columns={withSkeletonColumns(getCustomerColumns(
                            t, 
                            (record) => navigate(`/admin/customers/${record.id}`),
                            (record) => { setEditingCustomer(record); setIsFormOpen(true); }
                        ))}
                        pagination={false}
                        className="custom-admin-table"
                        scroll={{ x: 'max-content' }}
                        rowSelection={{
                            selectedRowKeys: isLoading ? [] : selectedRowKeys,
                            onChange: handleSelectChange,
                            columnWidth: 60,
                            getCheckboxProps: (record) => ({
                                disabled: record.isSkeleton,
                            })
                        }}
                    />

                    <div className="px-6 py-5 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400 gap-4">
                        <span className="font-medium">
                            {t('adminCustomers:showingText', { start: startRecord, end: endRecord, total: pagination.total, defaultValue: `Hiển thị ${startRecord}-${endRecord} trên tổng số ${pagination.total}` })}
                        </span>
                        <Pagination
                            current={pagination.currentPage}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            onChange={handlePaginationChange}
                            showSizeChanger={false}
                            className="dark:text-slate-400 font-semibold"
                        />
                    </div>
                </div>

                <CustomerSelectionBar 
                    t={t}
                    selectedCount={selectedRowKeys.length} 
                    onClear={handleClearSelection}
                    onAction={handleBulkAction}
                />
                
                <CustomerFormModal 
                    t={t}
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    customer={editingCustomer}
                    onSuccess={refetch}
                />
            </div>
        </div>
    );
};

export default CustomersPage;
