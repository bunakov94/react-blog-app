import React, { FC } from 'react';
import { Alert } from 'antd';
import style from './Error.module.scss';

interface ErrorComponentProps {
  text: string;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ text }: ErrorComponentProps) => (
  <div className={style.error}>
    <Alert message="Error" description={text} type="error" showIcon />
  </div>
);

export default ErrorComponent;
