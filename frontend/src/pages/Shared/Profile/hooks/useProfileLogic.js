import { useState, useEffect, useMemo } from 'react';
import { MOCK_PROFILE_ADMIN, MOCK_PROFILE_CUSTOMER } from '../data/profile.mock';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfileSchema } from '../schemas/profileSchema';

export const useProfileLogic = (roleType = 'admin') => {
    const { t } = useTranslation('profile');
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const schema = useMemo(() => getProfileSchema(t), [t]);

    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            full_name: '',
            phone: '',
            address: '',
        }
    });

    useEffect(() => {
        // Mock call to API '/api/client/auth/me'
        const fetchProfile = setTimeout(() => {
            const data = roleType === 'admin' ? MOCK_PROFILE_ADMIN : MOCK_PROFILE_CUSTOMER;
            setProfile(data);
            
            methods.reset({
                full_name: data.full_name,
                phone: data.phone,
                address: data.address,
            });
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(fetchProfile);
    }, [roleType, methods]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel edit: revert form data
            methods.reset({
                full_name: profile.full_name,
                phone: profile.phone,
                address: profile.address,
            });
            methods.clearErrors();
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async (data) => {
        setIsLoading(true);
        // Mock save logic to backend
        setTimeout(() => {
            setProfile(prev => ({ ...prev, ...data }));
            setIsEditing(false);
            setIsLoading(false);
            message.success(t('messages_updateSuccess', 'Cập nhật hồ sơ thành công!'));
        }, 800);
    };

    return {
        t,
        isLoading,
        profile,
        isEditing,
        methods,
        handleEditToggle,
        handleSave: methods.handleSubmit(handleSave),
        isPasswordModalOpen,
        setIsPasswordModalOpen,
    };
};
