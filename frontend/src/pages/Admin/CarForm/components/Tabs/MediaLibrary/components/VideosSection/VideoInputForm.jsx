import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { Link, Plus, Loader2 } from 'lucide-react';
import { getMediaRules } from '../../schemas/media.schema';
import { useVideoManager } from '../../hooks/useVideoManager';

const VideoInputForm = () => {
    const { t } = useTranslation('adminCarForm');
    const rules = getMediaRules(t);
    const { onAddVideoSubmit, isLoading } = useVideoManager();
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (!videoUrl) {
            setError(rules.videoUrl[0].message);
            return;
        }
        if (!rules.videoUrl[1].pattern.test(videoUrl)) {
            setError(rules.videoUrl[1].message);
            return;
        }
        setError('');
        onAddVideoSubmit({ videoUrl }, () => setVideoUrl(''));
    };

    return (
        <div className="bg-slate-50 dark:bg-black/20 p-6 rounded-[24px] mb-10 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-[#1a1a1c]/60">
            <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 w-full relative">
                    <Form.Item 
                        validateStatus={error ? 'error' : ''}
                        help={error}
                        className="mb-0 w-full [&_.ant-form-item-explain-error]:text-right [&_.ant-form-item-explain-error]:absolute [&_.ant-form-item-explain-error]:top-[64px] [&_.ant-form-item-explain-error]:right-2 [&_.ant-form-item-explain-error]:text-[11px] [&_.ant-form-item-explain-error]:font-bold [&_.ant-form-item-explain-error]:tracking-wide"
                    >
                        <Input 
                            value={videoUrl}
                            onChange={(e) => {
                                setVideoUrl(e.target.value);
                                if (error) setError('');
                            }}
                            onPressEnter={(e) => {
                                e.preventDefault();
                                handleAdd();
                            }}
                            prefix={<Link size={20} className="text-yellow-500 mr-2" />}
                            className="w-full !h-[60px] !pl-4 !pr-4 !bg-white dark:!bg-[#222225] !border-slate-200 dark:!border-white/10 !rounded-2xl text-[14px] font-semibold text-slate-800 dark:text-slate-100 hover:!border-yellow-500 focus-within:!ring-2 focus-within:!ring-yellow-500/30 focus-within:!border-yellow-500 transition-all placeholder:text-slate-400/80" 
                            placeholder={t('mediaVideoUrlPlaceholder', 'Dán URL YouTube của chiếc xe này...')} 
                            disabled={isLoading}
                        />
                    </Form.Item>
                </div>
                <button 
                    type="button"
                    onClick={handleAdd}
                    disabled={isLoading}
                    className="h-[60px] pl-6 pr-8 bg-slate-900 text-white dark:bg-yellow-500 dark:text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-yellow-500/20 hover:bg-slate-800 dark:hover:bg-yellow-400 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group border-none"
                >
                    {isLoading ? (
                        <Loader2 size={24} className="animate-spin" />
                    ) : (
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
                            <Plus size={18} />
                        </div>
                    )}
                    <span>{t('mediaVideoAddBtn', 'Lưu Video')}</span>
                </button>
            </div>

        </div>
    );
};

export default VideoInputForm;
