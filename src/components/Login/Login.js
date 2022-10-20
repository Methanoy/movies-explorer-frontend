import './Login.css';
import { React, useState } from 'react';
import Form from '../Form/Form';

function Login({ onLogin }) {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(userEmail, password);
    };

    const handleEmailChange = (evt) => {
        setUserEmail(evt.target.value);
    };

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
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
            value={password}
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