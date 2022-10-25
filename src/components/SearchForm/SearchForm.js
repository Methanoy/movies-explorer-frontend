import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SearchForm({ search, isLoggedIn }) {
  const [userRequest, setUserRequest] = useState('');
  const currentUser = useContext(CurrentUserContext);

    const handleSubmitRequest = (evt) => {
        evt.preventDefault();
        search(userRequest);
    };

    const handleSearchFormChange = (evt) => {
      setUserRequest(evt.target.value);
    };

    useEffect(() => {
      if (isLoggedIn && currentUser) {
        const lastSearchRequest = JSON.parse(localStorage.getItem('searchRequest'));
        if (lastSearchRequest) {
          setUserRequest(lastSearchRequest);
        }
      }
    }, [isLoggedIn, currentUser]);

  return (
    <section className="search">
      <div className="search__size-limiter">
        <form className="search__form" name="search" onSubmit={handleSubmitRequest}>
          <input
            id="search-input"
            className="search__input"
            type="text"
            name="search"
            value={userRequest}
            onChange={handleSearchFormChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            placeholder="Фильм"
            required
          />
          <button
            className="search__form-btn"
            type="submit"
            aria-label="Кнопка поиска фильмов"
          ></button>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;