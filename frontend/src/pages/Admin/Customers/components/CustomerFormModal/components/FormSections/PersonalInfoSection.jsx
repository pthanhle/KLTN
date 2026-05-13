import { useState } from 'react';
import { Form, Input, Upload, message } from 'antd';
import { User, Camera, PenSquare, Loader2 } from 'lucide-react';
import { SectionHeader } from '../UI/SectionHeader';
import axiosClient from '@/utils/axiosClient';

export const PersonalInfoSection = ({ t, schemas }) => {
    const [isUploading, setIsUploading] = useState(false);
    const form = Form.useFormInstance();
    const avatarUrl = Form.useWatch('avatar', form);

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            // We set the file object itself to the form value
            form.setFieldsValue({ avatar: file });
        };
        reader.readAsDataURL(file);
        return false; // Prevent auto-upload
    };

    // Helper to get preview URL
    const getAvatarPreview = () => {
        if (!avatarUrl) return null;
        if (typeof avatarUrl === 'string') return avatarUrl;
        if (avatarUrl instanceof File || avatarUrl instanceof Blob) {
            return URL.createObjectURL(avatarUrl);
        }
        if (avatarUrl.originFileObj) {
            return URL.createObjectURL(avatarUrl.originFileObj);
        }
        return null;
    };

    return (
        <section className="py-8 border-b border-slate-100 dark:border-white/5">
            <SectionHeader icon={User} title={t('adminCustomers:sectionPersonalInfo', 'Thông Tin Cá Nhân')} />

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-auto flex justify-center">
                    <div className="relative group cursor-pointer w-24 h-24">
                        <Upload 
                            name="avatar" 
                            showUploadList={false} 
                            beforeUpload={handleUpload}
                            accept="image/*"
                            disabled={isUploading}
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-50 dark:bg-[#141416] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden hover:border-yellow-500 transition-all relative">
                                {getAvatarPreview() ? (
                                    <img 
                                        src={getAvatarPreview()} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75" 
                                    />
                                ) : (
                                    <Camera size={28} strokeWidth={1.5} className="text-slate-400 group-hover:text-yellow-500 transition-colors" />
                                )}
                                
                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-full backdrop-blur-[2px]">
                                        <Loader2 size={24} className="text-white animate-spin" />
                                    </div>
                                )}
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                                    <Camera size={20} className="text-white" />
                                </div>
                            </div>
                        </Upload>
                        <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-[#141416] pointer-events-none z-10">
                            <PenSquare size={14} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                <Form.Item name="avatar" hidden>
                    <Input />
                </Form.Item>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                    <Form.Item 
                        name="full_name" 
                        label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelFullName', 'Họ tên')}</span>}
                        rules={schemas?.fullName}
                        className="mb-0 col-span-1 sm:col-span-2"
                    >
                        <Input 
                            className="w-full h-[54px] bg-slate-50 dark:bg-white/5 border-transparent rounded-xl px-5 text-[14px] focus:bg-white dark:focus:bg-[#141416] focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-white/10" 
                            placeholder={t('adminCustomers:labelFullName', 'Nhập tên khách hàng...')} 
                        />
                    </Form.Item>

                    <Form.Item 
                        name="phone" 
                        label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelPhone', 'Số điện thoại')}</span>}
                        rules={schemas?.phone}
                        className="mb-0"
                    >
                        <Input 
                            className="w-full h-[54px] bg-slate-50 dark:bg-white/5 border-transparent rounded-xl px-5 text-[14px] focus:bg-white dark:focus:bg-[#141416] focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-white/10" 
                            placeholder="+84 ..." 
                        />
                    </Form.Item>

                    <Form.Item 
                        name="email" 
                        label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelEmail', 'Email')}</span>}
                        rules={schemas?.email}
                        className="mb-0"
                    >
                        <Input 
                            className="w-full h-[54px] bg-slate-50 dark:bg-white/5 border-transparent rounded-xl px-5 text-[14px] focus:bg-white dark:focus:bg-[#141416] focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-white/10" 
                            placeholder="example@email.com" 
                        />
                    </Form.Item>

                    <Form.Item 
                        name="address" 
                        label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t('adminCustomers:labelAddress', 'Địa chỉ')}</span>}
                        className="mb-0 col-span-1 sm:col-span-2"
                    >
                        <Input 
                            className="w-full h-[54px] bg-slate-50 dark:bg-white/5 border-transparent rounded-xl px-5 text-[14px] focus:bg-white dark:focus:bg-[#141416] focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-white/10" 
                            placeholder={t('adminCustomers:placeholderAddress', 'Thành phố, Quận/Huyện...')} 
                        />
                    </Form.Item>
                </div>
            </div>
        </section>
    );
};
