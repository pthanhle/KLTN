import React, { useState, useEffect } from 'react';

export const InlineInput = ({ 
    value, 
    onChange, 
    isEditMode = true,
    placeholder = '...', 
    className = '',
    multiline = false
}) => {
    const [localValue, setLocalValue] = useState(value || '');

    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    const handleChange = (e) => {
        setLocalValue(e.target.value);
    };

    const handleBlur = () => {
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const baseStyle = {
        backgroundColor: 'transparent',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        color: '#000',
        outline: 'none',
        padding: '0 2px',
        borderBottom: '1px solid transparent',
        transition: 'all 0.2s',
    };

    const hoverClass = "hover:bg-slate-100 hover:border-slate-300 focus:bg-blue-50 focus:border-blue-500 rounded-sm cursor-text";

    if (!isEditMode) {
        return <span className={`inline-block ${className}`}>{localValue || ''}</span>;
    }

    if (multiline) {
        return (
            <textarea
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                style={{ ...baseStyle, width: '100%', resize: 'none', overflow: 'hidden' }}
                className={`${hoverClass} ${className}`}
                rows={1}
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
            />
        );
    }

    return (
        <input
            type="text"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            style={{ ...baseStyle, width: `${Math.max(String(localValue).length, placeholder.length) + 1}ch` }}
            className={`w-auto ${hoverClass} ${className}`}
        />
    );
};
