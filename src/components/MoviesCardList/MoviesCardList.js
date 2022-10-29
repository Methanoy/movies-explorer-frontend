import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import useScreenSize from '../../hooks/useScreenSize';

function MoviesCardList(props) {
  const screenSize = useScreenSize();
  console.log(screenSize);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items-container">
        {props.movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie.movieId}
            savedMovies={props.savedMovies}
            isSavedMoviesLocation={props.isSavedMoviesLocation}
            handleLikeMovieCard={props.handleLikeMovieCard}
            handleUnlikeMovieCard={props.handleUnlikeMovieCard}
          />
        ))}
      </ul>
        <button
          className={`movies-card-list__add-more-btn ${props.isSavedMoviesLocation && 'movies-card-list__add-more-btn_hidden'}`}
          type="button"
          aria-label="Вывести на экран больше карточек фильмов"
        >
          Ещё
        </button>
    </section>
  );
}

export default MoviesCardList;