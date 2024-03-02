import { useId } from 'react';
import computeClassNames from '../../utils/compute-class-names';
import './BaseCheckbox.css';

interface BaseCheckboxProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

function BaseCheckbox({
  value = false,
  onChange,
  label = '',
  fullWidth = true,
  className = '',
  id
}: BaseCheckboxProps) {
  const computedClassNames = computeClassNames({
    'base-checkbox--checked': value,
    'base-checkbox--full-width': fullWidth
  });

  const defaultId = useId();
  return (
    <label htmlFor={id ?? defaultId} className={`base-checkbox ${className} ${computedClassNames}`}>
      <input
        id={id ?? defaultId}
        onChange={(event) => onChange?.(event.target.checked)}
        className="base-checkbox__input"
        type="checkbox"
        checked={value}
      />
      <span className="base-checkbox__span">{label}</span>
    </label>
  );
}

export default BaseCheckbox;
