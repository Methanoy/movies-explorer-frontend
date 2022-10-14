import './Footer.css';

function Footer() {

    return (
        <footer className="footer">
            <p className="footer__annotation">Учебный проект Яндекс.Практикум х BeatFilm.</p>

            <div className="footer__container">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                    <ul className="footer__link-list">
                        <li>
                            <a className="footer__link-name" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li>
                            <a className="footer__link-name" href="https://github.com/Methanoy" target="_blank" rel="noopener noreferrer">
                                Github
                            </a>
                        </li>
                    </ul>
            </div>
        </footer>
        );
}

export default Footer;