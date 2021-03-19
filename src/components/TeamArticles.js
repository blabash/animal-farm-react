import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

function TeamArticles({ articles }) {
  const { url } = useRouteMatch();
  return (
    <>
      <h2 className='header'>Articles</h2>
      <ul className='articles'>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`${url}/articles/${article.id.toLowerCase()}`}>
              <h4 className='article-title'>{article.title}</h4>
              <div className='article-date'>
                {new Date(article.date).toLocaleDateString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

TeamArticles.propTypes = {};

export default TeamArticles;
