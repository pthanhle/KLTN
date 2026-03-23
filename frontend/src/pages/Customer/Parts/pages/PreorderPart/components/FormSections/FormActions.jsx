import { Button } from 'antd';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const FormActions = ({ isSubmitting, t, navigate }) => {
    return (
        <div className="bg-white dark:bg-[#141416] p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none relative overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 text-slate-500 dark:text-slate-400 w-full xl:w-auto justify-center xl:justify-start">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-green-500" />
                </div>
                <p className="text-sm font-bold leading-relaxed max-w-[280px]">
                    <span className="text-slate-900 dark:text-white">
                        {t('preorder_trust_title', 'Thông tin được bảo mật tuyệt đối.')}
                    </span><br/>
                    {t('preorder_trust_desc', 'Cố vấn của chúng tôi sẽ liên hệ báo giá trong vòng 30 phút.')}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 w-full xl:w-auto shrink-0">
                <Button
                    onClick={() => navigate('/parts')}
                    className="w-full sm:min-w-[150px] !h-[60px] !rounded-2xl px-8 !bg-transparent !border !border-slate-200 dark:!border-white/10 hover:!border-slate-400 hover:!bg-slate-50 dark:hover:!bg-white/5 transition-all flex items-center justify-center group"
                >
                    <span className="font-extrabold text-sm text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-widest transition-colors duration-300">
                        {t('preorder_btn_cancel', 'Hủy bỏ')}
                    </span>
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    className="w-full sm:min-w-[280px] !h-[60px] !rounded-2xl px-10 !bg-yellow-500 hover:!bg-yellow-400 !shadow-[0_8px_30px_rgba(234,179,8,0.25)] hover:!shadow-[0_8px_30px_rgba(234,179,8,0.4)] transition-all !border-0 flex items-center justify-center group"
                >
                    <span className="font-extrabold text-sm text-slate-900 uppercase tracking-widest ml-1 flex items-center gap-2">
                        {t('preorder_btn_submit', 'Gửi yêu cầu đặt hàng')}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default FormActions;
