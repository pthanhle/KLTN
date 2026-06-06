import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, CornerDownRight } from 'lucide-react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

const EvidenceImages = ({ urls }) => {
    if (!urls?.length) return null;
    return (
        <div className="flex flex-wrap gap-1.5 mt-2 pl-6">
            <Image.PreviewGroup>
                {urls.map((url, i) => (
                    <Image
                        key={i}
                        src={url}
                        width={52}
                        height={52}
                        className="object-cover rounded-md"
                        style={{ borderRadius: '6px' }}
                    />
                ))}
            </Image.PreviewGroup>
        </div>
    );
};

const ChecklistItem = ({ item }) => {
    const { t } = useTranslation('tracking');
    const isNormal = item.status === 'normal';
    const isWarning = item.status === 'warning';
    const isCritical = item.status === 'critical';

    if (isCritical) {
        return (
            <div className="flex flex-col relative py-3 bg-red-50 dark:bg-[#93000a]/10 px-4 -mx-4 rounded-lg overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col flex-1 pr-10">
                        <span className="text-red-700 dark:text-white text-sm font-bold">{item.name}</span>
                        {item.action_required && (
                            <div className="flex items-start gap-1.5 mt-2">
                                <CornerDownRight className="w-3.5 h-3.5 text-red-500 dark:text-[#ffb4ab]/70 mt-0.5 flex-shrink-0" />
                                <p className="text-[11px] text-red-600 dark:text-[#ffb4ab] font-medium leading-relaxed">
                                    <span className="font-bold uppercase tracking-wider">{t('label_diagnosis', 'Chẩn đoán')}:</span> {item.action_required}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="shrink-0 flex items-center justify-center">
                        <XCircle className="text-red-600 dark:text-[#ffb4ab] w-5 h-5 fill-current opacity-80" />
                    </div>
                </div>
                <EvidenceImages urls={item.media_urls} />
            </div>
        );
    }

    if (isWarning) {
        return (
            <div className="flex flex-col relative py-3 bg-yellow-50 dark:bg-yellow-600/10 px-4 -mx-4 rounded-lg overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col flex-1 pr-10">
                        <span className="text-yellow-700 dark:text-[#ffd165] text-sm font-bold">{item.name}</span>
                        {item.action_required && (
                            <div className="flex items-start gap-1.5 mt-2">
                                <CornerDownRight className="w-3.5 h-3.5 text-yellow-500 dark:text-[#ffd165]/70 mt-0.5 flex-shrink-0" />
                                <p className="text-[11px] text-yellow-700 dark:text-[#ffd165] font-medium leading-relaxed">
                                    <span className="font-bold uppercase tracking-wider">{t('label_note', 'Ghi chú')}:</span> {item.action_required}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="shrink-0 flex items-center justify-center">
                        <AlertTriangle className="text-yellow-600 dark:text-[#ffd165] w-5 h-5 fill-current opacity-80" />
                    </div>
                </div>
                <EvidenceImages urls={item.media_urls} />
            </div>
        );
    }

    // Normal State
    return (
        <div className="flex items-center justify-between py-2 group">
            <span className="text-slate-600 dark:text-[#d3c5ac] text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.name}</span>
            <CheckCircle2 className="text-emerald-500 dark:text-[#4edea3] w-5 h-5 fill-current opacity-20" />
        </div>
    );
};

export default ChecklistItem;
