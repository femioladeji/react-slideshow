import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Examples from './routes/Examples';
import Navbar from './routes/Navbar';
import GetStarted from './routes/GetStarted';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={GetStarted} />
      <Route exact path="/examples" component={Examples} />
    </Switch>
  </BrowserRouter>
);

export default App;
