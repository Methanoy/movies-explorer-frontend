import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm({ handleUserMoviesSearch }) {
  const [userRequest, setUserRequest] = useState('');

    const handleSubmitRequest = (evt) => {
        evt.preventDefault();
        handleUserMoviesSearch(userRequest);
    };

    const handleSearchFormChange = (evt) => {
      setUserRequest(evt.target.value);
  };

  return (
    <section className="search">
      <div className="search__size-limiter">
        <form className="search__form" name="search" onSubmit={handleSubmitRequest}>
          <input
            id="search-input"
            className="search__input"
            type="text"
            name="search"
            // value={userSearchRequest || ''}
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