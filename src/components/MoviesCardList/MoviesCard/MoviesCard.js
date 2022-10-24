import './MoviesCard.css';
import { makeImgURL, convertMinutesToHours } from '../../../utils/utils';

function MoviesCard({ movie, isSavedMoviesLocation, handleAddNewMovieCard, handleDeleteMovieCard, savedMovies }) {

  const isLiked = savedMovies.some((i) => i.movieId === movie.id);
  const findLikedCard = savedMovies.filter((i) => i.movieId === movie.id);

  function handleDeleteClick() {
    handleDeleteMovieCard(movie);
  }

  function handleLikeToogle() {
    if (isLiked) {
      handleDeleteMovieCard(findLikedCard[0]);
    } else {
      handleAddNewMovieCard(movie);
    }
  }

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__description-container">
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__duration">
            {convertMinutesToHours(movie.duration)}
          </p>
        </div>
        {!isSavedMoviesLocation ? (
          <button
            className={`card__favourite-btn card__favourite-btn_${
              isLiked ? 'active' : 'inactive'
            }`}
            onClick={handleLikeToogle}
            type="button"
            aria-label="Добавить карточку в избранные или удалить"
          ></button>
        ) : (
          <button
            className="card__favourite-btn card__favourite-btn_delete"
            onClick={handleDeleteClick}
            type="button"
            aria-label="Удалить карточку из избранного"
          ></button>
        )}
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          className="card__img"
          src={makeImgURL(movie.image.url)}
          title={movie.nameRU}
          alt={movie.description}
        />
      </a>
    </li>
  );
}

export default MoviesCard;