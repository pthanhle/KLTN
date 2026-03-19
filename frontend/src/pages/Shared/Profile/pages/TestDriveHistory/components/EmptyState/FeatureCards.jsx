import { getEmptyStateFeatures } from '../../constants/emptyState';

const FeatureCards = ({ t }) => {
    const features = getEmptyStateFeatures(t);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {features.map((feature, idx) => (
                <div 
                    key={idx} 
                    className="flex flex-col justify-center p-8 rounded-3xl bg-white dark:bg-transparent border border-slate-200/50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-[#0c0e15] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300"
                >
                    <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-3 transition-colors duration-300">
                        {feature.title}
                    </p>
                    <p className="text-3xl font-black text-yellow-500 tracking-tight mb-2 transition-colors duration-300">
                        {feature.highlight}
                    </p>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-500 transition-colors duration-300">
                        {feature.desc}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default FeatureCards;
