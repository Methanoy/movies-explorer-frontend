import './Profile.css';
import { React, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';

function Profile({ onEdit, onSignout }) {
    const isProfileLocation = useLocation().pathname === "/profile";
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleChangeName(evt) {
      setName(evt.target.value);
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleSubmit(evt) {
      evt.preventDefault();

      onEdit({
        name,
        email,
      });
    }

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    return (
      <main className="profile">
        <Form
          name="profile"
          titleText={`Привет, ${name}!`}
          signoutBtnText="Выйти"
          editBtnText="Редактировать"
          onEdit={handleSubmit}
          onSignout={onSignout}
          isProfileLocation={isProfileLocation}
        >
          <div className="profile__input-wrapper">
            <span className="profile__input-title">Имя</span>
            <input
              id="name-input"
              className="profile__input"
              type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
              minLength="2"
              maxLength="40"
              autoComplete="off"
              required
            />
          </div>
          <div className="profile__input-wrapper">
            <span className="profile__input-title">E-mail</span>
            <input
              id="login-input"
              className="profile__input"
              type="email"
              name="login"
              value={email}
              onChange={handleChangeEmail}
              minLength="2"
              maxLength="40"
              autoComplete="off"
              required
            />
          </div>
        </Form>
      </main>
    );
}

export default Profile;