import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignUp from './Form.signup';
import Edit from './Form.edit';
import LogIn from './Form.login';
import { IServerErrors } from './interfaces';
import useTypeSelector from '../../../hooks/useTypeSelector';

interface IProps {
  type?: string;
}

const Form = ({ type }: IProps) => {
  const {
    user: { token, username, email },
  } = useTypeSelector((state) => state.user);
  const [serverErrors, setServerErrors] = useState({} as IServerErrors);
  const [hasError, setHasError] = useState(false);
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({}) as { current: string };
  password.current = watch('password', '');

  if (type === 'login') {
    return (
      <LogIn
        setHasError={setHasError}
        setServerErrors={setServerErrors}
        register={register}
        errors={errors}
        serverErrors={serverErrors}
        hasError={hasError}
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
        hasError={hasError}
        handleSubmit={handleSubmit}
        setHasError={setHasError}
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
      hasError={hasError}
      setServerErrors={setServerErrors}
      setHasError={setHasError}
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
