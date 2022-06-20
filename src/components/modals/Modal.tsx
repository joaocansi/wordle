import { useModal } from 'contexts/ModalContext';
import { ComponentType, useEffect } from 'react';
import styles from 'styles/components/modals/Modal.module.scss';

interface ModalOptions {
  closeDocument?: boolean;
  contentStyle: {
    width: string;
    background: string;
    padding: string;
  };
  overlayStyle: {
    background: string;
  };
}

export default function asModal<T>(
  Component: ComponentType<T>,
  { closeDocument, contentStyle, overlayStyle }: ModalOptions
) {
  return (props: T) => {
    const { isVisible, hideModal } = useModal();

    return (
      <div
        id="modal-overlay"
        style={{
          backgroundColor: overlayStyle.background,
        }}
        className={`${styles.modalOverlay} ${
          isVisible ? styles.modalVisible : ''
        }`}
      >
        <div
          id="modal-content"
          style={{
            maxWidth: contentStyle.width,
            backgroundColor: contentStyle.background,
            padding: contentStyle.padding,
          }}
          className={styles.modalContent}
        >
          {closeDocument && (
            <i
              onClick={() => hideModal()}
              className={`${styles.modalCloseBtn} fas fa-times`}
            ></i>
          )}
          <Component {...props} />
        </div>
      </div>
    );
  };
}
