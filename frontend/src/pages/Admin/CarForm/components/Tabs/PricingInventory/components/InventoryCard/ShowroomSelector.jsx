import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { MOCK_SHOWROOMS } from '../../../../../data/inventory.mock';

const ShowroomSelector = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3">
                {t('showroomAllocLbl', 'Trưng bày tại Showroom')}
            </label>
            <Form.Item name="availableShowrooms" className="mb-0">
                <Select
                    mode="multiple"
                    placeholder={t('showroomAllocPlaceholder', 'Chọn chi nhánh đang trưng bày xe...')}
                    className="w-full min-h-[48px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!min-h-[48px] [&_.ant-select-selection-item]:!leading-[36px] [&_.ant-select-selector]:!bg-white dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10"
                    classNames={{ popup: "dark:bg-[#141416] dark:border dark:border-white/10" }}
                    options={MOCK_SHOWROOMS}
                />
            </Form.Item>
        </div>
    );
};

export default ShowroomSelector;
