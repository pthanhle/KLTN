import { useState, useMemo } from 'react';
import { Form, App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTrackingSearchRules } from '../schemas/trackingSchema';

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
            // Giả lập API Validation & Lookup
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const cleanBookingCode = values.bookingCode.trim().toUpperCase();
            navigate(`/tracking/${cleanBookingCode}`);
        } catch (error) {
            message.error(t('search_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        } finally {
            setIsSearching(false);
        }
    };

    return { form, rules, isSearching, onFinish, t };
};
