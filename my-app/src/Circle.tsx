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
  return <Container bgColor={bgColor}></Container>
}

export default Circle;