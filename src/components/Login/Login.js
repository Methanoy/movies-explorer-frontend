import './Login.css';
import { React } from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {
    const isLoginLocation = useLocation().pathname === "/signin";
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(values.email, values.password);
        resetForm();
    };

    return (
      <main className="login">
        <Form
          name="login"
          buttonText="Войти"
          titleText="Рады видеть!"
          redirectText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          handleSubmit={handleSubmit}
          isLoginLocation={isLoginLocation}
          isValid={isValid}
        >

          <label className="login__input-title" htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            className={`login__input ${errors.email && 'login__input_error'}`}
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            placeholder='info@ya.ru'
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            required
          />
          <span className="login__input-error">{errors.email}</span>

          <label className="login__input-title" htmlFor="password-input">Password</label>
          <input
            id="password-input"
            className={`login__input ${errors.password && 'login__input_error'}`}
            type="password"
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            minLength="4"
            maxLength="30"
            autoComplete="off"
            placeholder='****'
            required
          />
          <span className="login__input-error">{errors.password}</span>

        </Form>
      </main>
    );
}

export default Login;