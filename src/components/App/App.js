import './App.css';
import { React, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const headerPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const footerPaths = ["/", "/movies", "/saved-movies"];

  return (
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
      <Route exact path="/signup">
        <Register />
      </Route>
      <Route exact path="/signin">
        <Login />
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
  );
}

export default App;
