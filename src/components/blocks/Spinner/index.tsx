import React from 'react';
import { Spin } from 'antd';
import style from './Spinner.module.scss';

const Spinner: React.FC = () => (
  <div className={style.spin}>
    <Spin />
  </div>
);

export default Spinner;
