import React from 'react';
import { Modal, Form, InputNumber, Input, Button } from 'antd';
import { Gift, Send } from 'lucide-react';

export const PointsGiftModal = ({
    isOpen,
    onClose,
    onAddPoints,
    isLoading,
    t
}) => {
    const [pointsForm] = Form.useForm();

    const handleCancel = () => {
        pointsForm.resetFields();
        onClose();
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-2 text-slate-800 dark:text-white uppercase font-black tracking-widest text-sm">
                    <Gift size={18} className="text-yellow-500" />
                    {t('Tặng điểm Loyalty')}
                </div>
            }
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            destroyOnHidden
            className="custom-admin-modal"
        >
            <Form
                form={pointsForm}
                layout="vertical"
                onFinish={(values) => {
                    onAddPoints(values);
                    pointsForm.resetFields();
                }}
                className="py-4"
            >
                <Form.Item
                    name="points"
                    label={<span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('Số điểm tặng')}</span>}
                    rules={[{ required: true, message: t('Vui lòng nhập số điểm') }]}
                >
                    <InputNumber
                        min={1}
                        placeholder={t('Ví dụ: 500')}
                        className="w-full h-12 flex items-center text-lg font-bold rounded-xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10"
                    />
                </Form.Item>

                <Form.Item
                    name="reason"
                    label={<span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('Lý do tặng')}</span>}
                    rules={[{ required: true, message: t('Vui lòng nhập lý do') }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder={t('Nhập lý do tặng điểm (ví dụ: Quà tặng sinh nhật, Đền bù dịch vụ chậm...)')}
                        className="rounded-xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 p-4"
                    />
                </Form.Item>

                <div className="flex gap-3 mt-8">
                    <Button
                        onClick={handleCancel}
                        className="flex-1 h-12 rounded-xl border-none bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px]"
                    >
                        {t('Hủy')}
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        className="flex-1 h-12 rounded-xl bg-yellow-500 hover:bg-yellow-600 border-none text-slate-900 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-yellow-500/20"
                        icon={<Send size={14} />}
                    >
                        {t('Xác nhận tặng')}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};
