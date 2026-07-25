import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | Option)[];
  placeholder?: string;
  className?: string;
  id?: string;
}

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'اختر من القائمة...',
  className = '',
  id
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to { value, label } format
  const normalizedOptions: Option[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  // Filter options based on search query
  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find the label of the currently selected option
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus the search input when dropdown opens
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} id={id} dir="rtl">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full h-11 px-3 py-2 flex items-center justify-between text-right text-[14px] bg-white text-gray-800 rounded-xl border border-gray-200 shadow-sm hover:border-[#1e3c5a]/50 focus:outline-none focus:ring-2 focus:ring-[#1e3c5a]/20 focus:border-[#1e3c5a] transition-all cursor-pointer font-sans"
      >
        <span className="truncate font-semibold text-gray-800">{displayLabel}</span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1e3c5a]' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Search Bar Input */}
          <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث..."
                className="w-full h-9 pr-8 pl-3 text-xs bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e3c5a] focus:ring-1 focus:ring-[#1e3c5a] transition-all text-right font-medium"
              />
              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1e3c5a]" />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full px-3 py-2.5 text-right text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1e3c5a]/10 text-[#1e3c5a]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} className="text-[#1e3c5a]" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-xs text-gray-400 font-medium">
                لا توجد نتائج مطابقة
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
