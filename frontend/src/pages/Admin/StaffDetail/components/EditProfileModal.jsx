import React, { useState, useEffect } from 'react';
import { Modal, Input, Avatar, Upload, message, Spin } from 'antd';
import { User, Phone, Camera, Loader2 } from 'lucide-react';
import { uploadSingleImage } from '@/services/api/upload.api';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';
import { useQueryClient } from '@tanstack/react-query';

const EditProfileModal = ({ open, onClose, staff }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (open && staff) {
            setFullName(staff.fullName || '');
            setPhone(staff.phone || '');
            setAvatarUrl(staff.avatarUrl || '');
        }
    }, [open, staff]);

    const handleAvatarUpload = async ({ file }) => {
        setUploading(true);
        try {
            const url = await uploadSingleImage(file);
            setAvatarUrl(url);
        } catch {
            message.error('Tải ảnh lên thất bại');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!fullName.trim()) {
            message.error('Họ và tên không được để trống');
            return;
        }
        setSaving(true);
        try {
            await AdminStaffAPI.updateProfile(staff._id, {
                full_name: fullName.trim(),
                phone: phone.trim(),
                avatar: avatarUrl,
            });
            message.success('Cập nhật hồ sơ thành công');
            queryClient.invalidateQueries({ queryKey: ['admin-staff-detail', staff._id] });
            queryClient.invalidateQueries({ queryKey: ['admin-staff'] });
            onClose();
        } catch (err) {
            message.error(err?.response?.data?.message || 'Cập nhật thất bại');
        } finally {
            setSaving(false);
        }
    };

    const initials = fullName?.trim().charAt(0).toUpperCase() || '?';

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={<span className="text-slate-900 dark:text-white font-bold text-lg">Chỉnh sửa hồ sơ</span>}
            className="[&_.ant-modal-content]:dark:bg-[#1c1c1e] [&_.ant-modal-content]:dark:border [&_.ant-modal-content]:dark:border-white/10 [&_.ant-modal-header]:dark:bg-[#1c1c1e] [&_.ant-modal-title]:dark:text-white [&_.ant-modal-close]:dark:text-slate-400"
            width={480}
            centered
        >
            <div className="flex flex-col gap-6 pt-4">
                {/* Avatar upload */}
                <div className="flex flex-col items-center gap-3">
                    <Upload
                        showUploadList={false}
                        customRequest={handleAvatarUpload}
                        accept="image/*"
                        disabled={uploading}
                    >
                        <div className="relative cursor-pointer group">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={fullName}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-[#141416] shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-4 border-white dark:border-[#141416] shadow-lg text-3xl font-bold text-slate-500 dark:text-slate-300">
                                    {initials}
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                {uploading ? (
                                    <Spin size="small" />
                                ) : (
                                    <Camera size={22} className="text-white" />
                                )}
                            </div>
                        </div>
                    </Upload>
                    <p className="text-xs text-slate-400">Nhấp vào ảnh để thay đổi</p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Họ và tên</label>
                    <Input
                        prefix={<User size={16} className="text-slate-400 mr-1" />}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-11 rounded-lg dark:bg-[#141416] dark:text-white dark:border-white/10"
                        placeholder="Họ và tên nhân viên"
                    />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Số điện thoại</label>
                    <Input
                        prefix={<Phone size={16} className="text-slate-400 mr-1" />}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="h-11 rounded-lg dark:bg-[#141416] dark:text-white dark:border-white/10"
                        placeholder="0901234567"
                        maxLength={11}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-white/5">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="h-10 px-5 rounded-lg font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || uploading}
                        className="h-10 px-6 rounded-lg font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-md shadow-yellow-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {saving && <Loader2 size={16} className="animate-spin" />}
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileModal;
