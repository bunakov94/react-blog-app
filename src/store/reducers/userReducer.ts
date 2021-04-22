import { IUser, UserAction, UserActionTypes, UserState } from '../../types/user';

const initialState: UserState = {
  user: {} as IUser,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { ...state, loading: true, error: null };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case UserActionTypes.FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
