import React from 'react';
import { Alert } from 'antd';
import style from './Error.module.scss';

interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }: ErrorProps) => (
  <div className={style.error}>
    <Alert message="Error" description={text} type="error" showIcon />
  </div>
);

export default Error;
