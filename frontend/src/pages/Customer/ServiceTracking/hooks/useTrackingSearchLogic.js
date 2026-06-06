import { useState, useMemo } from 'react';
import { Form, App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTrackingSearchRules } from '../schemas/trackingSchema';
import trackingApi from '../../../../services/api/tracking.api';

export const useTrackingSearchLogic = () => {
    const { message } = App.useApp();
    const { t } = useTranslation('tracking');
    const navigate = useNavigate();

    const [isSearching, setIsSearching] = useState(false);
    const [form] = Form.useForm();

    const rules = useMemo(() => getTrackingSearchRules(t), [t]);

    const onFinish = async (values) => {
        setIsSearching(true);
        try {
            const cleanBookingCode = values.bookingCode.trim().toUpperCase();
            const cleanLicensePlate = values.licensePlate.trim().toUpperCase();

            await trackingApi.lookupTracking(cleanBookingCode, cleanLicensePlate);

            navigate(`/tracking/${cleanBookingCode}?license_plate=${cleanLicensePlate}`);
        } catch (error) {
            const errorMsg = error.response?.data?.message || t('search_error', 'Mã dịch vụ hoặc biển số xe không đúng!');
            message.error(errorMsg);
        } finally {
            setIsSearching(false);
        }
    };

    return { form, rules, isSearching, onFinish, t };
};
