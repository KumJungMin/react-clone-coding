import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateTodo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos(prev => [
      ...prev,
      { text: toDo, id: Date.now(), category: 'TO_DO' }
    ]);
    setValue('toDo', '');
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: true,
          maxLength: 20
        })}
      />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;
