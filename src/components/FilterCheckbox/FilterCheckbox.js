import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './FilterCheckbox.css';

function FilterCheckbox({ handleShortMoviesFilter, isLoggedIn }) {
  const isSavedMoviesLocation = useLocation().pathname === '/saved-movies';
  const currentUser = useContext(CurrentUserContext);
  const [isFilterOn, setIsFilterOn] = useState(false);

  function handleFilterToogle() {
      setIsFilterOn(!isFilterOn);
      handleShortMoviesFilter(!isFilterOn);
  }

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const localFilterStatus = JSON.parse(localStorage.getItem('isFilterOn'));
      if (localFilterStatus) {
        setIsFilterOn(localFilterStatus);
      }
    }
  }, [isLoggedIn, currentUser]);

  useEffect(() => {
    if (isLoggedIn && currentUser && isSavedMoviesLocation) {
      if (isSavedMoviesLocation) {
        setIsFilterOn(false);
      }
    }
  }, [isLoggedIn, currentUser, isSavedMoviesLocation]);

  return (
    <div className="filter">
    <span className="filter__decor-line"></span>
      <label className="filter__label">
        <input
          id="search-input"
          className="filter__checkbox"
          type="checkbox"
          name="checkbox"
          onChange={handleFilterToogle}
          checked={isFilterOn}
        />
        <span className="filter__slider"></span>
        <span className="filter__title">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;