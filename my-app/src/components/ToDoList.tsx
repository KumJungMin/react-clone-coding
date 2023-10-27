import React from 'react';
import { useForm } from 'react-hook-form';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
// useForm을 사용하면, form을 쉽게 다룰 수 있다.
// input값을 검증하고, 에러를 보여주고, form을 submit할 때의 동작을 정의할 수 있다.

interface IForm {
  toDo: string;
}

type Category = 'TO_DO' | 'DOING' | 'DONE';

interface IToDo {
  text: string;
  id: number;
  category: Category;
}

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: []
});

function TodoList() {
  // useRecoilState는 useState처럼 [값, 변경함수] 쌍을 반환한다.
  // const [toDos, setToDos] = useRecoilState(toDoState);

  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <CreateToDo />
      <ul>
        {toDos.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
