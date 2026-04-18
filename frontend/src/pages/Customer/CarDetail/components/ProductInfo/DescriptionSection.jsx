import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const DescriptionSection = ({ description }) => {
    const { t } = useTranslation('products');

    if (!description) return null;

    const parseContent = (text) => {
        if (!text) return null;

        const lines = text.split('\n');
        const elements = [];
        let currentList = [];

        const processText = (str) => {
            const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
            return parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={i} className="italic text-slate-700 dark:text-slate-300">{part.slice(1, -1)}</em>;
                }
                return part;
            });
        };

        lines.forEach((line, index) => {
            if (line.trim().startsWith('- ')) {
                currentList.push(<li key={index} className="mb-2 last:mb-0 pl-1">{processText(line.trim().slice(2))}</li>);
            } else {
                if (currentList.length > 0) {
                    elements.push(
                        <ul key={`list-${index}`} className="list-disc list-inside mb-6 space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                            {currentList}
                        </ul>
                    );
                    currentList = [];
                }
                if (line.trim()) {
                    elements.push(
                        <p key={index} className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                            {processText(line)}
                        </p>
                    );
                }
            }
        });

        if (currentList.length > 0) {
            elements.push(
                <ul key="list-final" className="list-disc list-inside mb-6 space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                    {currentList}
                </ul>
            );
        }

        return elements;
    };

    return (
        <section id="overview" className="py-24 bg-white dark:bg-[#0a0a0b] border-b border-slate-100 dark:border-white/5">
            <div className="container mx-auto px-4 md:px-10 max-w-[1440px]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-[2px] bg-yellow-500"></div>
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-yellow-600 dark:text-yellow-500">
                                {t('detail.overview', 'TỔNG QUAN SẢN PHẨM')}
                            </span>
                        </div>
                        
                        <div className="text-lg md:text-xl font-medium antialiased">
                            {parseContent(description)}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;
