import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

function SelectedLink({ to, children }) {
  const match = useRouteMatch(to.pathname);
  return <Link to={to}>{match ? <b>{children}</b> : children}</Link>;
}

SelectedLink.propTypes = {};

export default SelectedLink;
