/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Popup } from "reactjs-popup";

import * as S from "styles/components/modals/BaseModalStyle";

export interface BaseModalProps {
  children?: ReactNode;
  controllers: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
}

const BaseModal = ({ controllers, children }: BaseModalProps) => {
  return (
    <Popup
      open={controllers.open}
      closeOnDocumentClick={false}
      onClose={() => controllers.setOpen(false)}
      contentStyle={{
        width: "90%",
        maxWidth: "520px",
        backgroundColor: "var(--background)",
        padding: "15px",
        borderRadius: "5px",
        border: "1px solid var(--gray-800)",
      }}
      overlayStyle={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <S.Container>
        <S.Header>
          <a onClick={() => controllers.setOpen(false)} className="close-popup">
            &times;
          </a>
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.Container>
    </Popup>
  );
};

export default BaseModal;
