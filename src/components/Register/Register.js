import './Register.css';
import { React, useState } from 'react';
import Form from '../Form/Form';

function Register({ onSignup }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSignup(userName, userEmail, userPassword);
    };

    const handleNameChange = (evt) => {
        setUserName(evt.target.value);
    };

    const handleEmailChange = (evt) => {
        setUserEmail(evt.target.value);
    };

    const handlePasswordChange = (evt) => {
      setUserPassword(evt.target.value);
  };

    return (
      <main className="register">
        <Form
          name="register"
          buttonText="Зарегистрироваться"
          titleText="Добро пожаловать!"
          redirectText="Уже зарегистрированы?"
          linkText="Войти"
          handleSubmit={handleSubmit}
        >
          <span className="register__input-title">Имя</span>
          <input
            id="name-input"
            className="register__input"
            type="text"
            name="name"
            value={userName}
            onChange={handleNameChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            placeholder='Введите имя'
            required
          />
          <span className="register__input-title">E-mail</span>
          <input
            id="login-input"
            className="register__input"
            type="email"
            name="login"
            value={userEmail}
            onChange={handleEmailChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            placeholder='info@ya.ru'
            required
          />
          <span className="register__input-title">Password</span>
          <input
            id="password-input"
            className="register__input"
            type="password"
            name="password"
            value={userPassword}
            onChange={handlePasswordChange}
            minLength="4"
            maxLength="30"
            autoComplete="off"
            placeholder='****'
            required
          />
        </Form>
      </main>
    );
}

export default Register;