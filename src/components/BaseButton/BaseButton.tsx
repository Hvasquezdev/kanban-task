import React from 'react';
import computeClassNames from '../../utils/compute-class-names';
import './BaseButton.css';

type BaseButtonColor = 'primary' | 'secondary' | 'destructive';
type BaseButtonSize = 'lg' | 'sm';
type BaseButtonType = 'submit' | 'reset' | 'button';

interface BaseButtonProps {
  children?: React.ReactNode;
  className?: string;
  color?: BaseButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?(): void;
  size?: BaseButtonSize;
  type?: BaseButtonType;
}

export default function BaseButton({
  children,
  className = '',
  color = 'primary',
  disabled = false,
  fullWidth = false,
  loading = false,
  size = 'lg',
  type = 'button',
  onClick
}: BaseButtonProps) {
  const computedClassNames = computeClassNames({
    'base-button--disabled': disabled,
    'base-button--full-width': fullWidth,
    'base-button--loading': loading,
    [`base-button--${color}`]: color,
    [`base-button--${size}`]: size,
    [className as string]: className
  });

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      className={`base-button ${computedClassNames}`}
    >
      {loading ? <span className="base-button__loader" /> : <span className="base-button__content">{children}</span>}
    </button>
  );
}
