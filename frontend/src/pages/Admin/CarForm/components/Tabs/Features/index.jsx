import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Layers, PlusCircle } from 'lucide-react';
import FeatureBlock from './components/FeatureBlock';

const FeaturesTab = ({ form }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                        {t('featuresTabTitle', 'CÔNG NGHỆ NỔI BẬT & TÍNH NĂNG')}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl text-sm leading-relaxed">
                        {t('featuresTabDesc', 'Quản lý thông tin trang bị, công nghệ và đặc tính kỹ thuật của dòng xe.')}
                    </p>
                </div>
            </header>

            <Form.List name="features">
                {(fields, { add, remove }) => (
                    <div className="space-y-12">
                        {fields.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-black/10 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                                <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-[#1a1a1c] border border-slate-100 dark:border-white/5 flex items-center justify-center shadow-inner mb-6">
                                    <Layers size={32} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 mb-2">
                                    {t('emptyFeatureGroups', 'Chưa có nhóm tính năng nào')}
                                </h3>
                                <p className="text-slate-400 text-sm mb-8 max-w-md text-center">
                                    {t('emptyFeatureGroupsDesc', 'Bắt đầu thêm các đoạn mô tả kèm theo hình ảnh cực kỳ lung linh theo từng chuyên mục. Giao diện UX của người dùng sẽ hiển thị cuộn trang với các điểm nổi bật này!')}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => add()}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 dark:bg-gradient-to-r dark:from-[#eab308] dark:to-[#ffd165] text-white dark:text-slate-900 text-[13px] font-black tracking-wide shadow-xl shadow-slate-900/10 dark:shadow-yellow-500/10 active:scale-95 transition-all cursor-pointer border-none"
                                >
                                    <PlusCircle size={16} />
                                    {t('addFeatureGroupBtn', 'Thêm Nhóm Tính Năng')}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {fields.map(({ key, name, ...restField }) => (
                                    <FeatureBlock
                                        key={key}
                                        name={name}
                                        restField={restField}
                                        removeFeature={remove}
                                    />
                                ))}

                                <button
                                    type="button"
                                    className="mt-8 w-full h-14 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-50/50 dark:hover:bg-yellow-500/5 transition-all text-slate-500 dark:text-slate-400 font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                                    onClick={() => add()}
                                >
                                    <PlusCircle size={18} />
                                    <span className="uppercase tracking-widest">{t('addFeatureGroupBtn', 'Thêm Nhóm Tính Năng')}</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Form.List>
        </div>
    );
};

export default FeaturesTab;
