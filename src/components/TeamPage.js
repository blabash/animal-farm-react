import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useTeam from '../hooks/useTeam';
import useTeamsArticles from '../hooks/useTeamsArticles';
import TeamLogo from './TeamLogo';
import { Link } from 'react-router-dom';
import TeamArticles from './TeamArticles';

function TeamPage(props) {
  const { teamId } = useParams();
  const { loading: teamDataLoading, response: teamData } = useTeam(teamId);
  const { loading: articlesDataLoading, response: articles } = useTeamsArticles(
    teamId
  );

  if (!teamDataLoading && !teamData)
    return <h1 className='header text-center'>Team doesn't exist</h1>;

  if (teamData && articles) {
    return (
      <div className='panel'>
        <TeamLogo id={teamData.id} width='200px' />
        <h1 className='medium-header'>{teamData.name}</h1>
        <h4 style={{ margin: '5px' }}>
          <Link to={`/players?teamId=${teamData.id}`}>View Roster</Link>
        </h4>
        <h4>Championships</h4>
        <ul className='championships'>
          {teamData.championships.map((year) => (
            <li key={year}>{year}</li>
          ))}
        </ul>
        <ul className='info-list row' style={{ width: '100%' }}>
          <li>
            Est.
            <div>{teamData.established}</div>
          </li>
          <li>
            Manager
            <div>{teamData.manager}</div>
          </li>
          <li>
            Coach
            <div>{teamData.coach}</div>
          </li>
          <li>
            Record
            <div>
              {teamData.wins} - {teamData.losses}
            </div>
          </li>
        </ul>
        <TeamArticles articles={articles} />
      </div>
    );
  }

  return <p className='text-center'>Loading...</p>;
}

TeamPage.propTypes = {};

export default TeamPage;
