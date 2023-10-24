import  { useState } from 'react';

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // react에서는 이벤트값을 target이 아닌 currentTarget으로 받는다.
    const {currentTarget: {value}} = event;
    setValue(value);
  }
  // "React.이벤트종류<이벤트를 발생시키는 element>" 형식으로 이벤트 타입 지정
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  }
 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} type="text" placeholder="username" onChange={onChange}/>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
