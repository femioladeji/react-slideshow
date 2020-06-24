import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './views/components/NavBar';
import Sidebar from './views/components/SideBar';
import ExamplesPage from './views/pages/ExamplesPage';
import LandingPage from './views/pages/LandingPage';
import ApiPage from './views/pages/ApiPage';

const App = () => (
  <div>
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/examples" component={ExamplesPage} />
        <Route exact path="/api" component={ApiPage} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
