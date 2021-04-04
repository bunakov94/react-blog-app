import { IUser, ISetUser } from '../../types/interfaces';
import ActionTypes from '../../types/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setUser = (payload: IUser): ISetUser => ({
  type: ActionTypes.SET_USER,
  payload,
});
