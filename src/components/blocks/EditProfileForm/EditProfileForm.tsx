import React from 'react';

import style from './EditProfileForm.module.scss';

const EditProfileForm = () => (
  <form action="#" className={style.form}>
    <h1 className={style.formTitle}>Edit Profile</h1>
    <label className={style.formItem}>
      Username
      <input type="text" className={style.formInput} placeholder="Username" />
    </label>
    <label className={style.formItem}>
      Email address
      <input type="text" className={style.formInput} placeholder="Email address" />
    </label>
    <label className={style.formItem}>
      New password
      <input type="text" className={style.formInput} placeholder="New password" />
    </label>
    <label className={style.formItem}>
      Avatar image(url)
      <input type="text" className={style.formInput} placeholder="Avatar image" />
    </label>

    <button className={style.submit} type="submit">
      Save
    </button>
  </form>
);

export default EditProfileForm;
