import { useState } from "react";

// JSX에 이벤트 핸들러를 추가할 수 있다.
// 이벤트는 onXXX 형식으로 작성한다.
// vue에서 변수를 업데이트할 때 emit을 쓰지만,
// react는 변수를 수정하는 함수 자체를 넘겨준다.(자유도가 높다.)

interface ButtonProps {
  onClick: () => void;
}

function Result() {
  return <Button onClick={() => alert("clicked!")} />;
}

function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click me!</button>;
}

// react는 useState를 사용하여 상태를 관리한다.
// useState로 관리해야 변경된 값을 화면에 반영할 수 있다.
function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore((s) => s + 1);
    // useState의 setXXX힘수에서는 인자로 현재 값을 받을 수 있다
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button
        onClick={() => {
          increment();
          increment();
          increment();
        }}
      >
        +3
      </button>
      <h1>Score: {score}</h1>
    </>
  );
}

// 객체의 상태를 변경하려면 객체를 복사한 후 변경해야 한다.
function Form() {
  const [person, setPerson] = useState({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function handleNameChange(e) {
    setPerson({
      ...person, // this!!
      name: e.target.value,
    });
  }
}

// 이벤트 버블링을 에방하는 법
// 이벤트가 발생하는 요소에 e.stopPropagation(); 지정
function SingleButton({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

// 기본 이벤트를 막는 방법(ex. submit)
// 이벤트 핸들러에 e.preventDefault(); 지정
function Signup() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submitting!");
  };
  return (
    <form onSubmit={onSubmit}>
      <input />
      <button>Send</button>
    </form>
  );
}
