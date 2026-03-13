import { Skeleton } from '@/components/ui/skeleton';

const ALPHABET = [
    'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const AlphabetFilter = ({ activeLetter, onLetterChange, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full border-t border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#0b0f19] py-4 my-8">
                <div className="container mx-auto px-4 overflow-x-auto flex gap-6 sm:justify-center items-center py-2 no-scrollbar">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <Skeleton key={i} className="w-6 h-6 rounded-full shrink-0" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full border-t border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#0b0f19] py-4 mb-14 mt-8">
            <div className="container mx-auto px-4 overflow-x-auto">
                <div className="flex justify-start lg:justify-center items-center gap-6 md:gap-8 lg:gap-10 min-w-max pb-2 md:pb-0 scrollbar-hide">
                    {ALPHABET.map((letter) => {
                        const isActive = activeLetter === letter;
                        return (
                            <button
                                key={letter}
                                onClick={() => onLetterChange(letter)}
                                className={`
                                    text-[12px] md:text-[13px] font-bold tracking-wider transition-all duration-200 shrink-0
                                    ${isActive 
                                        ? 'bg-yellow-500 text-white dark:text-slate-900 px-4 py-1.5 rounded-full shadow-md shadow-yellow-500/20' 
                                        : 'text-slate-400 hover:text-slate-800 dark:hover:text-white hover:scale-110'
                                    }
                                `}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AlphabetFilter;
