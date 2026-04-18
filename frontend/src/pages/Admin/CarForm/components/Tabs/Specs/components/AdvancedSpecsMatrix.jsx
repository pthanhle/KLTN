import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, ClipboardList } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SpecItemRow from './Shared/SpecItemRow';

const AdvancedSpecsMatrix = () => {
    const { t } = useTranslation('adminCarForm');
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event, items, move) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => item.key === active.id);
            const newIndex = items.findIndex((item) => item.key === over.id);
            move(oldIndex, newIndex);
        }
    };

    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl p-8 lg:p-10 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/5">
            <header className="flex items-center gap-6 mb-10 w-full">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-yellow-500 whitespace-nowrap">
                    {t('specsMatrixTitle', 'Ma trận Thông Số Nâng Cao')}
                </h3>
                <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
            </header>

            <Form.List name="specs">
                {(categoryFields, { add: addCategory, remove: removeCategory }) => (
                    <>
                        <div className="space-y-10">
                            {categoryFields.map(({ key, name, ...restField }) => (
                                <div key={key} className="bg-white dark:bg-[#1a1a1c] rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                                    <div className="px-6 py-5 bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'category']}
                                                rules={[{ required: true, message: 'Nhập tên nhóm' }]}
                                                className="mb-0 w-full"
                                                required={false}
                                            >
                                                <Input
                                                    className="w-full !h-12 !bg-white dark:!bg-[#222225] !border-slate-200 dark:!border-white/10 !rounded-xl px-4 text-slate-900 dark:text-white font-semibold text-base focus:!ring-2 focus:!ring-yellow-500/50 shadow-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                    placeholder={t('categoryPlaceholder', 'VD: Kích thước & Trọng lượng')}
                                                />
                                            </Form.Item>
                                        </div>
                                        <Button
                                            type="primary"
                                            danger
                                            icon={<Trash2 size={18} />}
                                            onClick={() => removeCategory(name)}
                                            className="w-12 h-12 flex items-center justify-center !rounded-xl transition-all cursor-pointer border-none shadow-lg shadow-red-500/20 hover:scale-110 active:scale-95 shrink-0"
                                            title={t('removeCategoryBtn', 'Xóa Nhóm Thông Số')}
                                        />
                                    </div>

                                    <Form.List name={[name, 'items']}>
                                        {(itemFields, { add: addItem, remove: removeItem, move: moveItem }) => (
                                            <div className="flex flex-col">
                                                {itemFields.length > 0 && (
                                                    <div className="grid grid-cols-[40px_1fr_1fr_40px] gap-4 items-center px-4 py-3 bg-slate-50/30 dark:bg-white/[0.01] border-b border-slate-100 dark:border-white/5 overflow-hidden">
                                                        <div></div>
                                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('specLabelHeader', 'Tên thông số')}</div>
                                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('specValueHeader', 'Giá trị')}</div>
                                                        <div></div>
                                                    </div>
                                                )}

                                                <DndContext 
                                                    sensors={sensors} 
                                                    collisionDetection={closestCenter} 
                                                    onDragEnd={(e) => handleDragEnd(e, itemFields, moveItem)}
                                                >
                                                    <SortableContext items={itemFields.map(f => f.key)} strategy={verticalListSortingStrategy}>
                                                        <div className="flex flex-col">
                                                            {itemFields.map(({ key: itemKey, name: itemName, ...restItemField }, index) => (
                                                                <SpecItemRow
                                                                    key={itemKey}
                                                                    itemKey={itemKey}
                                                                    itemName={itemName}
                                                                    restItemField={restItemField}
                                                                    removeItem={removeItem}
                                                                    index={index}
                                                                />
                                                            ))}
                                                        </div>
                                                    </SortableContext>
                                                </DndContext>

                                                {itemFields.length === 0 && (
                                                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600">
                                                        <ClipboardList size={32} className="mb-3 opacity-30" />
                                                        <p className="text-[10px] uppercase tracking-widest font-black">{t('emptySpecGroup', 'Chưa có thông số chi tiết')}</p>
                                                    </div>
                                                )}

                                                <div className="p-4 border-t border-slate-100 dark:border-white/5">
                                                    <button
                                                        type="button"
                                                        onClick={() => addItem()}
                                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-500 hover:opacity-80 transition-all pl-2 bg-transparent border-none cursor-pointer"
                                                    >
                                                        <Plus size={16} />
                                                        {itemFields.length === 0 ? t('addFirstSpecItem', 'Thêm chi tiết đầu tiên') : t('addSpecItemBtn', 'Thêm chi tiết thông số')}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Form.List>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="mt-8 w-full h-14 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-50/50 dark:hover:bg-yellow-500/5 transition-all text-slate-500 dark:text-slate-400 font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                            onClick={() => addCategory()}
                        >
                            <Plus size={18} />
                            {t('addCategoryBtn', ' Thêm Nhóm Thông Số')}
                        </button>
                    </>
                )}
            </Form.List>
        </section>
    );
};

export default AdvancedSpecsMatrix;
