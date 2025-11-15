import React, { useState } from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const labelStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '14px',
  cursor: 'pointer',
  userSelect: 'none',
  color: '#333',
  fontWeight: '500',
};

const labelDisabledStyles: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

const inputStyles: React.CSSProperties = {
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
};

const switchStyles: React.CSSProperties = {
  position: 'relative',
  width: '44px',
  height: '24px',
  background: '#e0e0e0',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
};

const switchCheckedStyles: React.CSSProperties = {
  background: '#007bff',
  boxShadow: 'inset 0 1px 3px rgba(0, 123, 255, 0.3)',
};

const switchHoverStyles: React.CSSProperties = {
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(0, 123, 255, 0.1)',
};

const switchFocusStyles: React.CSSProperties = {
  outline: '2px solid #007bff',
  outlineOffset: '2px',
};

const switchDisabledStyles: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

const knobStyles: React.CSSProperties = {
  content: '""',
  position: 'absolute',
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  background: 'white',
  top: '3px',
  left: '3px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const knobCheckedStyles: React.CSSProperties = {
  transform: 'translateX(20px)',
  boxShadow: '0 2px 6px rgba(0, 123, 255, 0.4)',
};

export function ToggleSwitch({ checked, onChange, label, disabled = false }: ToggleSwitchProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const switchStyle = {
    ...switchStyles,
    ...(checked ? switchCheckedStyles : {}),
    ...(isHovered && !disabled ? switchHoverStyles : {}),
    ...(isFocused && !disabled ? switchFocusStyles : {}),
    ...(disabled ? switchDisabledStyles : {}),
  };

  const knobStyle = {
    ...knobStyles,
    ...(checked ? knobCheckedStyles : {}),
  };

  const containerStyle = {
    ...labelStyles,
    ...(disabled ? labelDisabledStyles : {}),
  };

  return (
    <label
      style={containerStyle}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={inputStyles}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span style={switchStyle}>
        <span style={knobStyle}></span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
