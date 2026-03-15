import { Input, Checkbox } from 'antd';
import { ShieldCheck, AlignLeft } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

const AdditionalInfo = ({ t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <>
            <div className="space-y-1">
                <Controller
                    name="hasDriverLicense"
                    control={control}
                    render={({ field }) => (
                        <div className={`bg-slate-50 dark:bg-white/5 border rounded-2xl p-5 flex items-start gap-4 transition-colors ${errors.hasDriverLicense ? 'border-red-500' : 'border-slate-100 dark:border-white/5'}`}>
                            <Checkbox 
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="mt-1 [&_.ant-checkbox-inner]:!w-5 [&_.ant-checkbox-inner]:!h-5 [&_.ant-checkbox-inner]:!rounded-md [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-yellow-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-yellow-500"
                            />
                            <div className="flex-1 cursor-pointer" onClick={() => field.onChange(!field.value)}>
                                <span className={`text-[14px] font-bold flex items-center gap-2 ${errors.hasDriverLicense ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {t('booking_licenseLabel', 'Tôi cam kết có bằng lái xe hợp lệ')}
                                    {!errors.hasDriverLicense && <ShieldCheck size={16} className="text-green-500" />}
                                </span>
                            </div>
                        </div>
                    )}
                />
            </div>

            <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <AlignLeft size={16} className="text-slate-400" />
                    {t('booking_note', 'Ghi chú thêm (không bắt buộc)')}
                </label>
                <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                        <Input.TextArea 
                            {...field}
                            placeholder="Yêu cầu đặc biệt về cấu hình xe hoặc lộ trình..."
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            className="!px-4 !py-3 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white transition-all placeholder:!text-slate-400 custom-scrollbar"
                        />
                    )}
                />
            </div>
        </>
    );
};

export default AdditionalInfo;
