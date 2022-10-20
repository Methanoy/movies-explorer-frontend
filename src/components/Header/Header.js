import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
    const currentLocation = useLocation();

    return(
        <header className={`header header_theme_${
            currentLocation.pathname === '/' ? 'grey' : 'light'
        }`}>
            <div className={`header__container header__container_${isLoggedIn ? "logged" : "unlogged"}`}>
                <Link to="/" className="header__link">
                    <img className="header__logo" src={headerLogo} alt="Логотип приложения в форме синего кольца (пончика)."/>
                </Link>
                <Navigation isLoggedIn={isLoggedIn} />
            </div>
        </header>
    );
}

export default Header;