import React from 'react';
import { Timeline, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { Text } = Typography;

export const ContractTimeline = ({ history = [] }) => {
    const { t } = useTranslation('adminVehicleContracts');

    if (!history || history.length === 0) {
        return <Text type="secondary">{t('Chưa có lịch sử trạng thái.')}</Text>;
    }

    const items = history.map((event, index) => {
        let color = 'gray';
        if (event.status === 'contract_pending' || event.status === 'pending_approval') color = 'orange';
        if (event.status === 'approved') color = 'blue';
        if (event.status === 'paid' || event.status === 'delivered') color = 'green';
        if (event.status === 'cancelled') color = 'red';

        return {
            color,
            children: (
                <div className="flex flex-col gap-1">
                    <Text strong>{event.action_name}</Text>
                    <Text type="secondary" className="text-xs">
                        {dayjs(event.timestamp).format('DD/MM/YYYY HH:mm')}
                    </Text>
                    {event.user_name && (
                        <Text className="text-sm">{t('Bởi')}: {event.user_name}</Text>
                    )}
                </div>
            ),
        };
    });

    return <Timeline items={items} />;
};
