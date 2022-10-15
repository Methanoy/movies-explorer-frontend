import './AboutProject.css';

function AboutProject() {

  return (
    <article className="about-project">
        <div className="about-project__size-limiter">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__text-container">
                <div>
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="timebar">
                <div className="timebar__line">
                    <div className="timebar__text timebar__text_filled-timeline timebar_filled-timeline">1 неделя</div>
                    <div className="timebar_unfilled-timeline"></div>
                </div>
                <div className="timebar__line timebar__text timebar_unfilled-timeline">4 недели</div>
                <div className="timebar__line timebar__text timebar__description">Back-end</div>
                <div className="timebar__line timebar__text timebar__description">Front-end</div>
            </div>
        </div>
    </article>
  );
}

export default AboutProject;