import React, { useEffect, useRef, useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

const buttonStyles: React.CSSProperties = {
  padding: '8px 36px 8px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  background: 'white',
  color: '#333',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  appearance: 'none',
  backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '16px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const buttonHoverStyles: React.CSSProperties = {
  borderColor: '#007bff',
  boxShadow: '0 2px 4px rgba(0, 123, 255, 0.1)',
};

const buttonFocusStyles: React.CSSProperties = {
  outline: 'none',
  borderColor: '#007bff',
  boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.15)',
};

const buttonActiveStyles: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
};

const dropdownContainerStyles: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
};

const dropdownStyles: React.CSSProperties = {
  position: 'absolute',
  left: '0',
  top: '100%',
  background: 'white',
  border: '1px solid #ddd',
  borderRadius: '6px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  minWidth: '180px',
  marginTop: '5px',
  zIndex: 10,
};

const dropdownAnimationStyles = `
@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const optionStyles: React.CSSProperties = {
  padding: '12px 15px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const optionHoverStyles: React.CSSProperties = {
  background: '#f5f5f5',
};

const selectedOptionStyles: React.CSSProperties = {
  background: '#e3f2fd',
  color: '#007bff',
};

export function FilterDropdown({ value, onChange, options }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  const currentLabel = options.find(opt => opt.value === value)?.label || 'Select...';

  useEffect(() => {
    // Inject animation styles
    if (!styleElementRef.current) {
      const styleElement = document.createElement('style');
      styleElement.textContent = dropdownAnimationStyles;
      document.head.appendChild(styleElement);
      styleElementRef.current = styleElement;
    }

    return () => {
      if (styleElementRef.current) {
        document.head.removeChild(styleElementRef.current);
        styleElementRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const buttonStyle = {
    ...buttonStyles,
    ...(isHovered ? buttonHoverStyles : {}),
    ...(isFocused ? buttonFocusStyles : {}),
    ...(isActive ? buttonActiveStyles : {}),
  };

  const dropdownStyle = {
    ...dropdownStyles,
    display: isOpen ? 'block' : 'none',
    animation: isOpen ? 'dropdownSlide 0.2s ease' : 'none',
  };

  return (
    <div ref={containerRef} style={dropdownContainerStyles}>
      <button
        style={buttonStyle}
        onClick={toggleDropdown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        type="button"
      >
        {currentLabel}
      </button>
      <div style={dropdownStyle}>
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const isOptionHovered = hoveredOption === option.value;

          const optionStyle = {
            ...optionStyles,
            ...(isOptionHovered ? optionHoverStyles : {}),
            ...(isSelected ? selectedOptionStyles : {}),
            borderRadius:
              index === 0
                ? '6px 6px 0 0'
                : index === options.length - 1
                ? '0 0 6px 6px'
                : '0',
          };

          return (
            <div
              key={option.value}
              style={optionStyle}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {isSelected && <span style={{ fontWeight: 'bold', color: '#007bff' }}>✓</span>}
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
