import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, InputNumber, Upload, Button, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosClient from '../../../../utils/axiosClient';

const ContractCreateModal = ({ visible, onCancel, onSuccess, editData }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [cars, setCars] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (visible) {
            fetchCustomers();
            fetchCars();

            if (editData) {
                form.setFieldsValue({
                    customer: editData.customer?._id || editData.customer,
                    vehicle: editData.vehicle?._id || editData.vehicle,
                    contract_type: editData.contract_type,
                    total_value: editData.total_value,
                    note: editData.note,
                    status: editData.status || 'draft'
                });
                setFileList([]);
            } else {
                form.resetFields();
                setFileList([]);
            }
        }
    }, [visible, editData, form]);

    const fetchCustomers = async (search = '') => {
        try {
            const res = await axiosClient.get(`/admin/customers?limit=50&search=${search}`);
            if (res && res.customers) {
                setCustomers(res.customers);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCars = async (search = '') => {
        try {
            const res = await axiosClient.get(`/admin/products?limit=50&search=${search}`);
            if (res && res.products) {
                setCars(res.products);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            const res = await axiosClient.post('/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res && res.url) {
                message.success('Tải lên thành công');
                return res.url;
            }
        } catch (error) {
            message.error('Tải lên thất bại');
            console.error(error);
        } finally {
            setUploading(false);
        }
        return null;
    };

    const onFinish = async (values) => {
        if (!editData && fileList.length === 0) {
            message.error('Vui lòng chọn file đính kèm cho hợp đồng!');
            return;
        }

        try {
            setLoading(true);

            let attachmentUrls = editData?.attachments || [];
            if (fileList.length > 0) {
                const url = await handleUpload(fileList[0].originFileObj);
                if (url) attachmentUrls.push(url);
            }

            const payload = {
                ...values,
                attachments: attachmentUrls
            };

            let res;
            if (editData) {
                res = await axiosClient.put(`/admin/contracts/${editData._id}`, payload);
            } else {
                res = await axiosClient.post('/admin/contracts', payload);
            }

            if (res && res.success) {
                message.success(editData ? 'Cập nhật hợp đồng thành công' : 'Tạo hợp đồng thành công');
                onSuccess();
                form.resetFields();
            }
        } catch (error) {
            message.error('Lỗi khi tạo hợp đồng');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={editData ? "Cập Nhật Hợp Đồng" : "Thêm Hợp Đồng Mới"}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading || uploading}
            width={600}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="customer"
                    label="Khách hàng"
                    rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn khách hàng"
                        filterOption={false}
                        onSearch={fetchCustomers}
                        options={customers.map(c => ({ value: c._id, label: `${c.full_name} (${c.phone}${c.email ? ` - ${c.email}` : ''})` }))}
                    />
                </Form.Item>

                <Form.Item
                    name="vehicle"
                    label="Xe (Không bắt buộc)"
                >
                    <Select
                        showSearch
                        placeholder="Chọn xe"
                        filterOption={false}
                        onSearch={fetchCars}
                        allowClear
                        options={cars.map(c => ({ value: c._id || c.id, label: c.name }))}
                    />
                </Form.Item>

                <Form.Item
                    name="contract_type"
                    label="Loại hợp đồng"
                    initialValue="car_purchase"
                    rules={[{ required: true }]}
                >
                    <Select
                        options={[
                            { value: 'car_purchase', label: 'Mua Bán Xe' },
                            { value: 'service', label: 'Dịch Vụ' },
                            { value: 'other', label: 'Khác' }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="total_value"
                    label="Giá trị (VND)"
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        min={0}
                    />
                </Form.Item>

                <Form.Item
                    name="note"
                    label="Ghi chú"
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Trạng thái"
                    initialValue="draft"
                    rules={[{ required: true }]}
                >
                    <Select
                        options={[
                            { value: 'draft', label: 'Bản Nháp (DRAFT)' },
                            { value: 'issued', label: 'Đã Phát Hành (ISSUED)' },
                            { value: 'signed', label: 'Đã Ký (SIGNED)' },
                            { value: 'cancelled', label: 'Đã Hủy (CANCELLED)' }
                        ]}
                    />
                </Form.Item>

                <Form.Item label={editData ? "File đính kèm mới (tùy chọn)" : "File đính kèm (Bắt buộc)"} required={!editData}>
                    <Upload
                        beforeUpload={(file) => {
                            setFileList([file]);
                            return false;
                        }}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Chọn File (PDF/Image)</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ContractCreateModal;
