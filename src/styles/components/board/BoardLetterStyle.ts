import styled from "styled-components";

const Letter = styled.div`
  color: var(--white);
  font-size: 3.25em;
  font-weight: 700;
  text-transform: uppercase;
`;

interface BoardLetterProps {
  status: string;
  isAnimating?: boolean;
}

const Container = styled.div<BoardLetterProps>`
  flex: 1;
  border: 2px solid var(--gray-900);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);

  ${(props) =>
    props.isAnimating
      ? {
          animationDuration: "0.35s",
          animationTimingFunction: "linear",
          animationFillMode: "backwards",
        }
      : ""}

  ${(props) =>
    props.status === "CORRECT"
      ? {
          backgroundColor: "var(--green-500)",
          borderColor: "var(--green-500)",
          animationName: "correct-letter-animation",
        }
      : ""}

  ${(props) =>
    props.status === "ABSENT"
      ? {
          backgroundColor: "var(--gray-900)",
          borderColor: "var(--gray-900)",
          animationName: "absent-letter-animation",
        }
      : ""}

  ${(props) =>
    props.status === "PRESENT"
      ? {
          backgroundColor: "var(--yellow-400)",
          borderColor: "var(--yellow-400)",
          animationName: "present-letter-animation",
        }
      : ""}
`;

export { Container, Letter };
