import { useState } from "react";
import styled from "styled-components"

// styled-components를 사용할 때는 props의 타입을 정의해야함
interface ContainerProps {
  bgColor: string;
}
// props의 타입을 정의해야함
interface CircleProps {
  bgColor?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`;

function Circle({ bgColor = 'blue' }: CircleProps) {
  // 초기값을 지정하면 별도의 타입 지정이 필요 없음
  const [counter, setCounter] = useState(1);
  // 단 두 개 이상의 타입을 지정하려고 한다면, 유니온 타입을 사용 가능
  const [value, setValue] = useState<string | number>(1); 



  return <Container bgColor={bgColor}></Container>
}

export default Circle;