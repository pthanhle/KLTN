import { Form, Input, InputNumber, Select, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Gauge, Settings2, Zap, Fuel, Users } from 'lucide-react';
import { getSpecsRules } from '../../../../schemas/carSpecsSchema';
import { useCarSpecsEnums } from '../../../../hooks/useCarSpecsEnums';

const CoreSpecsCard = () => {
    const { t } = useTranslation('adminCarForm');
    const rules = getSpecsRules();
    const { fuelTypes, isLoading } = useCarSpecsEnums();

    const SpecLabel = ({ text }) => (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {text}
        </span>
    );

    const globalInputClasses = "!w-full !bg-slate-50 dark:!bg-[#1a1a1c] !border-none !rounded-xl text-slate-900 dark:text-white !text-sm font-semibold focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all [&_input]:!text-sm";

    const inputHeightClasses = "!h-[50px] [&_input]:!h-[50px] [&_input]:leading-[50px]";

    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl p-8 lg:p-10 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-6 mb-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-yellow-500 whitespace-nowrap">
                    {t('specsCoreTitle', 'Thông số kỹ thuật cơ bản')}
                </h3>
                <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">

                <Form.Item
                    name="year"
                    rules={rules.year}
                    label={<SpecLabel text={t('year', 'Năm Sản Xuất')} />}
                    layout="vertical"
                    required={false}
                >
                    <InputNumber
                        prefix={<CalendarDays size={18} className="text-yellow-500 mr-2" />}
                        className={`${globalInputClasses} ${inputHeightClasses} [&_.ant-input-number-handler-wrap]:hidden`}
                        placeholder="2024"
                        min={1990}
                        max={new Date().getFullYear() + 1}
                    />
                </Form.Item>

                <Form.Item
                    name="odo"
                    rules={rules.odo}
                    label={<SpecLabel text={t('odo', 'ODO')} />}
                    layout="vertical"
                    required={false}
                >
                    <InputNumber
                        prefix={<Gauge size={18} className="text-yellow-500 mr-2" />}
                        className={`${globalInputClasses} ${inputHeightClasses} [&_.ant-input-number-handler-wrap]:hidden`}
                        placeholder="0"
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item
                    name="engine"
                    rules={rules.engine}
                    label={<SpecLabel text={t('engine', 'Động cơ')} />}
                    layout="vertical"
                    required={false}
                >
                    <Input
                        prefix={<Settings2 size={18} className="text-yellow-500 mr-2" />}
                        className={`${globalInputClasses} ${inputHeightClasses}`}
                        placeholder="V8 Twin Turbo"
                    />
                </Form.Item>

                <Form.Item
                    name="power"
                    rules={rules.power}
                    label={<SpecLabel text={t('power', 'Công suất')} />}
                    layout="vertical"
                    required={false}
                >
                    <Input
                        prefix={<Zap size={18} className="text-yellow-500 mr-2" />}
                        className={`${globalInputClasses} ${inputHeightClasses}`}
                        placeholder="600 HP"
                    />
                </Form.Item>

                <Form.Item
                    name="fuel"
                    rules={rules.fuel}
                    label={<SpecLabel text={t('fuel', 'Nhiên liệu')} />}
                    layout="vertical"
                    required={false}
                >
                    {isLoading ? (
                        <Skeleton.Input active block style={{ height: '50px', borderRadius: '12px' }} />
                    ) : (
                        <Select
                            suffixIcon={<Fuel size={18} className="text-yellow-500 pointer-events-none" />}
                            className={`w-full !h-[50px] [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#1a1a1c] [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selection-item]:!leading-[50px] [&_.ant-select-selection-item]:text-sm [&_.ant-select-selection-item]:font-semibold [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:text-white focus-within:[&_.ant-select-selector]:!ring-2 focus-within:[&_.ant-select-selector]:!ring-yellow-500/50 transition-all`}
                            popupClassName="!rounded-2xl !p-2 dark:bg-[#1c1c1f]"
                            placeholder={t('fuel', 'Chọn nhiên liệu')}
                        >
                            {fuelTypes.map(fuel => (
                                <Select.Option key={fuel.value} value={fuel.value}>
                                    {t(fuel.labelKey, fuel.value)}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>

                <Form.Item
                    name="seats"
                    rules={rules.seats}
                    label={<SpecLabel text={t('seats', 'Số chỗ')} />}
                    layout="vertical"
                    required={false}
                >
                    <InputNumber
                        prefix={<Users size={18} className="text-yellow-500 mr-2" />}
                        className={`${globalInputClasses} ${inputHeightClasses} [&_.ant-input-number-handler-wrap]:hidden`}
                        placeholder="5"
                        min={2}
                        max={50}
                    />
                </Form.Item>

            </div>
        </section>
    );
};

export default CoreSpecsCard;
