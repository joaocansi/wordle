import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import styles from 'styles/components/modals/Modal.module.scss';

interface ModalProps {
  controls: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  contentStyle?: React.CSSProperties;
  closeOnDocumentClick?: boolean;
  children: ReactNode;
}

const Modal = ({
  contentStyle,
  closeOnDocumentClick,
  controls,
  children,
}: ModalProps) => {
  const modalOverlayClass = classNames([
    styles.modalOverlay,
    { [styles.modalOverlayActive]: controls.open },
  ]);

  const modalContentClass = classNames([
    'modal-content',
    styles.modalContent,
    { [styles.modalContentActive]: controls.open },
  ]);

  useEffect(() => {
    const onClickListener = (event) => {
      const containsModalContentElement = document
        .getElementsByClassName('modal-content')[0]
        .contains(event.target);

      if (controls.open && !containsModalContentElement && closeOnDocumentClick)
        close();
    };

    document.addEventListener('click', onClickListener);
    return () => {
      document.removeEventListener('click', onClickListener);
    };
  }, []);

  const close = () => controls.setOpen(false);

  return (
    <div className={modalOverlayClass}>
      <div className={modalContentClass} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
