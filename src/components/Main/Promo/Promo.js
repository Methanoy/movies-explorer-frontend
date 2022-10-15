import './Promo.css';
import promoLogo from '../../../images/landing-logo.svg';

function Promo() {

  return (
    <article className="promo">
      <div className="promo__size-limiter">
          <div className="promo__text-container">
              <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
              <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
              <button className="promo__btn">Узнать больше</button>
          </div>
          <div className="promo__img-container">
              <img className="promo__img" src={promoLogo} alt="Изображение глобуса, нарисованного из латинских слов 'web'" />
          </div>
      </div>
    </article>
  );
}

export default Promo;