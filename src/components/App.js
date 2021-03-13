import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/players'>
          <Players />
        </Route>
        <Route path='/teams'>
          <Teams />
        </Route>
      </Router>
    </div>
  );
}
