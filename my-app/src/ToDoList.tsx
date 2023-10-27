import React from 'react';
import { useForm } from 'react-hook-form';
// useForm을 사용하면, form을 쉽게 다룰 수 있다.
// input값을 검증하고, 에러를 보여주고, form을 submit할 때의 동작을 정의할 수 있다.

interface IForm {
  todo: string;
}

function TodoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data);
    setValue('todo', ''); // 키, 값 형식
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('todo', { required: true, maxLength: 20 })} />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
