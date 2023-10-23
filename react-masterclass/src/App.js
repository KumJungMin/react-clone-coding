import styled, { keyframes } from "styled-components";

// keyframes로 애니메이션을 만들어서, 스타일 컴포넌트에 적용할 수 있다.
const animation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite alternate;
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;
