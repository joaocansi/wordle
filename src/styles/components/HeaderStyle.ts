import styled from "styled-components";

const Container = styled.header`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid var(--gray-900);

  h1 {
    font-size: 4em;
    font-family: "Fira Sans Condensed", Helvetica, Arial, sans-serif;
    color: var(--white);
    cursor: pointer;
  }

  div {
    display: flex;
    gap: 15px;

    i {
      color: var(--white);
      font-size: 2.5em;
      cursor: pointer;
      transition: filter 0.2s;

      :hover {
        filter: brightness(0.9);
      }
    }
  }
`;

export { Container };
