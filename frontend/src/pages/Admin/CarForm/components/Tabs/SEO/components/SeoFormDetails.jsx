import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Edit, Image as ImageIcon } from 'lucide-react';
import { getSeoRules } from '../schemas/seo.schema';
import { SEO_CONSTANTS } from '../constants/seo.constants';

const SeoFormDetails = () => {
    const { t } = useTranslation('adminCarForm');
    const rules = getSeoRules(t);

    return (
        <section className="space-y-8">
            <div className="bg-slate-50 dark:bg-[#1a1a1c] rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-white/5">
                <div className="flex items-center mb-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                        {t('seoHeading', 'Cấu hình SEO & Metadata')}
                    </h2>
                </div>

                <div className="space-y-6">
                    {/* Slug */}
                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                            {t('slugLabel', 'Slug URL')}
                        </label>
                        <Form.Item
                            name="slug"
                            rules={rules.slug}
                            className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                        >
                            <Input
                                prefix={<span className="text-slate-500 select-none mr-1">{SEO_CONSTANTS.URL_PREFIX}</span>}
                                className="w-full !h-[50px] !bg-white dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-semibold text-slate-900 dark:text-white focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all custom-addon-input"
                                placeholder={t('slugPlaceholder', 'VD: porsche-911-gt3-rs')}
                            />
                        </Form.Item>
                    </div>

                    {/* Meta Title */}
                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                            {t('metaTitleLabel', 'Meta Title')}
                        </label>
                        <Form.Item
                            name="metaTitle"
                            rules={rules.metaTitle}
                            className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                        >
                            <Input
                                showCount
                                maxLength={SEO_CONSTANTS.MAX_TITLE_LENGTH}
                                className="w-full !h-[50px] !bg-white dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-semibold text-slate-900 dark:text-white focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all"
                                placeholder={t('metaTitlePlaceholder', 'Tiêu đề hiển thị trên Google')}
                            />
                        </Form.Item>
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                            {t('metaDescLabel', 'Meta Description')}
                        </label>
                        <Form.Item
                            name="metaDescription"
                            rules={rules.metaDescription}
                            className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                        >
                            <Input.TextArea
                                showCount
                                maxLength={SEO_CONSTANTS.MAX_DESC_LENGTH}
                                rows={4}
                                className="w-full !bg-white dark:!bg-[#222225] !border-none !rounded-xl !p-4 text-sm text-slate-800 dark:text-slate-300 focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all resize-none custom-scrollbar"
                                placeholder={t('metaDescPlaceholder', 'Mô tả ngắn gọn dành cho SEO...')}
                            />
                        </Form.Item>
                    </div>

                    {/* Meta Keywords */}
                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                            {t('metaKeywordsLabel', 'Meta Keywords')}
                        </label>
                        <Form.Item
                            name="metaKeywords"
                            className="mb-0"
                        >
                            <Select
                                mode="tags"
                                placeholder={t('metaKeywordsPlaceholder', 'Thêm từ khoá (Enter để xác nhận)')}
                                className="w-full min-h-[50px] !bg-white dark:!bg-[#222225] !border-none !rounded-xl !px-1 text-sm font-semibold text-slate-900 dark:text-white focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all custom-select-tags"
                                tokenSeparators={[',']}
                                dropdownStyle={{ display: 'none' }}
                            />
                        </Form.Item>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                            {t('ogImageLabel', 'OG Image (Social Preview)')}
                        </label>
                        <Form.Item
                            name="ogImage"
                            rules={rules.ogImage}
                            className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                        >
                            <Input
                                prefix={<ImageIcon size={18} className="text-slate-400 mr-2" />}
                                className="w-full !h-[50px] !bg-white dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all hover:bg-slate-50 dark:hover:bg-[#2a2a2e]"
                                placeholder={t('ogImagePlaceholder', 'VD: https://storage.com/og-image.jpg')}
                            />
                        </Form.Item>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SeoFormDetails;
