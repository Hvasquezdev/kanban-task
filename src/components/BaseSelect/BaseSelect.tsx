import Select from 'react-select';
import './BaseSelect.css';
import { useId } from 'react';
import BaseHeading from '../BaseHeading';

export type Option = {
  value: string | number;
  label: string;
};

interface BaseSelectProps {
  placeholder?: string;
  className?: string;
  options?: Option[];
  value?: Option;
  onSelect?: (option: Option) => void;
  label?: string;
  id?: string;
}

function BaseSelect({ options = [], className = '', placeholder, value, onSelect, label, id }: BaseSelectProps) {
  const defaultId = useId();

  return (
    <label htmlFor={id ?? defaultId} className="base-select-container">
      {label && (
        <BaseHeading variant="h6" className="base-select-container__label">
          {label}
        </BaseHeading>
      )}

      <Select
        inputId={id ?? defaultId}
        placeholder={placeholder}
        classNamePrefix="base-select"
        className={`base-select ${className}`}
        value={value}
        options={options}
        onChange={(option) => onSelect?.(option as Option)}
      />
    </label>
  );
}

export default BaseSelect;
