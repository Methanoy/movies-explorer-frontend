import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';

function MoviesCardList(props) {
  
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items-container">
        <MoviesCard isSavedMoviesLocation={props.isSavedMoviesLocation} />
        <MoviesCard isSavedMoviesLocation={props.isSavedMoviesLocation} />
        <MoviesCard isSavedMoviesLocation={props.isSavedMoviesLocation} />
        <MoviesCard isSavedMoviesLocation={props.isSavedMoviesLocation} />
      </ul>
      {!props.isSavedMoviesLocation && (
        <button className="movies-card-list__add-more-btn" type="button" aria-label="Вывести на экран больше карточек фильмов">Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;