import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useTeam from '../hooks/useTeam';

function Team({ response: teams }) {
  let { entityName } = useParams();
  entityName = entityName.split('-').join(' ');
  const { name } = teams.find((t) => t.name === entityName);

  const { loading, response } = useTeam(name);
  console.log(response);
  return <div>{name}</div>;
}

Team.propTypes = {};

export default Team;
