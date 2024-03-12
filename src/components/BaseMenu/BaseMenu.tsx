import { useRef, useState } from 'react';
import BaseButton from '../BaseButton';
import iconMenu from '../../assets/images/svg/icon-vertical-ellipsis.svg';
import useClickOutside from '../../hooks/useClickOutside';
import './BaseMenu.css';

export enum MenuOptionColor {
  Default = 'default',
  Danger = 'danger'
}
type MenuOption = {
  label: string;
  action?: () => void;
  color?: MenuOptionColor;
  closeOnAction?: boolean;
};

interface BaseMenuProps {
  className?: string;
  options?: MenuOption[];
}

function BaseMenu({ options = [], className = '' }: BaseMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside({
    ref: menuRef,
    onClickOutside: () => setIsOpen(false)
  });

  const handleItemClick = ({ action, closeOnAction }: Pick<MenuOption, 'action' | 'closeOnAction'>) => {
    action?.();
    if (closeOnAction) setIsOpen(false);
  };

  return (
    <div ref={menuRef} className={`base-menu ${className}`}>
      <BaseButton className="base-menu__trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src={iconMenu} alt="Vertical ellipsis" loading="lazy" height={20} width={5} />
      </BaseButton>

      {isOpen && (
        <div className="base-menu__list">
          {!options.length && <span className="list-item list-item--empty">Empty</span>}

          {options?.map(({ label, action, color = 'default', closeOnAction }) => (
            <button
              key={label}
              className={`list-item list-item--${color}`}
              onClick={() => handleItemClick({ action, closeOnAction })}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default BaseMenu;
