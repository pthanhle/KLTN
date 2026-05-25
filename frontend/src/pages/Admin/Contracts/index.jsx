import React, { Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { PageLoader } from '@/components/ui/page-loader';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import ContractTable from './components/Table/ContractTable';
import ContractCreateModal from './components/ContractCreateModal';
import { Input, Button } from 'antd';
import { Search, Plus } from 'lucide-react';
import axiosClient from '../../../utils/axiosClient';

const AdminContractsPageContent = () => {
    const { t } = useTranslation('admin');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [sortData, setSortData] = useState({ sort: 'createdAt', order: 'desc' });

    const fetchContracts = async (page = 1, search = '', sorter = sortData) => {
        setLoading(true);
        try {
            const orderParam = sorter.order === 'ascend' ? 'asc' : 'desc';
            const sortParam = sorter.field || 'createdAt';
            
            const res = await axiosClient.get(`/admin/contracts?page=${page}&limit=${pagination.pageSize}&search=${search}&sort=${sortParam}&order=${orderParam}`);
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
        fetchContracts(1, searchText);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
    };

    const onSearch = () => {
        fetchContracts(1, searchText);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter && sorter.field) {
            setSortData(sorter);
            fetchContracts(pagination.current, searchText, sorter);
        } else {
            fetchContracts(pagination.current, searchText, sortData);
        }
    };

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>Quản Lý Hợp Đồng | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                        <PageBreadcrumbs items={[{ label: 'Quản Lý Hợp Đồng' }]} />
                        <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                            Quản Lý Hợp Đồng
                        </h1>
                    </div>
                </div>

                <div className="mb-6 flex gap-4 justify-between">
                    <Input
                        placeholder="Tìm kiếm theo mã hợp đồng..."
                        prefix={<Search size={18} className="text-gray-400" />}
                        value={searchText}
                        onChange={handleSearch}
                        onPressEnter={onSearch}
                        className="max-w-md h-10"
                    />
                    <Button
                        type="primary"
                        icon={<Plus size={18} />}
                        className="h-10 px-6 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center"
                        onClick={() => {
                            setEditData(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Thêm Mới
                    </Button>
                </div>

                <ContractTable
                    data={data}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    onEdit={(record) => {
                        setEditData(record);
                        setIsModalVisible(true);
                    }}
                    onRefresh={() => fetchContracts(pagination.current, searchText, sortData)}
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
                        fetchContracts(1, searchText, sortData);
                    }}
                />
            </div>
        </div>
    );
};

export const AdminContractsPage = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <AdminContractsPageContent />
        </Suspense>
    );
};

export default AdminContractsPage;
