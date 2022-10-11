import './AboutProject.css';

function AboutProject() {

  return (
    <article className="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__text-container">
            <h3>Дипломный проект включал 5 этапов</h3>
            <h3>На выполнение диплома ушло 5 недель</h3>
            <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <div>1 неделя</div>
            <div>4 недели</div>
            <span>Back-end</span>
            <span>Front-end</span>
        </div>
    </article>
  );
}

export default AboutProject;