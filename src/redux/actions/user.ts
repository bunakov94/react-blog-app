import { IUser } from '../reducers/user';

// eslint-disable-next-line import/prefer-default-export
export const setUser = (payload: IUser) => ({
  type: 'SET_USER',
  payload,
});
