import './App.css';
import { React, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const paths = ["/", "/movies", "/saved-movies"];

  return (
    <div className="app">
      <Route exact path={paths}>
        <Header isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/signup">
        <Register />
      </Route>
      <Route exact path="/signin">
        <Login />
      </Route>
      <Route exact path={paths}>
        <Footer />
      </Route>
    </div>
  );
}

export default App;
