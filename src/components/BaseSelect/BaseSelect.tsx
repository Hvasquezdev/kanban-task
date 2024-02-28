import Select from 'react-select';
import './BaseSelect.css';

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
}

function BaseSelect({ options = [], className = '', placeholder, value, onSelect }: BaseSelectProps) {
  return (
    <Select
      placeholder={placeholder}
      classNamePrefix="base-select"
      className={`base-select ${className}`}
      value={value}
      options={options}
      onChange={(option) => onSelect?.(option as Option)}
    />
  );
}

export default BaseSelect;
