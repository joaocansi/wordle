import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -2.6rem;
  gap: 2rem;

  h6 {
    font-size: 2.5em;
    text-transform: uppercase;
    color: var(--white);
  }

  p {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    font-size: 2em;
    color: var(--gray-100);
    text-align: center;

    span {
      color: var(--white);
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  button {
    padding: 1.5rem 5rem;
    background-color: var(--gray-900);
    color: var(--gray-100);
    border: 0;
    border-radius: 5px;
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
  }
`;

const Letters = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  gap: 7.5px;
`;

interface LetterProps {
  animate?: boolean;
}

const Letter = styled.div<LetterProps>`
  flex: 1;
  text-align: center;
  color: var(--white);
  font-size: 3em;
  font-weight: 700;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--red-200);
  border: 1px solid var(--gray-500);

  ${(props) =>
    props.animate
      ? {
          animation: "red-letter-animation .2s",
          animationFillMode: "backwards",
          animationTimingFunction: "linear",
        }
      : ""}
`;

export { Container, Letters, Letter };
