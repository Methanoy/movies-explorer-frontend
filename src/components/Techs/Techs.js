import './Techs.css';

function Techs() {
  
    return (
    <article className="techs">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
            <li>HTML</li>
            <li>CSS</li>
            <li>JS</li>
            <li>React</li>
            <li>Git</li>
            <li>Express.js</li>
            <li>mongoDB</li>
        </ul>
    </article>
    );
}

export default Techs;