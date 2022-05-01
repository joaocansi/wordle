import styled from "styled-components";

interface KeyProps {
  size?: number;
  isFake?: boolean;
}

const Container = styled.button<KeyProps>`
  flex: ${(props) => (props.size ? props.size : 1)};
  ${(props) =>
    !props.isFake
      ? {
          border: "0",
          backgroundColor: "var(--gray-500)",
          height: "58px",
          borderRadius: "5px",
          cursor: "pointer",
          color: "var(--white)",
          fontWeight: "bold",
        }
      : {
          border: "0",
        }}

  i {
    font-size: 1.5em;
  }
`;

export { Container };
