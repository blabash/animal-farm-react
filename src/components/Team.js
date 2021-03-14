import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useTeam from '../hooks/useTeam';
import TeamLogo from '../components/TeamLogo';

function Team({ response: teams }) {
  let { entityName } = useParams();
  entityName = entityName.split('-').join(' ');
  const { name } = teams.find((t) => t.name === entityName);

  const { loading, response: teamData } = useTeam(name);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='panel'>
      <TeamLogo id={teamData.id} width='200px' />
      <h1 className='medium-header'>{teamData.name}</h1>
      <div style={{ width: '100%' }}>
        <ul className='info-list row'>
          <li>
            Est.<div>{teamData.established}</div>
          </li>
          <li>
            Manager<div>{teamData.manager}</div>
          </li>
          <li>
            Coach<div>{teamData.coach}</div>
          </li>
        </ul>
      </div>
      <a href={`/${teamData.id}`} className='center btn-main'>
        {teamData.name} Team Page
      </a>
    </div>
  );
}

Team.propTypes = {
  response: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default Team;
