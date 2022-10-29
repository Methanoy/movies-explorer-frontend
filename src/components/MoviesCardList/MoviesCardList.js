import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import MoviesCard from './MoviesCard/MoviesCard';
import useScreenSize from '../../hooks/useScreenSize';

function MoviesCardList(props) {
  const screenSize = useScreenSize();
  const [cardDisplayParam, setCardDisplayParam] = useState({ cardsAmount: 999, addMore: 3 });
  
  useEffect(() => {
    if (!props.isSavedMoviesLocation) {
      if (screenSize > 1279) {
        setCardDisplayParam({ cardsAmount: 12, addMore: 3 });
      } else if (screenSize > 766 && screenSize < 1280) {
        setCardDisplayParam({ cardsAmount: 8, addMore: 2 })
      } else {
        setCardDisplayParam({ cardsAmount: 5, addMore: 1 })
      }
    }
  }, [screenSize, props.isSavedMoviesLocation])

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items-container">
        {props.movies.slice(0, cardDisplayParam.cardsAmount).map((movie) => (
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