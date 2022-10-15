import './Portfolio.css';
import portfolioArrow from '../../../images/portfolio__arrow.svg';

function Portfolio() {
    return (
        <article className="portfolio">
            <div className="portfolio__size-limiter">
                <ul className="portfolio__list-title">Портфолио</ul>
                    <li className="portfolio__list-item">
                        <a className="portfolio__link" href="https://methanoy.github.io/how-to-learn/" target="_blank" rel="noopener noreferrer">
                            <p className="portfolio__item-name">Статичный сайт</p>
                            <img className="portfolio__arrow" src={portfolioArrow} alt="Стрелка-указатель перехода на страницу работы из портфолио." />
                        </a>
                    </li>
                    <li className="portfolio__list-item">
                        <a className="portfolio__link" href="https://methanoy.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">
                            <p className="portfolio__item-name">Адаптивный сайт</p>
                            <img className="portfolio__arrow" src={portfolioArrow} alt="Стрелка-указатель перехода на страницу работы из портфолио." />
                        </a>
                    </li>
                    <li className="portfolio__list-item">
                        <a className="portfolio__link" href="https://methanoy.nomoredomains.sbs/signin" target="_blank" rel="noopener noreferrer">
                            <p className="portfolio__item-name">Одностраничное приложение</p>
                            <img className="portfolio__arrow" src={portfolioArrow} alt="Стрелка-указатель перехода на страницу работы из портфолио." />
                        </a>
                    </li>
            </div>
        </article>
    );
}

export default Portfolio;