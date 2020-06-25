import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './views/components/NavBar';
import Sidebar from './views/components/SideBar';
import ExamplesPage from './views/pages/ExamplesPage';
import LandingPage from './views/pages/LandingPage';
import ApiPage from './views/pages/ApiPage';
import ForTypescript from './views/pages/ForTypescript';

const App = () => (
  <div>
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/examples" component={ExamplesPage} />
        <Route exact path="/api" component={ApiPage} />
        <Route exact path="/typescript" component={ForTypescript} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
