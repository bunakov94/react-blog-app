import { Dispatch } from 'redux';
import { IUser, UserAction, UserActionTypes } from '../../types/user';
import { getUserToken } from '../../helpers/localStorage';

export const fetchUser = () => async (dispatch: Dispatch<UserAction>) => {
  const UserToken = await getUserToken();
  if (!UserToken) return;
  try {
    dispatch({ type: UserActionTypes.FETCH_USER });
    const response = await fetch('https://conduit.productionready.io/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${UserToken}`,
      },
    });
    const user = await response.json();
    dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user.user });
  } catch (error) {
    dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: error.message });
  }
};

export const removeUser = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: {} as IUser });
};

export const setUser = (user: IUser) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: user });
  window.location.reload();
};
