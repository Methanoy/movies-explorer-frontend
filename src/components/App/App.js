import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {

  return (
    <div className="app">
      <Header />
      <Route exact path="/">
        <Main />
      </Route>
    </div>
  );
}

export default App;
