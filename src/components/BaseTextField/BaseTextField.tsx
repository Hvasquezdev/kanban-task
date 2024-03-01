import React, { useId, useState } from 'react';
import './BaseTextField.css';
import computeClassNames from '../../utils/compute-class-names';
import { InputErrorMessage, isEmptyStr } from './utils/validator';

type BaseTextFieldType = 'text' | 'number' | 'email' | 'password';

interface BaseTextFieldProps {
  id?: string;
  label?: string;
  onChange?(text: string): void;
  required?: boolean;
  value?: string;
  placeholder?: string;
  type?: BaseTextFieldType;
}

export default function BaseTextField({
  id,
  label = '',
  onChange,
  placeholder = '',
  required = false,
  value = '',
  type = 'text'
}: BaseTextFieldProps) {
  const defaultId = useId();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const classNames = computeClassNames({
    'base-text-field--invalid': isInvalid,
    'base-text-field--focused': isInputFocused
  });

  function showInvalidState(currentInputValue: string) {
    setIsInvalid(required && isEmptyStr(currentInputValue));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.trim();
    onChange?.(inputValue);
    showInvalidState(inputValue);
  }

  function handleBlur() {
    setIsInputFocused(false);
    showInvalidState(value);
  }

  return (
    <label className={`base-text-field ${classNames}`} htmlFor={id ?? defaultId}>
      <div className="base-text-field__body">
        {label && <h3 className="base-text-field__label">{label}</h3>}

        <div className="base-text-field__content">
          <input
            className="base-text-field__input"
            id={id ?? defaultId}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onInvalid={() => showInvalidState(value)}
            placeholder={placeholder}
            required={required}
            type={type}
            value={value}
          />

          {isInvalid && <p className="base-text-field__error">{InputErrorMessage.Empty}</p>}
        </div>
      </div>
    </label>
  );
}
