import './SavedMovies.css';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';


function SavedMovies() {
  const isSavedMoviesLocation = useLocation().pathname === "/saved-movies";

  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList isSavedMoviesLocation={isSavedMoviesLocation} />
    </section>
  );
}

export default SavedMovies;