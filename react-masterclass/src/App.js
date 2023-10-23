import styled from "styled-components";

// styled-components는 클래스명을 자동으로 생성해준다.
// styled.html_요소명`스타일` 형식으로 사용한다.
const Father = styled.div`
  display: flex;
`;
// 배경색만 다른 박스를 만들고 싶다면? props를 사용한다.
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};
`;

const Text = styled.span`
  color: blue;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal">
        <Text>안녕!</Text>
      </Box>
      <Box bgColor="tomato" />
    </Father>
  );
}

export default App;
