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
const Emoji = styled.span`
  font-size: 30px;
`;
const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite alternate;
  display: flex;
  align-items: center;
  justify-content: center;
  // 스타일 컴포넌트 태그에 접근해서 스타일 변경이 가능(Box안의 Emoji에만 스타일 적용)
  ${Emoji} {
    &:hover {
      font-size: 40px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Emoji>🌞</Emoji>
      <Box>
        <Emoji>🌞</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
