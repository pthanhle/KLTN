import React from 'react';
import { Table, Tag, Button, Space, Modal, Descriptions, Popconfirm, message } from 'antd';
import { FileText, Eye, Download, Edit, Trash2 } from 'lucide-react';
import axiosClient from '../../../../../utils/axiosClient';
import { useState } from 'react';
import dayjs from 'dayjs';

const getStatusColor = (status) => {
    switch (status) {
        case 'draft': return 'default';
        case 'issued': return 'processing';
        case 'signed': return 'success';
        case 'cancelled': return 'error';
        default: return 'default';
    }
};

const ContractTable = ({ data = [], loading = false, pagination, onChange, onEdit, onRefresh }) => {
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    const handleDelete = async (id) => {
        try {
            const res = await axiosClient.delete(`/admin/contracts/${id}`);
            if (res && res.success) {
                message.success('Đã xóa hợp đồng thành công');
                if (onRefresh) onRefresh();
            }
        } catch (error) {
            message.error('Xóa hợp đồng thất bại');
            console.error(error);
        }
    };

    const columns = [
        {
            title: 'Mã Hợp Đồng',
            dataIndex: 'contract_number',
            key: 'contract_number',
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) => customer ? (
                <div className="flex flex-col">
                    <span className="font-medium">{customer.full_name}</span>
                    <span className="text-xs text-gray-500">{customer.phone}</span>
                </div>
            ) : '-',
        },
        {
            title: 'Loại Hợp Đồng',
            dataIndex: 'contract_type',
            key: 'contract_type',
            render: (type) => {
                const typeMap = {
                    'car_purchase': 'Mua Bán Xe',
                    'service': 'Dịch Vụ',
                    'other': 'Khác'
                };
                return typeMap[type] || type;
            },
        },
        {
            title: 'Giá Trị',
            dataIndex: 'total_value',
            key: 'total_value',
            sorter: true,
            render: (value) => value ? `${value.toLocaleString('vi-VN')} đ` : '-',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Ngày Tạo Hợp Đồng',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<Eye size={16} />} onClick={() => { setSelectedContract(record); setDetailModalVisible(true); }} />
                    {record.attachments && record.attachments.length > 0 && (
                        <Button type="text" icon={<Download size={16} />} href={record.attachments[0]} target="_blank" />
                    )}
                    {onEdit && (
                        <Button type="text" icon={<Edit size={16} className="text-blue-500" />} onClick={() => onEdit(record)} />
                    )}
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa hợp đồng này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" danger icon={<Trash2 size={16} />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="_id"
                loading={loading}
                pagination={pagination}
                onChange={onChange}
                className="shadow-sm rounded-lg overflow-hidden border border-gray-200"
            />
            <Modal
                title="Chi Tiết Hợp Đồng"
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailModalVisible(false)}>Đóng</Button>
                ]}
                width={700}
            >
                {selectedContract && (
                    <Descriptions bordered column={1} className="mt-4">
                        <Descriptions.Item label="Mã Hợp Đồng">
                            <span className="font-semibold text-blue-600">{selectedContract.contract_number}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Khách Hàng">
                            {selectedContract.customer?.full_name} ({selectedContract.customer?.phone})
                        </Descriptions.Item>
                        <Descriptions.Item label="Email Khách Hàng">
                            {selectedContract.customer?.email || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Xe (nếu có)">
                            {selectedContract.vehicle?.name || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Loại Hợp Đồng">
                            {selectedContract.contract_type === 'car_purchase' ? 'Mua Bán Xe' : 
                             selectedContract.contract_type === 'service' ? 'Dịch Vụ' : 'Khác'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá Trị">
                            {selectedContract.total_value ? `${selectedContract.total_value.toLocaleString('vi-VN')} đ` : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng Thái">
                            <Tag color={getStatusColor(selectedContract.status)}>
                                {selectedContract.status?.toUpperCase()}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày Tạo">
                            {dayjs(selectedContract.createdAt).format('DD/MM/YYYY HH:mm')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi Chú">
                            {selectedContract.note || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="File đính kèm">
                            {selectedContract.attachments && selectedContract.attachments.length > 0 ? (
                                <a href={selectedContract.attachments[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-2">
                                    <FileText size={16} /> Xem tài liệu đính kèm
                                </a>
                            ) : '-'}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </>
    );
};

export default ContractTable;
