// React DOM은 해당 엘리먼트와 그 자식 엘리먼트를
// 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데
// 필요한 경우에만 DOM을 업데이트합니다.

// 조건부 렌더링이 가능하다.
interface ItemProps {
  name: string;
  isPacked: boolean;
}

function Item({ name, isPacked }: ItemProps) {
  if (isPacked) {
    return <li className="item">{name && "이름있으!"}</li>;
  } else {
    // 만약 아무것도 렌더링하고 싶지 않다면 null을 반환하면 된다.
    return null;
  }
}
export function Result() {
  return (
    <Item
      name="물"
      isPacked={true}
    />
  );
}

// map, filter, reduce를 사용하여 컴포넌트를 렌더링할 수 있다.
const people = [
  "Creola Katherine Johnson: mathematician",
  "Mario José Molina-Pasquel Henríquez: chemist",
  "Mohammad Abdus Salam: physicist",
  "Percy Lavon Julian: chemist",
  "Subrahmanyan Chandrasekhar: astrophysicist",
];
export function List() {
  return (
    // 반복문을 사용해 JSX를 랜더링할 때는 꼭! key를 지정한다.
    <ul>
      {people.map((person) => (
        <li key={person}>{person}</li>
      ))}
    </ul>
  );
}
