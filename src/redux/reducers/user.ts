export interface IUser {
  bio: string | null;
  createdAt: string;
  email: string;
  id: number;
  image: string | null;
  token: string;
  updatedAt: string;
  username: string;
}

export default function user(state: IUser = {} as IUser, action: any) {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.payload };

    default:
      return state;
  }
}
