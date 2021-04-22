import React, { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import blogAPI from '../../../helpers/BlogApi';
import style from './Form.module.scss';
import { Avatar, Email, Password, Username } from './Form.fields';
import { IClientErrors, IFormInput, IServerErrors } from './interfaces';
import { setUser } from '../../../store/action-creators/user';

interface EditProps {
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
  serverErrors: IServerErrors;
  handleSubmit: (cb: (data: IFormInput) => Promise<void>) => MouseEventHandler<HTMLButtonElement> | undefined;
  setServerErrors: Dispatch<SetStateAction<IServerErrors>>;
  token: string;
  username: string;
  email: string;
}

const Edit: FC<EditProps> = ({
  register,
  errors,
  serverErrors,
  handleSubmit,
  setServerErrors,
  token,
  username,
  email,
}: EditProps) => {
  const dispatch = useDispatch();
  const onEdit = async (data: IFormInput) => {
    try {
      const res = await blogAPI.edit(data.email, data.password, data.username, data.avatar, token);
      if (res.errors) throw new Error(JSON.stringify(res.errors));
      dispatch(setUser(res.user));
    } catch (error) {
      setServerErrors(JSON.parse(error.message));
    }
  };

  return (
    <form className={style.form} onSubmit={(event) => event.preventDefault()}>
      <h1 className={style.formTitle}>Edit Profile</h1>
      <Username register={register} errors={errors} serverErrors={serverErrors} value={username} />
      <Email register={register} errors={errors} serverErrors={serverErrors} value={email} />
      <Password register={register} errors={errors} serverErrors={serverErrors} />
      <Avatar register={register} errors={errors} />

      <button className={style.submit} type="submit" onClick={handleSubmit(onEdit)}>
        Save
      </button>
    </form>
  );
};

export default Edit;
