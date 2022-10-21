import './Login.css';
import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../Form/Form';

function Login({ onLogin }) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const isLoginLocation = useLocation().pathname === "/signin";

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(userEmail, userPassword);
    };

    const handleEmailChange = (evt) => {
        setUserEmail(evt.target.value);
    };

    const handlePasswordChange = (evt) => {
      setUserPassword(evt.target.value);
    };

    return (
      <main className="login">
        <Form
          name="login"
          buttonText="Войти"
          titleText="Рады видеть!"
          redirectText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          onSubmit={handleSubmit}
          isLoginLocation={isLoginLocation}
        >

          <span className="register__input-title">E-mail</span>
          <input
            id="login-input"
            className="login__input"
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
            className="login__input"
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

export default Login;