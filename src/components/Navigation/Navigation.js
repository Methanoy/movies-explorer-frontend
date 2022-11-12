import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ isLoggedIn }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLinkClicked, setIsLinkClicked] = useState(false);

    function toggleSidebarBtn() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function handleLinkClick() {
        setIsLinkClicked(!setIsLinkClicked);
        setIsSidebarOpen(!isSidebarOpen)
    }
    
    return(
        <>
            {isLoggedIn ? (
                <nav className={`navigation ${(isSidebarOpen && !isLinkClicked) && 'navigation__wrapper'}`}>
                    <ul className={`navigation__menu-list navigation__menu-list_logged ${(isSidebarOpen && !isLinkClicked) && 'navigation__menu-list_sidebar navigation__menu-list_visible navigation__menu-list_visible_logged'}`}>
                        <li className="navigation__menu-item navigation__hide-item">
                            <NavLink exact to="/" onClick={handleLinkClick} activeClassName="navigation__link_active" className="navigation__link navigation__link-text">Главная</NavLink>
                        </li>
                        <div className="navigation__movies-link-container">
                            <li className="navigation__menu-item">
                                <NavLink exact to="/movies" onClick={handleLinkClick} activeClassName="navigation__link_active" className="navigation__link navigation__link-text">Фильмы</NavLink>
                            </li>
                            <li className="navigation__menu-item">
                                <NavLink exact to="/saved-movies" onClick={handleLinkClick} activeClassName="navigation__link_active" className="navigation__link navigation__link-text">Сохранённые фильмы</NavLink>
                            </li>
                        </div>
                        <li className="navigation__menu-item">
                            <NavLink exact to="/profile" onClick={handleLinkClick} activeClassName="navigation__link_active-account" className={`navigation__link_account ${isLoggedIn && "navigation__link_account-main"} ${(isLoggedIn && isSidebarOpen) && "navigation__link_account-sidebar"}`}>Аккаунт</NavLink>
                        </li>
                    </ul>
                    <div className="navigation__burger-container">
                        <button onClick={toggleSidebarBtn} className={`navigation__burger-btn ${(isSidebarOpen && !isLinkClicked) &&'navigation__burger-btn_active'}`} type="button" aria-label="Меню навигации по сайту">
                            <span/>
                        </button>
                    </div>
                </nav>
            ) : (
                <nav className="navigation">
                    <ul className="navigation__menu-list navigation__menu-list_unlogged navigation__menu-list_visible navigation__menu-list_visible_unlogged">
                        <li className="navigation__menu-item">
                            <Link to="/signup" className="navigation__link navigation__link-text_unlogged">Регистрация</Link>
                        </li>
                        <li className="navigation__menu-item">
                            <Link to="/signin" className="navigation__link navigation__link-text_unlogged navigation__link_signin-btn">Войти</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Navigation;