import './MoviesCard.css';
import { makeImgURL, convertMinutesToHours } from '../../../utils/utils';

function MoviesCard({ liked, movie, isSavedMoviesLocation, handleLikeMovieCard, handleUnlikeMovieCard }) {

  function handleClickDislike() {
    handleUnlikeMovieCard(movie);
  }

  function handleLikeToggle() {
    if (liked) {
      handleUnlikeMovieCard({...liked, id: liked._id});
    } else {
      handleLikeMovieCard(movie);
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
              liked ? 'active' : 'inactive'
            }`}
            onClick={handleLikeToggle}
            type="button"
            aria-label="Добавить карточку в избранные или удалить"
          ></button>
        ) : (
          <button
            className="card__favourite-btn card__favourite-btn_delete"
            onClick={handleClickDislike}
            type="button"
            aria-label="Удалить карточку из избранного"
          ></button>
        )}
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          className="card__img"
          src={isSavedMoviesLocation ? movie.image : makeImgURL(movie.image.url)}
          title={movie.nameRU}
          alt={movie.description}
        />
      </a>
    </li>
  );
}

export default MoviesCard;