const PartInfo = ({ part, subInfo }) => {
    return (
        <>
            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-[1.3] mb-2 line-clamp-2 transition-colors hover:text-yellow-600 dark:hover:text-yellow-500">
                {part.name}
            </h3>

            <p className="text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-4">
                {subInfo}
            </p>

            <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                {part.description}
            </p>
        </>
    );
};

export default PartInfo;
