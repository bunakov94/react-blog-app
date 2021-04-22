export interface IServerErrors {
  username?: string[];
  password?: string[];
  email?: string[];
}

export interface IFormInput {
  username: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
}

export interface IClientErrors {
  username?: { message: string };
  password?: { message: string };
  password_repeat?: { message: string };
  email?: { message: string };
  acceptTerms?: { message: string };
  avatar?: { message: string };
}
