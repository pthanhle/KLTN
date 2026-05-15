import { useState, useMemo, useEffect } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfileSchema } from '../schemas/profileSchema';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../../../../services/api/profile.api';
import { useProvinces } from '../../../../hooks/useProvinces';

export const useProfileLogic = (roleType = 'customer') => {
    const { message } = App.useApp();
    const { t } = useTranslation('profile');
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const { provinces, districts, wards, fetchDistricts, fetchWards } = useProvinces();

    const schema = useMemo(() => getProfileSchema(t), [t]);

    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            full_name: '',
            phone: '',
            cityUrlCode: null,
            districtUrlCode: null,
            wardUrlCode: null,
            street: '',
            city: '',
            district: '',
            ward: ''
        }
    });

    const { data: profile, isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const data = await profileApi.getProfile();
            const defaultAddress = data.addresses?.[0] || {};
            return {
                ...data,
                defaultAddress
            };
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (payload) => {
            return await profileApi.updateProfile(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userProfile']);
            setIsEditing(false);
            message.success(t('messages_updateSuccess', 'Cập nhật hồ sơ thành công!'));
        },
        onError: () => {
            message.error(t('messages_updateError', 'Cập nhật thất bại. Vui lòng thử lại.'));
        }
    });

    useEffect(() => {
        if (profile) {
            methods.reset({
                full_name: profile.full_name || '',
                phone: profile.phone || '',
                street: profile.defaultAddress?.street || profile.address || '',
                city: profile.defaultAddress?.city || null,
                district: profile.defaultAddress?.district || null,
                ward: profile.defaultAddress?.ward || null,
            });
        }
    }, [profile, methods]);

    // Lắng nghe sự thay đổi của City và District để gọi API phường xã tương ứng
    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            // Khi người dùng chọn Tỉnh/Thành phố mới
            if (name === 'city') {
                methods.setValue('district', null);
                methods.setValue('ward', null);
                if (value.city) {
                    const selectedCity = provinces.find(p => p.name === value.city);
                    if (selectedCity) fetchDistricts(selectedCity.code);
                } else {
                    fetchDistricts(null);
                }
            }
            // Khi người dùng chọn Quận/Huyện mới
            if (name === 'district') {
                methods.setValue('ward', null);
                if (value.district) {
                    const selectedDist = districts.find(d => d.name === value.district);
                    if (selectedDist) fetchWards(selectedDist.code);
                } else {
                    fetchWards(null);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [methods, fetchDistricts, fetchWards, provinces, districts, wards]);

    // Tiêm các quận huyện nếu profile đã có data khi vừa bật form Edit lên
    useEffect(() => {
        if (isEditing && profile?.defaultAddress?.city && provinces.length > 0) {
            const selectedCity = provinces.find(p => p.name === profile.defaultAddress.city);
            if (selectedCity) fetchDistricts(selectedCity.code);
        }
    }, [isEditing, provinces, profile]);

    useEffect(() => {
        if (isEditing && profile?.defaultAddress?.district && districts.length > 0) {
            const selectedDist = districts.find(d => d.name === profile.defaultAddress.district);
            if (selectedDist) fetchWards(selectedDist.code);
        }
    }, [isEditing, districts, profile]);

    const handleEditToggle = () => {
        if (isEditing) {
            methods.reset({
                full_name: profile?.full_name || '',
                phone: profile?.phone || '',
                street: profile?.defaultAddress?.street || profile?.address || '',
                city: profile?.defaultAddress?.city || '',
                district: profile?.defaultAddress?.district || '',
                ward: profile?.defaultAddress?.ward || '',
            });
            methods.clearErrors();
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async (data) => {
        const existingAddresses = profile?.addresses || [];

        let newAddresses = [...existingAddresses];

        const targetCity = data.city || profile?.defaultAddress?.city;
        const targetDistrict = data.district || profile?.defaultAddress?.district;
        const targetWard = data.ward || profile?.defaultAddress?.ward;
        const targetStreet = data.street || profile?.defaultAddress?.street;

        if (targetCity && targetDistrict && targetStreet) {
            const updatedAddress = {
                is_default: true,
                full_name: data.full_name,
                phone: data.phone,
                city: targetCity,
                district: targetDistrict,
                ward: targetWard,
                street: targetStreet,
                label: "HOME"
            };

            if (newAddresses.length > 0) {
                newAddresses[0] = { ...newAddresses[0], ...updatedAddress };
            } else {
                newAddresses.push(updatedAddress);
            }
        }

        const fullAddressStr = [targetStreet, targetWard, targetDistrict, targetCity].filter(Boolean).join(', ');

        updateMutation.mutate({
            full_name: data.full_name,
            phone: data.phone,
            addresses: newAddresses,
            address: fullAddressStr
        });
    };

    const handleAvatarUpload = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        updateMutation.mutate(formData);
        return false;
    };

    return {
        t,
        isLoading: isLoading || updateMutation.isPending,
        profile,
        isEditing,
        methods,
        provinces, districts, wards,
        handleEditToggle,
        handleSave: methods.handleSubmit(handleSave),
        handleAvatarUpload,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
    };
};
