import { useModal } from 'contexts/ModalContext';

const ModalRoot = () => {
  const {
    modal: { component, props },
  } = useModal();
  const ModalComponent = component;

  return (
    <div className="modal-root">
      {!!component && <ModalComponent {...props} />}
    </div>
  );
};

export default ModalRoot;
