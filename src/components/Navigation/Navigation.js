import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ isLoggedIn }) {

    return(
        <>
            {isLoggedIn ? (
                <nav className="navigation">!Заготовка!</nav>
            ) : (
                <nav className="navigation">
                    <ul className="navigation__menu-list">
                        <li className="navigation__menu-item">
                            <Link to="/signup" className="navigation__link">Регистрация</Link>
                        </li>
                        <li className="navigation__menu-item">
                            <Link to="/signin" className="navigation__link navigation__link_signin-btn">Войти</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Navigation;