import './Profile.css';
import { React, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';

function Profile({ handleUpdateUser, onSignout }) {
    const isProfileLocation = useLocation().pathname === "/profile";
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const isUserDataChange = currentUser.name !== values.name || currentUser.email !== values.email;

    function handleSubmit(evt) {
      evt.preventDefault();

      if (isUserDataChange) {
        handleUpdateUser(values);
      }
    }

    useEffect(() => {
        if (currentUser) {
          resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    return (
      <main className="profile">
        <Form
          name="profile"
          titleText={`Привет, ${currentUser.name}!`}
          signoutBtnText="Выйти"
          editBtnText="Редактировать"
          handleSubmit={handleSubmit}
          onSignout={onSignout}
          isProfileLocation={isProfileLocation}
          isUserDataChange={isUserDataChange}
          isValid={isValid}
        >
          <div className="profile__input-wrapper">
          <label className="profile__input-title" htmlFor="name-input">Имя</label>
            <input
              id="name-input"
              className={`profile__input ${errors.name && 'profile__input_error'}`}
              type="text"
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              autoComplete="off"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              required
            />
          </div>

          <div className="profile__input-wrapper">
            <label className="profile__input-title" htmlFor="email-input">E-mail</label>
            <input
              id="email-input"
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              type="email"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              autoComplete="off"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              required
            />
          </div>
        </Form>
      </main>
    );
}

export default Profile;