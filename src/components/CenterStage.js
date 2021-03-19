import React from 'react';
import PropTypes from 'prop-types';
import { Switch, useLocation, useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import SelectedLink from './SelectedLink';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import usePlayers from '../hooks/usePlayers';
import useTeams from '../hooks/useTeams';

function CenterStage({ dataFetch, header, Component }) {
  const { url, path } = useRouteMatch();

  const location = useLocation();
  const parsed = new URLSearchParams(location.search);
  const teamId = parsed.get('teamId');

  let { loading, response } = dataFetch(teamId);

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h3 className='header'>{header}</h3>
        <ul className='sidebar-list'>
          {response.map((entity) => (
            <SelectedLink
              key={entity.name}
              to={{
                pathname: `${url}/${entity.name.split(' ').join('-')}`,
                search: location.search,
              }}
            >
              {entity.name}
            </SelectedLink>
          ))}
        </ul>
      </div>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames='fade' timeout={3000}>
          <Switch location={location}>
            <Route exact path={`${path}`}>
              <div className='sidebar-instruction'>
                Select a {header.slice(0, header.length - 1)}
              </div>
            </Route>
            <Route path={`${path}/:entityName`}>
              <Component response={response} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

CenterStage.propTypes = {
  dataFetch: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
};

export default CenterStage;
