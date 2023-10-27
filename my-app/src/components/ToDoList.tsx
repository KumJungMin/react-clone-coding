import React from 'react';
import { useForm } from 'react-hook-form';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { Categories, toDoSelector, categoryState } from '../atoms';
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

function TodoList() {
  // useRecoilState는 useState처럼 [값, 변경함수] 쌍을 반환한다.
  // const [toDos, setToDos] = useRecoilState(toDoState);

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DOING}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
    </div>
  );
}

export default TodoList;
