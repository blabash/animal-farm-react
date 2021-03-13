import React from 'react';
import { Link } from 'react-router-dom';

import TeamLogo from './TeamLogo';
import useTeamNames from '../hooks/useTeamNames';

function Home() {
  const { response: teamNames, loading } = useTeamNames();

  if (loading) return <p className='text-center'>Loading...</p>;
  return (
    <div>
      <h1 className='large-header'>Hash History Basketball League</h1>
      <h3 className='header text-center'>Select a team</h3>
      <div className='home-grid'>
        {teamNames.map((name) => (
          <Link key={name} to={`/${name}`}>
            <TeamLogo id={name} width='100px' />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
