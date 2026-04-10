import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { getOutOfStockBehaviorOptions } from '../../../../../constants/carFormConstants';

const OutOfStockConfig = () => {
    const { t } = useTranslation('adminCarForm');
    const options = getOutOfStockBehaviorOptions(t);

    return (
        <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3 ml-2">
                {t('outOfStockBehaviorLbl', 'Nghiệp vụ cạn kho (Out of Stock)')}
            </label>
            <Form.Item name="outOfStockBehavior" initialValue="pre_order" className="mb-0">
                <Select 
                    className="w-full h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selector]:!bg-white dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 dark:[&_.ant-select-arrow]:!text-slate-400"
                    classNames={{ popup: "dark:bg-[#141416] dark:border dark:border-white/10 [&_.ant-select-item-option-content]:dark:text-white [&_.ant-select-item-option-active]:dark:bg-white/5 [&_.select-item-option-selected]:dark:bg-emerald-500/20 [&_.select-item-option-selected]:dark:text-emerald-500" }}
                    options={options}
                />
            </Form.Item>
        </div>
    );
};

export default OutOfStockConfig;
