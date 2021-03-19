import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import useTeamsArticles from '../hooks/useTeamsArticles';
import useArticle from '../hooks/useArticle';
import { Link } from 'react-router-dom';
import SelectedLink from './SelectedLink';

function Article() {
  const { teamId, articleId } = useParams();
  const { loading, response: article } = useArticle({ teamId, articleId });

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className='panel'>
      <article className='article'>
        <h1 className='header'>
          {new Date(article.date).toLocaleDateString()}
        </h1>
        <h1 className='header'>{article.title}</h1>
        <p>{article.body}</p>
      </article>
    </div>
  );
}

function Articles() {
  const { teamId } = useParams();
  const { url, path } = useRouteMatch();
  const { loading, response: articles } = useTeamsArticles(teamId);

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className='container two-column'>
      <div>
        <h3 className='header'>Articles</h3>
        <ul className='sidebar-list'>
          {articles.map((article) => (
            <li key={article.id}>
              <SelectedLink
                to={{ pathname: `${url}/${article.id.toLowerCase()}` }}
              >
                {article.title}
              </SelectedLink>
            </li>
          ))}
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/:articleId`}>
          <Article />
        </Route>
        <Route path='*'>
          <div className='sidebar-instruction'>Select an article</div>
        </Route>
      </Switch>
    </div>
  );
}

Articles.propTypes = {};

export default Articles;
