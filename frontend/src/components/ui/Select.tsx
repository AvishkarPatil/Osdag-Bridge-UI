import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
}

export function Select({
    value,
    onChange,
    options,
    placeholder,
    disabled,
    error,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find(o => o.value === value)?.label || placeholder || 'Select...';

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full h-9 px-3 pr-8 bg-white border rounded-lg text-sm text-left transition-all flex items-center justify-between
          ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'cursor-pointer'}
          ${error ? 'border-red-400' : isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300 hover:border-gray-400'}
          ${!value && !disabled ? 'text-gray-400' : 'text-gray-800'}
        `}
            >
                <span className="truncate">{selectedLabel}</span>
                <ChevronDown size={14} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-gray-300' : 'text-gray-500'}`} />
            </button>

            {isOpen && !disabled && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    {placeholder && (
                        <div
                            onClick={() => { onChange(''); setIsOpen(false); }}
                            className="px-3 py-2 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer"
                        >
                            {placeholder}
                        </div>
                    )}
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setIsOpen(false); }}
                            className={`px-3 py-2 text-sm cursor-pointer transition-colors
                ${opt.value === value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
              `}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
