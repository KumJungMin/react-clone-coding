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

// 다른 스타일 컴포넌트의 스타일을 사용하고 싶다면, 컴포넌트를 호출해준다.(styled(컴포넌트명))
const Circle = styled(Box)`
  border-radius: 50%;
`;

const Btn = styled.button`
  color: white;
  background-color: blue;
  border: 0;
  border-radius: 5px;
`;

// styled components에 attrs로 html 속성을 지정할 수 있다
const Input = styled.input.attrs({ required: true })`
  border: 1px solid #ccc;
`;

function App() {
  return (
    <Father as="header">
      {/* as="header"를 사용하면 header태그로 변환된다. */}
      <Box bgColor="teal">
        <Text>안녕!</Text>
      </Box>
      <Box bgColor="tomato" />
      <Circle bgColor="tomato" />
      <Btn>안녕</Btn>
      <Btn as="a" href="/">
        안녕
        {/* as="a"를 사용하면 a태그로 변환된다. */}
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
