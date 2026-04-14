import { Trash2 } from 'lucide-react';
import FeatureInputFields from './FeatureInputFields';
import FeatureCoverPreview from './FeatureCoverPreview';

const FeatureBlock = ({ name, restField, removeFeature }) => {
    return (
        <section className="relative bg-white dark:bg-[#1a1a1c] rounded-3xl p-6 md:p-10 shadow-sm transition-all hover:shadow-yellow-500/5 group border border-slate-100 dark:border-white/5 w-full block">
            {/* Delete Block Button */}
            <button
                type="button"
                onClick={() => removeFeature(name)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white transition-colors cursor-pointer border-none z-50"
                title="Remove Feature Block"
            >
                <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full xl:pr-10">
                <FeatureInputFields name={name} restField={restField} />
                <FeatureCoverPreview name={name} />
            </div>
        </section>
    );
};

export default FeatureBlock;
