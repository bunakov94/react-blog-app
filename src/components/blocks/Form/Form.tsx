import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignUp from './Form.signup';
import Edit from './Form.edit';
import LogIn from './Form.login';
import { IServerErrors } from './interfaces';
import useTypeSelector from '../../../hooks/useTypeSelector';

interface FormProps {
  type?: string;
}

const Form: FC<FormProps> = ({ type }: FormProps) => {
  const {
    user: { token, username, email },
  } = useTypeSelector((state) => state.user);
  const [serverErrors, setServerErrors] = useState<IServerErrors>({});
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({}) as { current: string };
  password.current = watch('password', '');

  if (type === 'login') {
    return (
      <LogIn
        setServerErrors={setServerErrors}
        register={register}
        errors={errors}
        serverErrors={serverErrors}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (type === 'edit') {
    return (
      <Edit
        register={register}
        errors={errors}
        serverErrors={serverErrors}
        handleSubmit={handleSubmit}
        setServerErrors={setServerErrors}
        token={token}
        username={username}
        email={email}
      />
    );
  }

  return (
    <SignUp
      errors={errors}
      serverErrors={serverErrors}
      setServerErrors={setServerErrors}
      register={register}
      handleSubmit={handleSubmit}
      password={password}
    />
  );
};

Form.defaultProps = {
  type: 'signup',
};

export default Form;
