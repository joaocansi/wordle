import { ReactNode } from 'react';
import styles from 'styles/components/modals/Modal.module.scss';

export interface ModalProps {
  contentStyle: {
    width: string;
    background: string;
    padding: string;
  };
  overlayStyle: {
    background: string;
  };

  isOpen?: boolean;
  children?: ReactNode;
}

const Modal = ({
  contentStyle,
  overlayStyle,
  isOpen,
  children,
}: ModalProps) => {
  return (
    <div
      style={{
        backgroundColor: overlayStyle.background,
      }}
      className={`
        ${styles.modalOverlay} 
        ${isOpen ? styles.modalVisible : ''}
      `}
    >
      <div
        style={{
          maxWidth: contentStyle.width,
          backgroundColor: contentStyle.background,
          padding: contentStyle.padding,
        }}
        className={styles.modalContent}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
