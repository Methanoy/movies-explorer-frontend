import './Footer.css';

function Footer() {

    return (
        <footer className="footer">
            <div className="footer__size-limiter">
                <p className="footer__annotation">Учебный проект Яндекс.Практикум х BeatFilm.</p>

                <div className="footer__container">
                    <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                        <ul className="footer__link-list">
                            <li className="item">
                                <a className="footer__link-name" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">
                                    Яндекс.Практикум
                                </a>
                            </li>
                            <li className="item">
                                <a className="footer__link-name" href="https://github.com/Methanoy" target="_blank" rel="noopener noreferrer">
                                    Github
                                </a>
                            </li>
                        </ul>
                </div>
            </div>
        </footer>
        );
}

export default Footer;