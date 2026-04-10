import { Car, Lock } from 'lucide-react';
import { Select, Input } from 'antd';
import { Controller } from 'react-hook-form';
import SectionWrapper from '../FormElements/SectionWrapper';
import QuantityInput from '../FormElements/QuantityInput';

const FitmentSection = ({ part, control, errors, quantityValue, handleQuantityChange, t }) => {
    const isBrandLocked = part && part.compatible_brands && part.compatible_brands.length === 1;

    return (
        <SectionWrapper icon={Car} title={t('preorder_fitment', 'Tương thích xe')}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                        {t('preorder_vehicle_brand', 'Hãng & Dòng xe')}
                    </label>
                    <div className="relative">
                        {part?.compatible_brands?.length > 1 ? (
                            <Controller
                                name="vehicleBrand"
                                control={control}
                                render={({ field }) => (
                                    <Select 
                                        {...field}
                                        placeholder="Vui lòng chọn Hãng xe"
                                        status={errors.vehicleBrand ? 'error' : ''}
                                        className="w-full custom-antd-select [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500 focus:[&_.ant-select-selector]:!border-yellow-500 [&_.ant-select-selector]:!min-h-[56px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!px-5 [&_.ant-select-selection-item]:!leading-[54px] [&_.ant-select-selection-search-input]:!h-[56px] [&_.ant-select-selection-item]:font-bold transition-all"
                                        options={part.compatible_brands.map(brand => ({ label: brand, value: brand }))}
                                        classNames={{ popup: "dark:bg-[#141416] p-2 rounded-2xl border border-slate-100 dark:border-white/5 shadow-xl" }}
                                    />
                                )}
                            />
                        ) : (
                            <Controller
                                name="vehicleBrand"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        {...field}
                                        placeholder="VD: Mercedes C300 2022"
                                        readOnly={isBrandLocked}
                                        status={errors.vehicleBrand ? 'error' : ''}
                                        className={`w-full bg-slate-50 dark:bg-[#0a0a0b] border ${errors.vehicleBrand ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-5 py-4 min-h-[56px] focus:ring-2 hover:border-yellow-500 focus:border-yellow-500 focus:shadow-[0_0_0_2px_rgba(234,179,8,0.2)] outline-none text-slate-900 dark:text-white transition-all font-bold placeholder:font-normal placeholder:opacity-50 ${isBrandLocked ? '!bg-slate-100 dark:!bg-white/5 !border-transparent !text-slate-500 hover:!border-transparent focus:!border-transparent focus:!shadow-none' : ''}`}
                                        style={{ height: 'auto', outline: 'none', boxShadow: 'none' }}
                                    />
                                )}
                            />
                        )}
                    </div>
                    {errors.vehicleBrand && <p className="text-red-500 text-[11px] font-bold mt-2 ml-2">{errors.vehicleBrand.message}</p>}
                </div>
                
                <QuantityInput 
                    value={quantityValue} 
                    onChange={handleQuantityChange} 
                    label={t('preorder_quantity', 'Số lượng')} 
                />
            </div>
        </SectionWrapper>
    );
};

export default FitmentSection;
