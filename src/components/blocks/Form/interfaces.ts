import { useForm } from 'react-hook-form';

export interface IServerErrors {
  username?: string[];
  password?: string[];
  email?: string[];
}

export interface IClientErrors {
  username?: { message: string };
  password?: { message: string };
  password_repeat?: { message: string };
  email?: { message: string };
  acceptTerms?: { message: string };
  avatar?: { message: string };
}

interface IServerErrorsBundle {
  serverErrors: IServerErrors;
}

export interface IFormInput {
  username: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
}

interface IFormElementsProps {
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
}

export interface IUserNameProps extends IFormElementsProps, IServerErrorsBundle {
  value?: string;
}

export interface IEmailProps extends IFormElementsProps, IServerErrorsBundle {
  value?: string;
}

export interface IPasswordProps extends IFormElementsProps, IServerErrorsBundle {}

export interface IConfirmPasswordProps extends IFormElementsProps {
  password: { current: string };
}

export interface IAcceptTermsProps extends IFormElementsProps {}

export interface IAvatarProps extends IFormElementsProps {}
