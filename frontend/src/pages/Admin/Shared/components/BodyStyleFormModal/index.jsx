import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Tag, X } from 'lucide-react';

export const BodyStyleFormModal = ({ isOpen, onClose, onSave, t }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
        form.resetFields();
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={400}
            footer={null}
            closeIcon={false}
            centered
            destroyOnHidden
            classNames={{
                mask: "bg-[#070d1f]/80 backdrop-blur-md",
                content: "!p-0 bg-white dark:bg-[#141416] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/5",
                body: "bg-transparent",
            }}
        >
            <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-transparent dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center">
                        <Tag className="text-yellow-600 dark:text-yellow-500 fill-yellow-600/20 dark:fill-yellow-500/20" size={20} />
                    </div>
                    <h2 className="text-xl font-extrabold text-[#0c1324] dark:text-white tracking-tight">
                        {t('addBodyStyleTitle', 'Thêm Kiểu Dáng')}
                    </h2>
                </div>
                <button 
                    onClick={onClose}
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-red-500 hover:text-slate-800 dark:hover:text-white transition-all outline-none"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>

            <Form 
                form={form} 
                layout="vertical" 
                onFinish={handleFinish}
                className="px-8 mt-4 space-y-6"
                requiredMark={false}
            >
                <Form.Item 
                    name="name" 
                    rules={[{ required: true, message: t('requireName', 'Vui lòng nhập tên kiểu dáng') }]}
                    label={<span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-1">{t('bodyStyleNameLbl', 'Tên Kiểu Dáng')}</span>}
                >
                    <Input 
                        autoFocus
                        className="w-full !bg-slate-50 dark:!bg-white/5 !border-none !rounded-xl !px-5 !py-3.5 !text-base font-bold tracking-tight text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:!ring-2 focus:!ring-yellow-500/30 transition-all hover:!bg-slate-100 dark:hover:!bg-white/10 shadow-inner-sm" 
                        placeholder={t('bodyStyleNamePh', 'Ví dụ: Sedan')} 
                    />
                </Form.Item>

                <div className="pb-8 flex items-center gap-4 mt-8">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-[1] h-14 rounded-full text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px] hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none"
                    >
                        {t('common:cancel', 'Hủy bỏ')}
                    </button>
                    <button 
                        type="submit"
                        className="flex-[2] h-14 rounded-full bg-gradient-to-br from-[#eab308] to-[#ffd165] dark:from-[#eab308] dark:to-[#facc15] text-[#251a00] font-black uppercase tracking-[0.15em] text-[11px] shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none"
                    >
                        {t('common:create', 'LƯU THIẾT LẬP')}
                    </button>
                </div>
            </Form>
        </Modal>
    );
};
