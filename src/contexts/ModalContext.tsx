import React, {
  ComponentType,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ModalOptionsProps {
  component: React.FC<any> | ComponentType<any>;
  props?: any;
}

interface ModalContextProps {
  isVisible: boolean;
  modal: ModalOptionsProps;

  displayModal: (options: ModalOptionsProps) => void;
  hideModal: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState({} as ModalOptionsProps);
  const [isVisible, setIsVisible] = useState(false);

  const displayModal = (options: ModalOptionsProps) => {
    setModal(options);
    setIsVisible(true);
  };
  const hideModal = () => {
    setModal({} as ModalOptionsProps);
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ isVisible, modal, displayModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);
