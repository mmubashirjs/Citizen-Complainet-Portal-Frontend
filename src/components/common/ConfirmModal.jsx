import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  confirmVariant = "primary",
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="460px">
      <div className="confirm-modal-body" style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: confirmVariant === 'danger' ? '#FDE8E8' : '#E8F6ED',
          color: confirmVariant === 'danger' ? '#D64545' : '#009846',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem'
        }}>
          <AlertCircle size={28} />
        </div>
        <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
