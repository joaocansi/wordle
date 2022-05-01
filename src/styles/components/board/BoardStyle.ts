import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 350px;
  height: 420px;
  display: grid;
  gap: 5px;
  grid-template-rows: ${() => `repeat(6, 1fr)`};
`;

export { Container };
