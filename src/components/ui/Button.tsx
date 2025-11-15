import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'normal' | 'small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const baseStyles: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
  textDecoration: 'none',
  display: 'inline-block',
};

const smallStyles: React.CSSProperties = {
  padding: '6px 12px',
  fontSize: '13px',
};

const variantStyles: Record<ButtonVariant, { base: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    base: {
      background: '#007bff',
      color: 'white',
    },
    hover: {
      background: '#0056b3',
    },
  },
  secondary: {
    base: {
      background: '#6c757d',
      color: 'white',
    },
    hover: {
      background: '#545b62',
    },
  },
  danger: {
    base: {
      background: '#dc3545',
      color: 'white',
    },
    hover: {
      background: '#c82333',
    },
  },
  success: {
    base: {
      background: '#28a745',
      color: 'white',
    },
    hover: {
      background: '#218838',
    },
  },
  outline: {
    base: {
      background: 'white',
      color: '#007bff',
      border: '1px solid #007bff',
    },
    hover: {
      background: '#007bff',
      color: 'white',
    },
  },
};

export function Button({
  variant = 'primary',
  size = 'normal',
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle: React.CSSProperties = {
    ...baseStyles,
    ...(size === 'small' ? smallStyles : {}),
    ...variantStyles[variant].base,
    ...(isHovered ? variantStyles[variant].hover : {}),
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
