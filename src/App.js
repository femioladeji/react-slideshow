import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Examples from './views/Examples';
import Navbar from './views/Navbar';
import Sidebar from './views/Sidebar';
import GetStarted from './views/GetStarted';
import Api from './views/Api';

const App = () => (
  <div>
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={GetStarted} />
        <Route exact path="/examples" component={Examples} />
        <Route exact path="/api" component={Api} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
