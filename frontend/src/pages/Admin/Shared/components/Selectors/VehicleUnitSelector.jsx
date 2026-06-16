import React from 'react';
import { Select, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVehicleUnitsQuery } from '../../../../../services/queries/vehicleUnit.queries';

const { Option } = Select;

export const VehicleUnitSelector = ({ value, onChange, disabled, carId }) => {
    const { t } = useTranslation('adminVehicleContracts');
    const { data: unitsData, isLoading } = useVehicleUnitsQuery({
        car_id: carId,
        status: 'in_stock',
        limit: 100,
    });

    const units = unitsData?.data || [];

    return (
        <Select
            showSearch
            value={value}
            onChange={onChange}
            disabled={disabled || isLoading}
            loading={isLoading}
            placeholder={t('Chọn xe từ kho...')}
            optionFilterProp="children"
            filterOption={(input, option) =>
                (option?.key || '').toLowerCase().includes(input.toLowerCase())
            }
            className="w-full"
        >
            {units.map((unit) => (
                <Option key={unit.vin} value={unit.id} label={unit.vin}>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{unit.vin}</span>
                        <Tag color="blue">{unit.actual_color}</Tag>
                    </div>
                </Option>
            ))}
        </Select>
    );
};
