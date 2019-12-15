import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Article from "./Article";

const ArticlesList = ({ articles, withLink = true }) => {
  return (
    <ul className="flex flex-col h-full justify-center py-12 px-1 lg:overflow-y-auto article-list">
      {articles.map(article => (
        <li key={article.id} className="my-4">
          <Article {...article} />
        </li>
      ))}
      {withLink && (
        <li className="my-4 w-14">
          <Link
            to="/blog"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-between"
          >
            <span> Voir tous mes articles</span>
            <svg
              className="fill-current h-6 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M16,4.96C9.913,4.96,4.96,9.912,4.96,16S9.913,27.04,16,27.04S27.04,22.088,27.04,16S22.087,4.96,16,4.96z M16,25.12  c-5.028,0-9.12-4.092-9.12-9.12S10.972,6.88,16,6.88s9.12,4.092,9.12,9.12S21.028,25.12,16,25.12z" />
              <polygon points="13.098,11.368 17.966,16 13.098,20.632 14.421,22.022 20.753,16 14.421,9.977 " />
            </svg>
          </Link>
        </li>
      )}
    </ul>
  );
};

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
  withLink: PropTypes.bool,
};

export default ArticlesList;
