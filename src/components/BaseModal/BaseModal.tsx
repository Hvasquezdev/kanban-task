import React, { useEffect } from 'react';
import './BaseModal.css';
import BaseCard from '../BaseCard';

interface BaseModalProps {
  isOpen?: boolean;
  renderHeader?: () => React.ReactNode;
  onClose?: (value: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

function BaseModal({ isOpen = false, renderHeader, onClose, children, className = '' }: BaseModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    isOpen && (
      <div className={`base-modal-container ${className}`}>
        <div
          className="base-modal-container__backdrop"
          onClick={() => onClose?.(!isOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose?.(!isOpen);
          }}
          aria-label="modal backdrop"
        />
        <BaseCard boxShadow={false} className="base-modal-container__modal">
          {renderHeader && <div className="base-modal-container__modal__header">{renderHeader()}</div>}
          <div className="base-modal-container__modal__content">{children}</div>
        </BaseCard>
      </div>
    )
  );
}

export default BaseModal;
