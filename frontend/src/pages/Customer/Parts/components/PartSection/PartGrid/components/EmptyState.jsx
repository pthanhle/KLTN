const EmptyState = ({ t }) => {
    return (
        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
            <p className="text-[16px] font-bold text-slate-800 dark:text-white mb-2">
                {t('no_parts_found', 'Không tìm thấy phụ tùng nào')}
            </p>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                {t('no_parts_desc', 'Vui lòng thử nghiệm lại bộ lọc hoặc từ khóa tìm kiếm')}
            </p>
        </div>
    );
};

export default EmptyState;
