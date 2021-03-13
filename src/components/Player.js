import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

function Player({ response: players }) {
  let { entityName } = useParams();
  entityName = entityName.split('-').join(' ');
  const playerObj = players.find((p) => p.name === entityName);

  return (
    <div className='panel'>
      <img
        className='avatar'
        src={playerObj.avatar}
        alt={`${playerObj.name}'s avatar`}
      />
      <h1 className='medium-header'>{playerObj.name}</h1>
      <h3 className='header'>#{playerObj.number}</h3>
      <div className='row'>
        <ul className='info-list' style={{ marginRight: '80px' }}>
          <li>
            Team
            <div>
              <a href={`/${playerObj.teamId}`}>{playerObj.teamId}</a>
            </div>
          </li>
          <li>
            Position<div>{playerObj.position}</div>
          </li>
          <li>
            PPG<div>{playerObj.ppg}</div>
          </li>
        </ul>
        <ul className='info-list'>
          <li>
            APG<div>{playerObj.apg}</div>
          </li>
          <li>
            SPG<div>{playerObj.spg}</div>
          </li>
          <li>
            RPG<div>{playerObj.rpg}</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

Player.propTypes = {
  response: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Player;
