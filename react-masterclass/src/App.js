import styled from "styled-components";

// styled-components는 클래스명을 자동으로 생성해준다.
// styled.html_요소명`스타일` 형식으로 사용한다.
const Father = styled.div`
  display: flex;
`;
const BoxOne = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
const BoxTwo = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
`;
const Text = styled.span`
  color: blue;
`;

function App() {
  return (
    <Father>
      <BoxOne>
        <Text>안녕!</Text>
      </BoxOne>
      <BoxTwo />
    </Father>
  );
}

export default App;
