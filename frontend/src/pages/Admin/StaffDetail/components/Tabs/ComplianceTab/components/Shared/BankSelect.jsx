import React from 'react';
import { Select, Image, Skeleton } from 'antd';
import { useBanks } from '../../../../../../../../services/queries/banks.queries';
import { useTranslation } from 'react-i18next';

const BankSelect = ({ value, onChange, className }) => {
    const { t } = useTranslation(['adminStaffCompliance']);
    const { data: banks, isLoading, isError } = useBanks();

    if (isLoading) {
        return <Skeleton.Input active block className={`h-11 rounded-lg ${className}`} />;
    }

    if (isError || !banks) {
        return (
            <Select 
                value={value} 
                onChange={onChange} 
                className={`h-11 w-full ${className}`}
                placeholder={t('adminStaffCompliance:placeholder_select_bank', 'Chọn ngân hàng...')}
                options={[{ value: value, label: value }]} // Fallback to current value if API fails
            />
        );
    }

    const options = banks.map(bank => ({
        value: bank.shortName, // Use shortName to match mock data (e.g. 'Techcombank')
        label: (
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 bg-white rounded-full overflow-hidden border border-slate-100">
                    <Image 
                        src={bank.logo} 
                        alt={bank.shortName} 
                        preview={false}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{bank.shortName}</span>
                    <span className="text-[10px] text-slate-500 truncate max-w-[200px]" title={bank.name}>{bank.name}</span>
                </div>
            </div>
        ),
        searchString: `${bank.shortName} ${bank.name} ${bank.code}`.toLowerCase()
    }));

    return (
        <Select
            showSearch
            value={value}
            onChange={onChange}
            className={`w-full ${className}`}
            placeholder={t('adminStaffCompliance:placeholder_select_bank', 'Chọn ngân hàng...')}
            optionFilterProp="searchString"
            options={options}
            popupClassName="dark:bg-[#1c1c1e] dark:border-white/10"
            filterOption={(input, option) =>
                (option?.searchString ?? '').includes(input.toLowerCase())
            }
        />
    );
};

export default BankSelect;
