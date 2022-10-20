import './App.css';
import { React, useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
/* components */
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
/* utils */
import * as auth from '../utils/auth';
import MainApi from '../utils/MainApi';
import MoviesApi from '../utils/MoviesApi';
/* contexts */
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const headerPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const footerPaths = ["/", "/movies", "/saved-movies"];

  const history = useHistory();
  const [currentUser, setIsCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  function onSignup(userName, userEmail, userPassword) {
    auth
      .signup(userName, userEmail, userPassword)
      .then((res) => {
        if (res) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя: ${err}`);
      });
  }

  function onLogin(userEmail, userPassword) {
    auth
      .login(userEmail, userPassword)
      .then((res) => {
        if (res) {
          setEmail(userEmail);
          setIsLoggedIn(true);
          history.push('/');
          localStorage.setItem('login-status', 'logged-in');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при логине пользователя: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Route exact path={headerPaths}>
          <Header isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/signup">
          <Register onSignup={onSignup} />
        </Route>
        <Route exact path="/signin">
          <Login onLogin={onLogin} />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path={footerPaths}>
          <Footer />
        </Route>
        <Route exact path="/404">
          <NotFound />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
