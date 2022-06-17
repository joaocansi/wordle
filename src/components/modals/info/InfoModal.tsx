import { Dispatch, SetStateAction } from 'react';
import Modal from '../Modal';

interface InfoModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const InfoModal = ({ isOpen, setIsOpen }: InfoModalProps) => {
  const close = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      contentStyle={{
        background: 'var(--color-game-modal-content-background)',
        width: '500px',
        padding: '2rem',
      }}
      overlayStyle={{
        background: 'var(--color-game-modal-overlay-background)',
      }}
    >
      <h1>gegfe</h1>
    </Modal>
  );
};

export default InfoModal;
