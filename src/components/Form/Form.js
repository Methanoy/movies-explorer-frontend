import './Form.css';
import { React } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';

function Form(props) {

    return (
      <div className="form__container">
        <Link to="/" className="form__landing-link">
        <div className="forma__img-wrapper">
          <img
              className="form__logo"
              src={headerLogo}
              alt="Логотип приложения в форме синего кольца (пончика)."
          />
        </div>
        </Link>
        <h1 className="form__greeting-title">{props.titleText}</h1>
        <form className="form">
          {props.children}
          <button
            className="form__submit-btn"
            type="submit"
            aria-label={props.buttonText}
          >
            {props.buttonText}
          </button>
          <p className="form__redirect-text">
            {props.redirectText}
            <Link to="/signin" className="form__signin-link">
              {props.linkText}
            </Link>
          </p>
        </form>
      </div>
    );
}

export default Form;