const IconButton = ({ icon: Icon, onClick, size = 20, className = "", title, disabled = false, ariaLabel }) => {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            title={title}
            aria-label={ariaLabel || title}
            className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <Icon size={size} strokeWidth={2} />
        </button>
    );
};
export default IconButton;
