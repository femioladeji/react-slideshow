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
import Next from './views/pages/Next';
import './views/styles.css';
import './assets/fonts/proxima-nova-regular.otf';

const App = () => {
  const [sidebar, setSidebar] = useState(false);
  const sideBarItem = document.querySelector('.sidebar');

  window.onresize = () => {
    if (window.screen.width > 768) {
      sideBarItem.style.marginLeft = '0';
    } else {
      sideBarItem.style.marginLeft = '-50%';
    }
  };

  const toggleSidebar = () => {
    const sideBarItems = document.querySelector('.sidebar');
    if (sidebar) {
      sideBarItems.style.marginLeft = '-50%';
    } else {
      sideBarItems.style.marginLeft = '0';
    }
    setSidebar(!sidebar);
  };

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} isOpen={sidebar} />
      <Sidebar />
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/all-examples" component={ExamplesPage} />
          <Route exact path="/api" component={ApiPage} />
          <Route exact path="/typescript" component={ForTypescript} />
          <Route exact path="/slide-effect" component={SlideExample} />
          <Route exact path="/fade-effect" component={FadeExample} />
          <Route exact path="/zoom-effect" component={ZoomExample} />
          <Route exact path="/next" component={Next} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
