import { atom, selector } from 'recoil';

export enum Categories {
  TO_DO = 'TO_DO',
  DOING = 'DOING',
  DONE = 'DONE'
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: []
});

// atom에 enum
export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO
});

// selector는 atom이 아니라, atom을 이용해서 새로운 값을 계산하는 함수이다.
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    // get은 atom의 값을 가져오는 함수이다.
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter(toDo => toDo.category === category);
  }
});
