import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import './Main.css';

function Main() {

  return (
    <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
    </div>
  );
}

export default Main;