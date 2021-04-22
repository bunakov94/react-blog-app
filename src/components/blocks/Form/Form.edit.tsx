import React from 'react';
import { useForm } from 'react-hook-form';
import blogAPI from '../../../helpers/BlogApi';
import { setUserToken } from '../../../helpers/localStorage';
import style from './Form.module.scss';
import { Avatar, Email, Password, Username } from './Form.fields';
import { IClientErrors, IFormInput, IServerErrors } from './interfaces';

interface IProps {
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
  serverErrors: IServerErrors;
  hasError: boolean;
  handleSubmit: Function;
  setHasError: Function;
  setServerErrors: Function;
  setUser: Function;
  token: string;
  username: string;
  email: string;
}

const Edit = ({
  register,
  errors,
  serverErrors,
  hasError,
  handleSubmit,
  setHasError,
  setServerErrors,
  setUser,
  token,
  username,
  email,
}: IProps) => {
  const onEdit = async (data: IFormInput) => {
    try {
      const res = await blogAPI.edit(data.email, data.password, data.username, data.avatar, token);
      if (res.errors) {
        setHasError(true);
        setServerErrors(res.errors);
      }
      const { user } = res;
      setUser({ ...user });
      setUserToken(user.token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <form className={style.form} onSubmit={(event) => event.preventDefault()}>
      <h1 className={style.formTitle}>Edit Profile</h1>
      <Username register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} value={username} />
      <Email register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} value={email} />
      <Password register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />
      <Avatar register={register} errors={errors} />

      <button className={style.submit} type="submit" onClick={handleSubmit(onEdit)}>
        Save
      </button>
    </form>
  );
};

export default Edit;
