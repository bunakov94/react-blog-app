import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/user';
import { IState, IUser } from '../../../types/interfaces';
import SignUp from './Form.signup';
import Edit from './Form.edit';
import LogIn from './Form.login';
import { IServerErrors } from './interfaces';

interface IProps {
  type?: string;
  setUser: (payload: IUser) => void;
  userData: IUser;
}

const Form = ({ type, setUser, userData }: IProps) => {
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
        setUser={setUser}
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
        setUser={setUser}
        token={userData.token}
        username={userData.username}
        email={userData.email}
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
      setUser={setUser}
    />
  );
};

Form.defaultProps = {
  type: 'signup',
};

const mapStateToProps = (state: IState) => ({
  userData: state.user,
});

export default connect(mapStateToProps, actions)(Form);
