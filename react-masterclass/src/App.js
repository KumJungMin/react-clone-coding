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
  display: flex;
  align-items: center;
  justify-content: center;
  // 스타일 컴포넌트의 자식 요소(span 태그)에 스타일을 적용할 수 있다.
  span {
    font-size: 30px;
    &:hover {
      font-size: 40px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🌞</span>
      </Box>
    </Wrapper>
  );
}

export default App;
