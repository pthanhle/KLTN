const LanguageMenuItem = ({ flagUrl, flagAlt, label, labelClass }) => {
    return (
        <div className="flex items-center space-x-3">
            <img src={flagUrl} alt={flagAlt} className="w-5 h-auto rounded-sm object-cover" />
            <span className={labelClass}>{label}</span>
        </div>
    );
};

export default LanguageMenuItem;
