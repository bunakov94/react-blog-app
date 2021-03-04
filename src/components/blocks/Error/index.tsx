import React from 'react';
import { Alert } from 'antd';
import style from './Error.module.scss';

const Error = () => (
  <div className={style.error}>
    <Alert message="Error" description="Something went wrong. Try it again." type="error" showIcon />
  </div>
);

export default Error;
