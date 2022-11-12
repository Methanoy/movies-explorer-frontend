import './Register.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ onSignup }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSignup(values.name, values.email, values.password);
        resetForm();
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
          isValid={isValid}
        >
          <label className="register__input-title" htmlFor="name-input">Имя</label>
          <input
            id="name-input"
            className={`register__input ${errors.name && 'register__input_error'}`}
            type="text"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            placeholder="Введите имя"
            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            required
          />
          <span className="register__input-error">{errors.name}</span>

          <label className="register__input-title" htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            className={`register__input ${errors.email && 'register__input_error'}`}
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            autoComplete="off"
            placeholder="info@ya.ru"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            required
          />
          <span className="register__input-error">{errors.email}</span>

          <label className="register__input-title" htmlFor="password-input">Password</label>
          <input
            id="password-input"
            className={`register__input ${errors.password && 'register__input_error'}`}
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
          <span className="register__input-error">{errors.password}</span>

        </Form>
      </main>
    );
}

export default Register;