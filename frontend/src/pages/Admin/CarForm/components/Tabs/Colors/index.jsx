import React from 'react';
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Plus, Palette } from 'lucide-react';
import ColorCard from './components/ColorCard';

const TabColors = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {t('colorsTabTitle', 'CẤU HÌNH MÀU SẮC')}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl text-sm leading-relaxed">
                        {t('colorsTabDesc', 'Quản lý danh sách màu sơn ngoại thất')}
                    </p>
                </div>
            </header>

            <Form.List name="colors">
                {(fields, { add, remove }) => (
                    <div className="flex flex-col gap-8">
                        {fields.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-black/10 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                                <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-[#1a1a1c] border border-slate-100 dark:border-white/5 flex items-center justify-center shadow-inner mb-6">
                                    <Palette size={32} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 mb-2">
                                    {t('emptyColorsTitle', 'Chưa có cấu hình màu sắc')}
                                </h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    {t('emptyColorsDesc', 'Thêm các phiên bản màu sắc thực tế để hiển thị trên 3D Configurator')}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => add()}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 dark:bg-gradient-to-r dark:from-[#eab308] dark:to-[#ffd165] text-white dark:text-slate-900 text-[13px] font-black tracking-wide shadow-xl shadow-slate-900/10 dark:shadow-yellow-500/10 active:scale-95 transition-all cursor-pointer border-none"
                                >
                                    <Plus size={16} />
                                    {t('addColorBtn', 'Thêm Phiên Bản Màu')}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {fields.map(({ key, name, ...restField }) => (
                                    <ColorCard
                                        key={key}
                                        name={name}
                                        restField={restField}
                                        removeColor={removeColor => remove(name)}
                                    />
                                ))}

                                <button
                                    type="button"
                                    className="mt-8 w-full h-14 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-50/50 dark:hover:bg-yellow-500/5 transition-all text-slate-500 dark:text-slate-400 font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                                    onClick={() => add()}
                                >
                                    <Plus size={18} />
                                    {t('addColorBtn', 'Thêm Phiên Bản Màu')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Form.List>
        </div>
    );
};

export default TabColors;
