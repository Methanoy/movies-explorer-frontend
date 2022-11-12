import './Form.css';
import { React } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';

function Form(props) {

    return (
      <div className="form__container">
        {props.isProfileLocation ? null : (
          <Link to="/" className="form__landing-link">
            <div className="form__img-wrapper">
              <img
                className="form__logo"
                src={headerLogo}
                alt="Логотип приложения в форме синего кольца (пончика)."
              />
            </div>
          </Link>
        )}
        <h1 className={!props.isProfileLocation ? "form__greeting-title" : "form__greeting-title_profile"}>{props.titleText}</h1>
        {props.isProfileLocation ? (
          <form className="form" onSubmit={props.handleSubmit} noValidate>
            {props.children}
            <ul className="form__btn-list">
              <li className="form__btn-item">
                <button
                className={`form__edit-btn ${(props.isUserDataChange && props.isValid) && "form__edit-btn_visible"}`}
                type="submit"
                aria-label={props.editBtnText}
              >
                {props.editBtnText}
              </button>
              </li>
              <li className="form__btn-item">
                <button
                className="form__signout-btn"
                type="button"
                aria-label={props.signoutBtnText}
                onClick={props.onSignout}
              >
                {props.signoutBtnText}
              </button>
              </li>
            </ul>
          </form>
        ) : (
          <form className="form" onSubmit={props.handleSubmit} noValidate>
            {props.children}
            <button
              className={`form__submit-btn ${!props.isValid && 'form__submit-btn_locked'}`}
              type="submit"
              aria-label={props.buttonText}
              disabled={!props.isValid}
            >
              {props.buttonText}
            </button>
            <p className="form__redirect-text">
              {props.redirectText}
              <Link to={props.isLoginLocation ? "/signup" : "/signin"} className="form__signin-link">
                {props.linkText}
              </Link>
            </p>
          </form>
        )}
      </div>
    );
}

export default Form;