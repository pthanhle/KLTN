import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../../utils/axiosClient';
import ContractTable from '../../../Contracts/components/Table/ContractTable';
import ContractCreateModal from '../../../Contracts/components/ContractCreateModal';

export const CustomerContractsTab = ({ customerId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [sortData, setSortData] = useState({ sort: 'createdAt', order: 'desc' });

    const fetchContracts = async (page = 1, sorter = sortData) => {
        setLoading(true);
        try {
            const orderParam = sorter.order === 'ascend' ? 'asc' : 'desc';
            const sortParam = sorter.field || 'createdAt';

            const res = await axiosClient.get(`/admin/contracts?page=${page}&limit=${pagination.pageSize}&customerId=${customerId}&sort=${sortParam}&order=${orderParam}`);
            if (res.success) {
                setData(res.data);
                setPagination(prev => ({
                    ...prev,
                    current: page,
                    total: res.total
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (customerId) {
            fetchContracts(1);
        }
    }, [customerId]);

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter && sorter.field) {
            setSortData(sorter);
            fetchContracts(pagination.current, sorter);
        } else {
            fetchContracts(pagination.current, sortData);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 p-6">
            <ContractTable
                data={data}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                onEdit={(record) => {
                    setEditData(record);
                    setIsModalVisible(true);
                }}
                onRefresh={() => fetchContracts(pagination.current, sortData)}
            />
            <ContractCreateModal
                visible={isModalVisible}
                editData={editData}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditData(null);
                }}
                onSuccess={() => {
                    setIsModalVisible(false);
                    fetchContracts(pagination.current, sortData);
                }}
            />
        </div>
    );
};
