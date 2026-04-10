import { Form, Button, Input, Select } from 'antd';
import { Controller } from 'react-hook-form';
import { CONTACT_SUBJECTS } from '../../constants/contact.constants';
import { ChevronDown } from 'lucide-react';

const ContactForm = ({ control, errors, isSubmitting, handleSubmit, t }) => {
    return (
        <div className="bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <Form layout="vertical" onFinish={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Full Name */}
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label={<span className="text-[11px] uppercase tracking-widest ml-2 font-bold text-slate-500 dark:text-slate-400">{t('form_fullName')}</span>}
                                validateStatus={errors.fullName ? 'error' : ''}
                                help={errors.fullName?.message}
                                className="mb-0"
                            >
                                <Input
                                    {...field}
                                    className="w-full !bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-white/10 hover:!border-yellow-500 focus:!border-yellow-500 focus:!shadow-[0_0_0_2px_rgba(234,179,8,0.2)] !rounded-2xl !h-[56px] !px-6 !text-slate-900 dark:!text-white transition-all font-medium"
                                />
                            </Form.Item>
                        )}
                    />

                    {/* Phone */}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label={<span className="text-[11px] uppercase tracking-widest ml-2 font-bold text-slate-500 dark:text-slate-400">{t('form_phone')}</span>}
                                validateStatus={errors.phone ? 'error' : ''}
                                help={errors.phone?.message}
                                className="mb-0"
                            >
                                <Input
                                    {...field}
                                    type="tel"
                                    className="w-full !bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-white/10 hover:!border-yellow-500 focus:!border-yellow-500 focus:!shadow-[0_0_0_2px_rgba(234,179,8,0.2)] !rounded-2xl !h-[56px] !px-6 !text-slate-900 dark:!text-white transition-all font-medium"
                                />
                            </Form.Item>
                        )}
                    />
                </div>

                {/* Email */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label={<span className="text-[11px] uppercase tracking-widest ml-2 font-bold text-slate-500 dark:text-slate-400">{t('form_email')}</span>}
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email?.message}
                            className="mb-0"
                        >
                            <Input
                                {...field}
                                type="email"
                                className="w-full !bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-white/10 hover:!border-yellow-500 focus:!border-yellow-500 focus:!shadow-[0_0_0_2px_rgba(234,179,8,0.2)] !rounded-2xl !h-[56px] !px-6 !text-slate-900 dark:!text-white transition-all font-medium"
                            />
                        </Form.Item>
                    )}
                />

                {/* Subject Dropdown */}
                <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label={<span className="text-[11px] uppercase tracking-widest ml-2 font-bold text-slate-500 dark:text-slate-400">{t('form_subject')}</span>}
                            validateStatus={errors.subject ? 'error' : ''}
                            help={errors.subject?.message}
                            className="mb-0 [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500 focus:[&_.ant-select-selector]:!border-yellow-500"
                        >
                            <Select
                                {...field}
                                className="w-full !h-[56px]"
                                classNames={{ popup: "!rounded-2xl dark:bg-slate-800" }}
                                suffixIcon={<ChevronDown className="w-5 h-5 text-slate-400" />}
                                options={Object.values(CONTACT_SUBJECTS).map((subject) => ({
                                    value: subject,
                                    label: <span className="font-medium text-slate-700 dark:text-slate-200">{t(`form_subjects_${subject}`)}</span>
                                }))}
                            />
                        </Form.Item>
                    )}
                />

                {/* Message */}
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label={<span className="text-[11px] uppercase tracking-widest ml-2 font-bold text-slate-500 dark:text-slate-400">{t('form_message')}</span>}
                            validateStatus={errors.message ? 'error' : ''}
                            help={errors.message?.message}
                            className="mb-0"
                        >
                            <Input.TextArea
                                {...field}
                                rows={5}
                                className="w-full !bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-white/10 hover:!border-yellow-500 focus:!border-yellow-500 focus:!shadow-[0_0_0_2px_rgba(234,179,8,0.2)] !rounded-2xl !p-6 !text-slate-900 dark:!text-white transition-all resize-none font-medium"
                            />
                        </Form.Item>
                    )}
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    className="w-full mt-8 !h-[60px] !bg-yellow-500 hover:!bg-yellow-400 dark:!bg-[linear-gradient(135deg,#eab308,#d4af37)] !text-slate-900 font-bold text-[13px] md:text-[14px] uppercase tracking-[0.2em] !rounded-2xl transition-all border-none shadow-[0_8px_20px_rgba(234,179,8,0.25)] hover:shadow-[0_12px_25px_rgba(234,179,8,0.35)] dark:shadow-[0_8px_25px_rgba(212,175,55,0.4)] dark:hover:shadow-[0_12px_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group"
                >
                    <span>{t('form_submit')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </Button>
            </Form>
        </div>
    );
};

export default ContactForm;
