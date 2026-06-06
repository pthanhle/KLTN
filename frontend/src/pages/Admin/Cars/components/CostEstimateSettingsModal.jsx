import { useEffect } from 'react';
import { Modal, Form, InputNumber, Spin, message, Divider } from 'antd';
import { Settings } from 'lucide-react';
import { useAdminCostEstimateQuery, useUpdateCostEstimateMutation } from '../../../../services/queries/costEstimate.queries';

const formatVND = (val) => val !== undefined ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
const parseVND = (val) => val ? Number(val.replace(/,/g, '')) : 0;

const FeeInput = ({ label, name }) => (
    <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: `Vui lòng nhập ${label.toLowerCase()}` }]}
    >
        <InputNumber className="w-full" style={{ width: '100%' }} min={0} formatter={formatVND} parser={parseVND} suffix="đ" />
    </Form.Item>
);

const CostEstimateSettingsModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const { data: config, isLoading } = useAdminCostEstimateQuery();
    const { mutate: updateConfig, isPending } = useUpdateCostEstimateMutation();

    useEffect(() => {
        if (config && open) {
            form.setFieldsValue({
                phi_kiem_dinh: config.phi_kiem_dinh,
                phi_duong_bo: config.phi_duong_bo,
                bao_hiem_tnds: config.bao_hiem_tnds,
                bao_hiem_than_xe: config.bao_hiem_than_xe,
                le_phi_kv1: config.le_phi_kv1,
                le_phi_kv2: config.le_phi_kv2,
                le_phi_kv3: config.le_phi_kv3,
            });
        }
    }, [config, open, form]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            updateConfig(values, {
                onSuccess: () => {
                    message.success('Đã cập nhật cấu hình dự toán chi phí');
                    onClose();
                },
                onError: () => {
                    message.error('Cập nhật thất bại, vui lòng thử lại');
                },
            });
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={isPending}
            okText="Lưu cấu hình"
            cancelText="Hủy"
            title={
                <div className="flex items-center gap-2">
                    <Settings size={18} className="text-yellow-500" />
                    <span className="font-bold text-base">Cài đặt dự toán chi phí</span>
                </div>
            }
            width={560}
        >
            {isLoading ? (
                <div className="flex justify-center py-8"><Spin /></div>
            ) : (
                <Form form={form} layout="vertical" className="mt-2">
                    <Divider orientation="left" orientationMargin={0}>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Chi phí cố định</span>
                    </Divider>
                    <FeeInput label="Phí kiểm định (đ)" name="phi_kiem_dinh" />
                    <FeeInput label="Phí sử dụng đường bộ cá nhân - 1 năm (đ)" name="phi_duong_bo" />
                    <FeeInput label="Bảo hiểm TNDS - 1 năm (đ)" name="bao_hiem_tnds" />
                    <FeeInput label="Bảo hiểm thân xe (đ)" name="bao_hiem_than_xe" />

                    <Divider orientation="left" orientationMargin={0}>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Lệ phí đăng ký theo khu vực</span>
                    </Divider>
                    <p className="text-xs text-slate-400 mb-3 -mt-1 leading-relaxed">
                        <b>Khu vực I:</b> Hà Nội, TP.HCM &nbsp;|&nbsp;
                        <b>Khu vực II:</b> TP trực thuộc TW (trừ HN, HCM), TP thuộc tỉnh, thị xã &nbsp;|&nbsp;
                        <b>Khu vực III:</b> Các khu vực còn lại
                    </p>
                    <FeeInput label="Khu vực I (đ)" name="le_phi_kv1" />
                    <FeeInput label="Khu vực II (đ)" name="le_phi_kv2" />
                    <FeeInput label="Khu vực III (đ)" name="le_phi_kv3" />
                </Form>
            )}
        </Modal>
    );
};

export default CostEstimateSettingsModal;
