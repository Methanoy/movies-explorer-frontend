import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ isLoggedIn }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // function onSignout() {
    //     setIsSmallMenuOpen(false);
    //     setLogOut();
    // }

    function toggleSidebarBtn() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return(
        <>
            {isLoggedIn ? (
                <nav className={`navigation ${isSidebarOpen && 'navigation__wrapper'}`}>
                    <ul className={`navigation__menu-list ${isSidebarOpen && 'navigation__menu-list_sidebar navigation__menu-list_visible'}`}>
                        {isSidebarOpen && (
                            <li className="navigation__menu-item">
                                <NavLink exact to="/" activeClassName="" className="navigation__link">Главная</NavLink>
                            </li>
                        )}
                        <li className="navigation__menu-item">
                            <NavLink exact to="/movies" activeClassName="" className="navigation__link">Фильмы</NavLink>
                        </li>
                        <li className="navigation__menu-item">
                            <NavLink exact to="/saved-movies" activeClassName="" className="navigation__link">Сохранённые фильмы</NavLink>
                        </li>
                        <li className="navigation__menu-item">
                            <NavLink exact to="/profile" activeClassName="" className="navigation__link_account">Аккаунт</NavLink>
                        </li>
                    </ul>
                    <button onClick={toggleSidebarBtn} className={`navigation__small-menu-btn ${isSidebarOpen && 'navigation__small-menu-btn_active'}`} type="button">
                        <span/>
                    </button>
                </nav>
            ) : (
                <nav className="navigation">
                    <ul className="navigation__menu-list navigation__menu-list_visible">
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