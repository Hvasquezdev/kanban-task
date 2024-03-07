import { useId, useState } from 'react';
import './BaseTextarea.css';
import computeClassNames from '../../utils/compute-class-names';

interface BaseTextareaProps {
  id?: string;
  label?: string;
  onChange?(text: string): void;
  placeholder?: string;
  value?: string;
}

export default function BaseTextarea({ id, label = '', onChange, placeholder = '', value = '' }: BaseTextareaProps) {
  const defaultId = useId();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const classNames = computeClassNames({
    'base-textarea--focused': isInputFocused
  });

  return (
    <label className={`base-textarea ${classNames}`} htmlFor={id ?? defaultId}>
      <div className="base-textarea__body">
        {label && <h3 className="base-textarea__label">{label}</h3>}

        <div className="base-textarea__content">
          <textarea
            className="base-textarea__element"
            id={id ?? defaultId}
            onBlur={() => setIsInputFocused(false)}
            onChange={(event) => onChange?.(event.target.value)}
            onFocus={() => setIsInputFocused(true)}
            placeholder={placeholder}
            value={value}
          />
        </div>
      </div>
    </label>
  );
}
