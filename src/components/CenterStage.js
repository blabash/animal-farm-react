import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useRouteMatch } from 'react-router';
import { Link, Route } from 'react-router-dom';

function CenterStage({ dataFetch, header, Component }) {
  const { url, path, isExact } = useRouteMatch();

  const { search } = useLocation();
  const parsed = new URLSearchParams(search);
  const teamId = parsed.get('teamId');

  let { loading, response } = dataFetch(teamId);
  if (response && !response[0].name) {
    response = response.map((entity) => ({ name: entity })); //shape response correctly according to dataFetch return value, break out into separate functions if there are more response types
  }

  if (loading) return <p className='center-text'>Loading...</p>;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h3 className='header'>{header}</h3>
        <ul className='sidebar-list'>
          {response.map((entity) => (
            <Link
              key={entity.name}
              to={
                `${url}/${entity.name.split(' ').join('-')}` +
                (teamId ? `?teamId=${teamId}` : ``)
              }
            >
              {entity.name}
            </Link>
          ))}
        </ul>
      </div>
      {isExact && (
        <div className='sidebar-instruction'>
          Select a {header.slice(0, header.length - 1)}
        </div>
      )}
      <Route path={`${path}/:entityName`}>
        <Component response={response} />
      </Route>
    </div>
  );
}

CenterStage.propTypes = {
  dataFetch: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
};

export default CenterStage;
