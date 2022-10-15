import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';

function Header() {
    const currentLocation = useLocation();

    return(
        <header className={`header header_theme_${
            currentLocation.pathname === '/' ? 'grey' : 'light'
        }`}>
            <div className="header__container">
                <Link to="/" className="header__link">
                    <img className="header__logo" src={headerLogo} alt="Логотип приложения в форме синего кольца (пончика)."/>
                </Link>
                <nav>Регистрация Войти</nav>
            </div>
        </header>
    );
}

export default Header;