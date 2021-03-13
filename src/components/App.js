import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/players'></Route>
        <Route path='/teams'></Route>
      </Router>
    </div>
  );
}
