import './AboutMe.css';
import Avatar from '../../../images/about-me__avatar.jpg';

function AboutMe() {

    return (
    <article className="about-me">
        <div className="about-me__size-limiter">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__profile-container">
                <img className="about-me__avatar" src={Avatar} alt="Улыбающийся мужчина в белой рубашке и светло-серых брюках сидит на камне на фоне моря" />
                <div className="about-me__profile-text">
                    <h3 className="about-me__name">Алексей</h3>
                    <p className="about-me__profession">Фрондент-разработчик, 33 года</p>
                    <p className="about-me__summary">Я родился и живу в Подмосковье, закончил факультет права Академии Минюста России. Увлекаюсь музыкой, тайским боксом а ещё обожаю читать. Пару лет назад попробовал кодить разное и в итоге понял, что моё - фронтенд. Ниже можно посмотреть некоторые из моих работ. </p>
                    <a className="about-me__git-link" target="_blank" href="https://github.com/Methanoy" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </div>
    </article>
    );
}

export default AboutMe;