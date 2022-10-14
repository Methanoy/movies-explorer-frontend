import './AboutMe.css';
import portfolioArrow from '../../../images/portfolio__arrow.svg';
import portfolioAvatar from '../../../images/portfolio__avatar.jpg';

function AboutMe() {

    return (
    <article className="about-me">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__profile-container">
            <img className="about-me__avatar" src={portfolioAvatar} alt="Улыбающийся мужчина в белой рубашке и светло-серых брюках сидит на камне на фоне моря" />
            <div className="about-me__profile-text">
                <h3 className="about-me__name">Алексей</h3>
                <p className="about-me__profession">Фрондент-разработчик, 33 года</p>
                <p className="about-me__summary">Я родился и живу в Подмосковье, закончил факультет права Академии Минюста России. Увлекаюсь музыкой, тайским боксом а ещё обожаю читать. Пару лет назад попробовал кодить разное и в итоге понял, что моё - фронтенд. Ниже можно посмотреть некоторые из моих работ. </p>
                <a className="about-me__git-link" target="_blank" href="https://github.com/Methanoy" rel="noopener noreferrer">Github</a>
            </div>
        </div>

        <div className="about-me__portfolio">
            <ul className="about-me__portfolio-list-title">Портфолио</ul>
                <li className="about-me__portfolio-list-item">
                    <p className="about-me__portfolio-item-name">Статичный сайт</p>
                    <a href="https://methanoy.github.io/how-to-learn/" target="_blank" rel="noopener noreferrer">
                        <img className="about-me__portfolio-arrow" src={portfolioArrow} alt="Стрелка-указатель перехода на страницу работы из портфолио." />
                    </a>
                </li>
                <li className="about-me__portfolio-list-item">
                    <p className="about-me__portfolio-item-name">Адаптивный сайт</p>
                    <a href="https://methanoy.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">
                        <img className="about-me__portfolio-arrow" src={portfolioArrow} alt="Стрелка-указатель перехода на страницу работы из портфолио." />
                    </a>
                </li>
                <li className="about-me__portfolio-list-item">
                    <p className="about-me__portfolio-item-name">Одностраничное приложение</p>
                    <a href="https://methanoy.nomoredomains.sbs/signin" target="_blank" rel="noopener noreferrer">
                        <img className="about-me__portfolio-arrow" src={portfolioArrow} alt="Стрелка-указатель перехода на страницу работы из портфолио." />
                    </a>
                </li>
        </div>
    </article>
    );
}

export default AboutMe;