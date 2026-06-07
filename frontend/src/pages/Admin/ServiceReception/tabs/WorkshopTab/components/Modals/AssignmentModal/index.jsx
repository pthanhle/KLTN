import React from 'react';
import { Modal, Form, Select, Input, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { Clock, UserPlus, CheckCircle2, X } from 'lucide-react';
import useAssignmentModal from './useAssignmentModal';
import TechOptionItem from './TechOptionItem';

const AssignmentModal = ({ visible, assignmentData, technicians, onConfirm, onCancel, selectedDate }) => {
    const { t } = useTranslation('adminServiceReception');
    const { form, handleSubmit } = useAssignmentModal({ visible, assignmentData, onConfirm, selectedDate });

    return (
        <Modal
            title={
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-none mb-1">{t('modal_assign_title')}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {assignmentData?.booking?.license_plate} • {assignmentData?.targetBay?.name}
                        </p>
                    </div>
                </div>
            }
            open={visible}
            onCancel={onCancel}
            destroyOnHidden
            closable={false}
            width={600}
            className="dark-modal"
            footer={
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                    <button
                        onClick={onCancel}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        {t('modal_btn_cancel')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 shadow-lg shadow-yellow-500/20 transition-all active:scale-95"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        {t('modal_btn_confirm')}
                    </button>
                </div>
            }
            styles={{
                content: {
                    backgroundColor: '#141416',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '24px',
                    padding: '24px'
                },
                header: { backgroundColor: 'transparent' },
                mask: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.6)' }
            }}
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-6"
                requiredMark={false}
            >
                <div className="grid grid-cols-2 gap-6">
                    <Form.Item label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('modal_bay_label')}</span>} name="bay">
                        <Input
                            disabled
                            className="bg-slate-50 dark:bg-[#1c1c1e] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold h-11 rounded-xl"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('modal_time_label')}</span>}
                        name="time_slot"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
                    >
                        <DatePicker.RangePicker
                            showTime={{ format: 'HH:mm', minuteStep: 15 }}
                            format="HH:mm DD/MM/YYYY"
                            className="w-full bg-slate-50 dark:bg-[#1c1c1e] border-slate-200 dark:border-white/10 hover:border-yellow-500/50 focus:border-yellow-500 focus:shadow-none h-11 rounded-xl"
                            popupClassName="dark-time-picker"
                            suffixIcon={<Clock className="w-4 h-4 text-slate-400" />}
                            disabledDate={(current) => {
                                if (!selectedDate) return false;
                                return current && !current.isSame(selectedDate, 'day');
                            }}
                            placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
                        />
                    </Form.Item>
                </div>

                <div className="bg-slate-50 dark:bg-white/[0.02] p-5 rounded-xl border border-slate-200 dark:border-white/5 mt-2">
                    <Form.Item
                        label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('modal_primary_tech')}</span>}
                        name="primary_technician"
                        rules={[{ required: true, message: 'Vui lòng chọn KTV chính' }]}
                    >
                        <Select
                            placeholder={t('modal_primary_tech_ph')}
                            className="w-full"
                            size="large"
                            options={technicians.map(t => ({
                                value: t._id,
                                label: t.full_name,
                                tech: t
                            }))}
                            optionRender={(option) => (
                                <TechOptionItem tech={option.data.tech} isPreferred={option.data.tech._id === assignmentData?.booking?.preferred_technician} />
                            )}
                            listHeight={300}
                            popupClassName="custom-select-dropdown"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('modal_assistants')}</span>}
                        name="assistant_technicians"
                        className="mb-0"
                    >
                        <Select
                            mode="multiple"
                            placeholder={t('modal_assistants_ph')}
                            className="w-full"
                            size="large"
                            maxTagCount="responsive"
                            options={technicians.map(t => ({
                                value: t._id,
                                label: t.full_name,
                                tech: t
                            }))}
                            optionRender={(option) => (
                                <TechOptionItem tech={option.data.tech} isPreferred={option.data.tech._id === assignmentData?.booking?.preferred_technician} />
                            )}
                            listHeight={300}
                            popupClassName="custom-select-dropdown"
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default AssignmentModal;
