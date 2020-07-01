import React from 'react';
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

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Sidebar />
    <div style={{ marginTop: '150px' }}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/all-examples" component={ExamplesPage} />
        <Route exact path="/api" component={ApiPage} />
        <Route exact path="/typescript" component={ForTypescript} />
        <Route exact path="/slide-effect" component={SlideExample} />
        <Route exact path="/fade-effect" component={FadeExample} />
        <Route exact path="/zoom-effect" component={ZoomExample} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
