import { useRef } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Bold, Italic, List } from 'lucide-react';
import { getOverviewRules } from '../../../../schemas/carOverviewSchema';

const { TextArea } = Input;

const GeneralInfoCard = () => {
    const { t } = useTranslation('adminCarForm');
    const rules = getOverviewRules();
    const form = Form.useFormInstance();
    const textAreaRef = useRef(null);

    const applyFormat = (prefix, suffix = '') => {
        const textArea = textAreaRef.current?.resizableTextArea?.textArea;
        if (!textArea) return;

        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const text = textArea.value;
        const selectedText = text.substring(start, end);
        
        let newText;
        let newCursorPos;

        if (prefix === 'list') {
            const lines = selectedText.split('\n');
            const formattedLines = lines.map(line => line.startsWith('- ') ? line : `- ${line}`);
            const replacement = formattedLines.join('\n');
            newText = text.substring(0, start) + replacement + text.substring(end);
            newCursorPos = start + replacement.length;
        } else {
            const replacement = prefix + selectedText + suffix;
            newText = text.substring(0, start) + replacement + text.substring(end);
            newCursorPos = start + prefix.length + selectedText.length + suffix.length;
        }

        form.setFieldsValue({ description: newText });

        setTimeout(() => {
            textArea.focus();
            textArea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
            <div className="space-y-6">
                
                <Form.Item 
                    name="name" 
                    label={<span className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black mb-1 block">{t('nameLabel', 'Tên Phân Phối')}</span>}
                    rules={rules.name}
                    className="mb-8"
                >
                    <Input 
                        className="w-full !bg-slate-50 dark:!bg-white/5 !border-none !rounded-2xl !px-6 !py-4 !text-2xl lg:!text-3xl font-black tracking-tight text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:!ring-2 focus:!ring-yellow-500/30 transition-all hover:!bg-slate-100 dark:hover:!bg-white/10 shadow-inner-sm" 
                        placeholder={t('namePlaceholder', 'VD: Porsche 911 GT3 RS (2024)')} 
                    />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <Form.Item 
                        name="sku" 
                        label={<span className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black mb-1 block">{t('skuLabel', 'Mã SKU')}</span>}
                        rules={rules.sku}
                        className="mb-0"
                    >
                        <Input 
                            prefix={<span className="text-slate-400 dark:text-slate-600 font-mono text-lg mr-2 font-bold">#</span>}
                            className="w-full !bg-slate-50 dark:!bg-white/5 !border-none !rounded-xl !px-5 !py-3.5 font-mono !text-base text-slate-700 dark:text-[#4edea3] focus:!ring-2 focus:!ring-yellow-500/30 transition-all hover:!bg-slate-100 dark:hover:!bg-white/10" 
                            placeholder={t('skuPlaceholder', 'POR-911-GT3')} 
                            style={{ textTransform: 'uppercase' }}
                        />
                    </Form.Item>

                    <Form.Item 
                        name="tagline" 
                        label={<span className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black mb-1 block">{t('taglineLabel', 'Khẩu hiệu')}</span>}
                        rules={rules.tagline}
                        className="mb-0"
                    >
                        <Input 
                            className="w-full !bg-slate-50 dark:!bg-white/5 !border-none !rounded-xl !px-5 !py-3.5 !text-base text-slate-900 dark:text-slate-200 focus:!ring-2 focus:!ring-yellow-500/30 transition-all hover:!bg-slate-100 dark:hover:!bg-white/10" 
                            placeholder={t('taglinePlaceholder', 'Precision Engineering.')} 
                        />
                    </Form.Item>
                </div>

                <div className="group mt-8">
                    <label className="block text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black mb-3">{t('descLabel', 'Mô tả chi tiết')}</label>
                    <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#1a1a1c]/50 focus-within:ring-2 focus-within:ring-yellow-500/50 transition-all shadow-sm">
                        <div className="flex items-center gap-1 p-2 bg-white dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                            <button 
                                type="button" 
                                onClick={() => applyFormat('**', '**')}
                                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors border-none bg-transparent"
                            >
                                <Bold size={18} />
                            </button>
                            <button 
                                type="button" 
                                onClick={() => applyFormat('*', '*')}
                                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors border-none bg-transparent"
                            >
                                <Italic size={18} />
                            </button>
                            <button 
                                type="button" 
                                onClick={() => applyFormat('list')}
                                className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors border-none bg-transparent"
                            >
                                <List size={18} />
                            </button>
                        </div>
                        <Form.Item name="description" rules={rules.description} className="mb-0">
                            <TextArea 
                                ref={textAreaRef}
                                className="w-full !bg-transparent !border-none !px-6 !py-5 !text-base text-slate-700 dark:text-slate-300 focus:!ring-0 leading-relaxed custom-scrollbar min-h-[300px]" 
                                placeholder={t('descPlaceholder', 'Nhập nội dung mô tả chi tiết về khả năng vận hành, thiết kế ngoại thất và triết lý của xe...')} 
                                autoSize={{ minRows: 10, maxRows: 20 }}
                            />
                        </Form.Item>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GeneralInfoCard;
