import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { CarFront, Palette } from 'lucide-react';
import { useVehicleUnitForm } from '../../../hooks/useVehicleUnitForm';
import { getConditionOptions, getLocationOptions } from '../../../data/vehicleUnit.data';

const { TextArea } = Input;

const VehicleUnitFormModal = ({ open, onClose, unit, carId, carColors = [] }) => {
    const { t } = useTranslation('adminCars');
    const {
        form: { control, formState: { errors }, setValue },
        isEditing,
        isSubmitting,
        submitForm,
        resetForm
    } = useVehicleUnitForm({ unit, carId, onClose, t });

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open, resetForm]);

    const colorOptions = carColors.map(c => ({
        label: (
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-slate-200 dark:border-white/10" style={{ backgroundColor: c.value }} />
                <span>{c.name}</span>
            </div>
        ),
        value: JSON.stringify({ name: c.name, value: c.value })
    }));

    return (
        <Modal
            title={
                <div className="flex items-center gap-3 pb-2">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                        <CarFront size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-white m-0 leading-tight">
                            {isEditing ? t('Cập nhật Xe') : t('Thêm Xe Vật Lý')}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium m-0 mt-0.5">{t('Nhập thông tin cho xe thực tế trong kho')}</p>
                    </div>
                </div>
            }
            open={open}
            onOk={submitForm}
            onCancel={onClose}
            confirmLoading={isSubmitting}
            width={760}
            destroyOnHidden
            centered
            className="[&_.ant-modal-content]:!bg-white dark:[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-slate-100 dark:[&_.ant-modal-content]:!border-white/5 [&_.ant-modal-header]:!bg-transparent [&_.ant-modal-title]:!mb-4 [&_.ant-modal-footer]:!border-t [&_.ant-modal-footer]:!border-slate-100 dark:[&_.ant-modal-footer]:!border-white/5 [&_.ant-modal-footer]:!pt-5 [&_.ant-modal-close]:!top-6 [&_.ant-modal-close]:!right-6 [&_.ant-modal-footer]:!mt-0"
            footer={
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer"
                    >
                        {t('Hủy')}
                    </button>
                    <button 
                        type="button"
                        onClick={submitForm}
                        disabled={isSubmitting}
                        className="px-8 py-2.5 rounded-xl font-black text-[13px] tracking-wide text-white dark:text-slate-900 bg-slate-900 dark:bg-gradient-to-r dark:from-[#eab308] dark:to-[#ffd165] shadow-xl shadow-slate-900/10 dark:shadow-yellow-500/10 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 border-none cursor-pointer"
                    >
                        {isSubmitting ? t('Đang Lưu...') : (isEditing ? t('Lưu Thay Đổi') : t('Tạo Mới'))}
                    </button>
                </div>
            }
        >
            <Form layout="vertical" className="mt-6" onSubmitCapture={submitForm}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Controller
                            name="vin"
                            control={control}
                            render={({ field }) => (
                                <Form.Item
                                    label={<span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Số Khung (VIN)')} <span className="text-red-500">*</span></span>}
                                    validateStatus={errors.vin ? 'error' : ''}
                                    help={errors.vin?.message}
                                >
                                    <Input
                                        {...field}
                                        placeholder={t('VD: WBA...')}
                                        className="!h-12 !bg-slate-50 dark:!bg-[#1a1a1c] !border-slate-200 dark:!border-white/10 !rounded-xl px-4 text-slate-900 dark:text-white font-mono font-bold uppercase focus:!ring-2 focus:!ring-yellow-500/50 transition-all"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Controller
                            name="engine_number"
                            control={control}
                            render={({ field }) => (
                                <Form.Item
                                    label={<span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Số máy')}</span>}
                                    validateStatus={errors.engine_number ? 'error' : ''}
                                    help={errors.engine_number?.message}
                                >
                                    <Input
                                        {...field}
                                        placeholder={t('VD: B48...')}
                                        className="!h-12 !bg-slate-50 dark:!bg-[#1a1a1c] !border-slate-200 dark:!border-white/10 !rounded-xl px-4 text-slate-900 dark:text-white font-mono font-bold uppercase focus:!ring-2 focus:!ring-yellow-500/50 transition-all"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col span={8}>
                        <Controller
                            name="condition"
                            control={control}
                            render={({ field }) => (
                                <Form.Item
                                    label={<span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Tình trạng')}</span>}
                                    validateStatus={errors.condition ? 'error' : ''}
                                    help={errors.condition?.message}
                                >
                                    <Select
                                        {...field}
                                        options={getConditionOptions(t)}
                                        className="w-full !h-12 [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#1a1a1c] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!px-4 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:font-semibold [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-search-input]:!h-12 [&_.ant-select-selection-placeholder]:!leading-[46px] hover:[&_.ant-select-selector]:!bg-slate-100 dark:hover:[&_.ant-select-selector]:!bg-white/5 transition-all cursor-pointer"
                                        classNames={{ popup: "!rounded-xl !p-2 dark:bg-[#1c1c1f] border border-slate-100 dark:border-white/10" }}
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <Controller
                            name="model_year"
                            control={control}
                            render={({ field }) => (
                                <Form.Item
                                    label={<span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('Năm SX')}</span>}
                                    validateStatus={errors.model_year ? 'error' : ''}
                                    help={errors.model_year?.message}
                                >
                                    <Input {...field} type="number" placeholder={t('VD: 2024')} className="!h-12 !bg-slate-50 dark:!bg-[#1a1a1c] !border-slate-200 dark:!border-white/10 !rounded-xl px-4 text-slate-900 dark:text-white font-semibold focus:!ring-2 focus:!ring-yellow-500/50 transition-all" />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <Controller
                            name="odometer"
                            control={control}
                            render={({ field }) => (
                                <Form.Item
                                    label={<span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('ODO (km)')}</span>}
                                    validateStatus={errors.odometer ? 'error' : ''}
                                    help={errors.odometer?.message}
                                >
                                    <Input {...field} type="number" placeholder={t('0')} className="!h-12 !bg-slate-50 dark:!bg-[#1a1a1c] !border-slate-200 dark:!border-white/10 !rounded-xl px-4 text-slate-900 dark:text-white font-semibold focus:!ring-2 focus:!ring-yellow-500/50 transition-all" />
                                </Form.Item>
                            )}
                        />
                    </Col>
                </Row>

                <div className="bg-slate-50/50 dark:bg-white/[0.02] p-5 rounded-2xl mb-6 border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <Palette size={16} className="text-slate-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 m-0">{t('Thông tin Màu sắc')}</h4>
                    </div>

                    <Row gutter={20}>
                        <Col span={24}>
                            <Controller
                                name="color_json"
                                control={control}
                                render={({ field }) => {
                                    const handleColorChange = (val) => {
                                        field.onChange(val);
                                        if (val) {
                                            try {
                                                const parsed = JSON.parse(val);
                                                setValue('color_name', parsed.name);
                                                setValue('color_value', parsed.value);
                                            } catch (e) { }
                                        } else {
                                            setValue('color_name', '');
                                            setValue('color_value', '');
                                        }
                                    };

                                    return (
                                        <Form.Item
                                            label={<span className="text-xs font-bold text-slate-500">{t('Chọn màu sắc')}</span>}
                                            className="mb-0"
                                        >
                                            <Select
                                                {...field}
                                                onChange={handleColorChange}
                                                options={colorOptions}
                                                placeholder={t('Chọn màu sắc')}
                                                allowClear
                                                className="w-full !h-12 [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#1a1a1c] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!px-4 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:font-semibold [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:text-white [&_.ant-select-selection-search-input]:!h-12 [&_.ant-select-selection-placeholder]:!leading-[46px] hover:[&_.ant-select-selector]:!bg-slate-100 dark:hover:[&_.ant-select-selector]:!bg-white/5 transition-all cursor-pointer"
                                                classNames={{ popup: "!rounded-xl !p-2 dark:bg-[#1c1c1f] border border-slate-100 dark:border-white/10" }}
                                            />
                                        </Form.Item>
                                    );
                                }}
                            />
                        </Col>
                    </Row>
                </div>

            </Form>
        </Modal>
    );
};

export default VehicleUnitFormModal;
