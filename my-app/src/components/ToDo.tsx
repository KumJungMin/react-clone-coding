import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';

const food = ['pizza', 'mango', 'kimchi', 'kimbab'];

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    setToDos(prev => {
      const targetIdx = prev.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDos = [...prev];

      newToDos.splice(targetIdx, 1, newToDo);
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
