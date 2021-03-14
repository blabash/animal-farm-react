import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import useTeamsArticles from '../hooks/useTeamsArticles';
import useArticle from '../hooks/useArticle';
import { Link } from 'react-router-dom';

function Article() {
  const { teamId, articleId } = useParams();
  console.log('articleId', articleId);
  console.log('teamId', teamId);
  const { loading, response: article } = useArticle({ teamId, articleId });

  if (loading) return <p>Loading...</p>;

  return <div className='panel'>YOOOO</div>;
}

function Articles() {
  const { teamId } = useParams();
  const { url, path } = useRouteMatch();
  const { loading, response: articles } = useTeamsArticles(teamId);
  // console.log('articles', articles);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='container two-column'>
      <div>
        <h3 className='header'>Articles</h3>
        <ul className='sidebar-list'>
          {articles.map((article) => (
            <li key={article.id}>
              <Link to={`${url}/${article.id}`}>{article.title}</Link>
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
