import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import './Main.css';

function Main() {

  return (
    <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
    </div>
  );
}

export default Main;