import React, { FC, useState } from 'react';
import cn from 'classnames';
import { Popover } from 'antd';
import { useHistory } from 'react-router-dom';
import Icon from '../../../assets/images/popup-icon.svg';

import styles from './PopUp.module.scss';
import button from '../../layout/Header/Header.module.scss';
import style from '../../layout/Article/Article.module.scss';
import blogApi from '../../../helpers/BlogApi';
import { getUserToken } from '../../../helpers/localStorage';

interface PopUpProps {
  slug: string;
}

const PopUp: FC<PopUpProps> = ({ slug }: PopUpProps): JSX.Element => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const token = getUserToken() || '';

  const handleVisibleChange = (visible: boolean) => {
    setIsOpen(visible);
  };

  const deleteArticle = () => {
    blogApi.deleteArticle(token, slug).then(() => history.push('/'));
  };

  return (
    <Popover
      placement="right"
      visible={isOpen}
      onVisibleChange={handleVisibleChange}
      content={
        <div className={styles.popup}>
          <div className={styles.message}>
            <img src={Icon} alt="" className={styles.image} />
            <p className={styles.text}>Are you sure to delete this article?</p>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => setIsOpen(!isOpen)} type="button" className={cn(styles.button, styles.dismiss)}>
              No
            </button>
            <button onClick={() => deleteArticle()} type="button" className={cn(styles.button, styles.submit)}>
              Yes
            </button>
          </div>
        </div>
      }
      trigger="click"
    >
      <button type="button" className={`${button.button} ${style.delete}`}>
        Delete
      </button>
    </Popover>
  );
};

export default PopUp;
