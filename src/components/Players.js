import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useRouteMatch } from 'react-router';
import { Link, Route } from 'react-router-dom';

import usePlayers from '../hooks/usePlayers';

import Player from './Player';

function Players(props) {
  //use route match for player
  //use search params for teamid
  //.../players/tyler-mcginnis
  //or .../players/tyler-mcginnis?teamId=bulls
  //or .../players?teamId=bulls

  const { url, path } = useRouteMatch();
  console.log('url', url);
  console.log('path', path);

  const { search } = useLocation();
  const parsed = new URLSearchParams(search);
  const teamId = parsed.get('teamId');
  console.log('teamId', teamId);

  const { loading, response: players } = usePlayers(teamId ? teamId : null);

  if (loading) return <p className='center-text'>Loading...</p>;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h3 className='header'>Players</h3>
        <ul className='sidebar-list'>
          {players.map((player) => (
            <Link
              key={player.name}
              to={
                `${url}/${player.name.split(' ').join('-')}` +
                (teamId ? `?teamId=${teamId}` : ``)
              }
            >
              {player.name}
            </Link>
          ))}
        </ul>
      </div>
      <Route path={`${path}/:playerName`}>
        <Player players={players} />
      </Route>
    </div>
  );
}

Players.propTypes = {};

export default Players;
