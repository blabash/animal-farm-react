import * as React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import CenterStage from './CenterStage';
import Player from './Player';
import usePlayers from '../hooks/usePlayers';
import Team from './Team';
import useTeamNames from '../hooks/useTeamNames';
import TeamPage from './TeamPage';
import Articles from './Articles';

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/players'>
            <CenterStage
              dataFetch={usePlayers}
              header='Players'
              Component={Player}
            />
          </Route>
          <Route path='/teams'>
            <CenterStage
              dataFetch={useTeamNames}
              header='Teams'
              Component={Team}
            />
          </Route>
          <Route exact path='/:teamId'>
            <TeamPage />
          </Route>
          <Route path={`/:teamId/articles`}>
            <Articles />
          </Route>
          <Router>
            <h1 className='text-center'>404 page not found</h1>
          </Router>
        </Switch>
      </Router>
    </div>
  );
}
