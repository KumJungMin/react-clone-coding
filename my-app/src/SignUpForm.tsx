import React from 'react';
import { useForm } from 'react-hook-form';
// useForm을 사용하면, form을 쉽게 다룰 수 있다.
// input값을 검증하고, 에러를 보여주고, form을 submit할 때의 동작을 정의할 수 있다.

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function SignUpForm() {
  // register는 input을 등록하는 함수이다.
  // register는 name, onBlur, onChange 등을 제공한다.
  // watch는 input의 변화를 감지하는 함수이다.
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm<IForm>({
    defaultValues: {
      email: 'hahahah@naver.com'
    }
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'password is not matched' },
        { shouldFocus: true }
      );
    }
  };

  return (
    <div>
      {/* handleSubmit은 유효성 검사가 성공하면 form 데이터를 받습니다. */}
      <form
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed'
            }
          })}
          placeholder='Email'
        />
        <input
          {...register('firstName', {
            required: 'write here',
            validate: {
              noNico: value =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noNick: value =>
                value.includes('nick') ? 'no nick allowed' : true
            }
          })}
          placeholder='First Name'
        />
        <input
          {...register('lastName', { required: 'write here' })}
          placeholder='Last Name'
        />
        <input
          {...register('username', { required: 'write here', minLength: 10 })}
          placeholder='Username'
        />
        <input
          {...register('password', { required: 'write here', minLength: 5 })}
          placeholder='Password'
        />
        <input
          {...register('password1', {
            // required에 메시지를 작성하여, 에러 메시지를 커스터마이징 할 수 있다.
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short.'
            }
          })}
          placeholder='Password1'
        />
        <span>{errors?.password1?.message}</span>
        <span>{errors?.extraError?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
