import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  margin-top: 3rem;
`;
const Header = styled.div`
  width: 100%;
  position: relative;

  .close-popup {
    position: absolute;
    right: 0;
    font-size: 3.2em;
    color: var(--white);
    top: -8px;
    z-index: 10;
    cursor: pointer;
  }
`;

export { Container, Content, Header };
