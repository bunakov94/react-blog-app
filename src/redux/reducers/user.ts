import ActionTypes from '../../types/actionTypes';
import { ISetUser, IUser } from '../../types/interfaces';

type TActionTypes = ISetUser;

export default function user(state: IUser = {} as IUser, action: TActionTypes) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...action.payload };

    default:
      return state;
  }
}
