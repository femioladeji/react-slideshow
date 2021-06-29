import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './views/components/NavBar';
import Sidebar from './views/components/SideBar';
import ExamplesPage from './views/pages/ExamplesPage';
import LandingPage from './views/pages/LandingPage';
import ApiPage from './views/pages/ApiPage';
import ForTypescript from './views/pages/ForTypescript';
import SlideExample from './views/pages//Examples/Slide';
import FadeExample from './views/pages//Examples/Fade';
import ZoomExample from './views/pages//Examples/Zoom';
import ZoomOutExample from './views/pages//Examples/ZoomOut';
import CustomArrow from './views/pages//Examples/CustomArrow';
import CustomIndicator from './views/pages//Examples/CustomIndicator';
import PauseHover from './views/pages//Examples/PauseHover';
import MultipleSlides from './views/pages/Examples/MultipleSlides';
import CanSwipe from './views/pages//Examples/CanSwipe';
import Autoplay from './views/pages//Examples/Autoplay';
import Methods from './views/pages//Examples/Methods';
import Callback from './views/pages//Examples/Callback';
import Next from './views/pages/Next';
import './views/styles.css';
import './app.css';

// package css
import '../src/css/styles.css';

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  window.onresize = () => {
    if (window.screen.width > 768) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  };

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} isOpen={sidebar} />
      <Sidebar isOpen={sidebar} />
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/all-examples" component={ExamplesPage} />
          <Route exact path="/api" component={ApiPage} />
          <Route exact path="/typescript" component={ForTypescript} />
          <Route exact path="/slide-effect" component={SlideExample} />
          <Route exact path="/fade-effect" component={FadeExample} />
          <Route exact path="/zoom-in" component={ZoomExample} />
          <Route exact path="/zoom-out" component={ZoomOutExample} />
          <Route exact path="/custom-arrows" component={CustomArrow} />
          <Route exact path="/custom-indicators" component={CustomIndicator} />
          <Route exact path="/pause-hover" component={PauseHover} />
          <Route exact path="/multiple-slides" component={MultipleSlides} />
          <Route exact path="/can-swipe" component={CanSwipe} />
          <Route exact path="/autoplay" component={Autoplay} />
          <Route exact path="/methods" component={Methods} />
          <Route exact path="/callback" component={Callback} />
          <Route exact path="/next" component={Next} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
