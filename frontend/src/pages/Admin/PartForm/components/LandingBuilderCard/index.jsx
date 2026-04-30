import React from 'react';
import { LayoutTemplate, Image as ImageIcon, Type } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useLandingBuilderLogic } from './hooks/useLandingBuilderLogic';
import SortableBlockItem from './components/SortableBlockItem';

const LandingBuilderCard = ({ control, t }) => {
    const { fields, addBlock, removeBlock, handleImageUpload, sensors, handleDragEnd } = useLandingBuilderLogic(control);

    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <LayoutTemplate className="text-indigo-500" size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                        {t('adminPartForm:landingBuilder', 'Thiết Kế Landing Page')}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        {t('adminPartForm:landingBuilderDesc', 'Xây dựng trang trình bày sản phẩm bằng các Khối (Blocks)')}
                    </p>
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {t('adminPartForm:dragToReorderBlock', 'Kéo Thả Để Sắp Xếp Block')}
                    </p>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-6">
                            {fields.map((field, index) => (
                                <SortableBlockItem 
                                    key={field.id}
                                    id={field.id}
                                    field={field}
                                    index={index}
                                    control={control}
                                    removeBlock={removeBlock}
                                    handleImageUpload={handleImageUpload}
                                    t={t}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                {/* Add Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                    <button type="button" onClick={() => addBlock('hero')} className="py-4 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
                        <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('adminPartForm:addHero')}</span>
                    </button>
                    <button type="button" onClick={() => addBlock('text')} className="py-4 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
                        <Type size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('adminPartForm:addText')}</span>
                    </button>
                    <button type="button" onClick={() => addBlock('feature_grid')} className="py-4 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
                        <LayoutTemplate size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('adminPartForm:addFeatureGrid', 'Feature Grid')}</span>
                    </button>
                    <button type="button" onClick={() => addBlock('gallery')} className="py-4 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
                        <ImageIcon size={24} className="group-hover:scale-110 transition-transform opacity-60" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('adminPartForm:addGallery', 'Gallery')}</span>
                    </button>
                    <button type="button" onClick={() => addBlock('video')} className="col-span-2 lg:col-span-1 py-4 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
                        <LayoutTemplate size={24} className="group-hover:scale-110 transition-transform opacity-60" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('adminPartForm:addVideo', 'Video')}</span>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default LandingBuilderCard;
