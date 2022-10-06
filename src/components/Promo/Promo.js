import './Promo.css';

function Promo() {

  return (
    <div className="promo">
        <div className="promo__text-container">
            <h1>Учебный проект студента факультета Веб-разработки.</h1>
            <p>Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
            <button>Узнать больше</button>
        </div>
        <div className="promo__img-container">
            <img className="promo__img" src="../../images/landing-logo.svg" alt="Изображение лобуса, нарисованного из слов 'web'" />
        </div>
    </div>
  );
}

export default Promo;