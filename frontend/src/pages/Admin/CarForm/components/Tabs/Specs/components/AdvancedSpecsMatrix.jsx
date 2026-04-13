import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, ClipboardList } from 'lucide-react';
import SpecItemRow from './Shared/SpecItemRow';

const AdvancedSpecsMatrix = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl p-8 lg:p-10 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/5">
            <Form.List name="specs">
                {(categoryFields, { add: addCategory, remove: removeCategory }) => (
                    <>
                        <header className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-6 flex-1">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-yellow-500 whitespace-nowrap">
                                    {t('specsMatrixTitle', 'Ma trận Thông Số Nâng Cao')}
                                </h3>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
                            </div>
                            <Button
                                type="text"
                                onClick={() => addCategory()}
                                className="ml-6 flex items-center gap-2 px-6 py-5 rounded-full bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-[10px] font-black uppercase tracking-widest hover:!bg-yellow-500 hover:!text-white transition-all border-none"
                                icon={<Plus size={16} />}
                            >
                                {t('addCategoryBtn', 'Thêm Nhóm')}
                            </Button>
                        </header>

                        <div className="space-y-10">
                            {categoryFields.map(({ key, name, ...restField }) => (
                                <div key={key} className="bg-slate-50/50 dark:bg-white/[0.02] rounded-2xl p-8 border border-slate-100 dark:border-white/5 relative group/category">
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(name)}
                                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 opacity-0 group-hover/category:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-500/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="flex items-center gap-4 mb-8">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'category']}
                                            rules={[{ required: true, message: 'Nhập tên nhóm' }]}
                                            className="mb-0 w-full max-w-md"
                                        >
                                            <Input
                                                className="!bg-transparent !border-b-2 !border-slate-200 dark:!border-white/10 focus:!border-yellow-500 !border-t-0 !border-x-0 !rounded-none text-slate-900 dark:text-white font-black text-xl px-0 focus:!ring-0 transition-all pb-2 placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                                placeholder={t('categoryPlaceholder', 'Kích thước & Trọng lượng')}
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.List name={[name, 'items']}>
                                        {(itemFields, { add: addItem, remove: removeItem }) => (
                                            <div className="space-y-6">
                                                {itemFields.length > 0 && (
                                                    <div className="grid grid-cols-12 gap-6 items-center px-4 mb-2">
                                                        <div className="col-span-1"></div>
                                                        <div className="col-span-5 text-[9px] font-black uppercase tracking-widest text-slate-400">{t('specLabelHeader', 'Tên thông số')}</div>
                                                        <div className="col-span-5 text-[9px] font-black uppercase tracking-widest text-slate-400">{t('specValueHeader', 'Giá trị')}</div>
                                                        <div className="col-span-1"></div>
                                                    </div>
                                                )}

                                                {itemFields.length === 0 && (
                                                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 dark:text-slate-600 bg-white/50 dark:bg-black/20">
                                                        <ClipboardList size={32} className="mb-3 opacity-30" />
                                                        <p className="text-[10px] uppercase tracking-widest font-black">{t('emptySpecGroup', 'Chưa có thông số chi tiết')}</p>
                                                    </div>
                                                )}

                                                <div className="space-y-3">
                                                    {itemFields.map(({ key: itemKey, name: itemName, ...restItemField }) => (
                                                        <SpecItemRow
                                                            key={itemKey}
                                                            itemKey={itemKey}
                                                            itemName={itemName}
                                                            restItemField={restItemField}
                                                            removeItem={removeItem}
                                                        />
                                                    ))}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => addItem()}
                                                    className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-500 hover:opacity-80 transition-all pl-4 bg-transparent border-none cursor-pointer"
                                                >
                                                    <Plus size={16} />
                                                    {itemFields.length === 0 ? t('addFirstSpecItem', 'Thêm chi tiết đầu tiên') : t('addSpecItemBtn', 'Thêm chi tiết thông số')}
                                                </button>
                                            </div>
                                        )}
                                    </Form.List>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Form.List>
        </section>
    );
};

export default AdvancedSpecsMatrix;
