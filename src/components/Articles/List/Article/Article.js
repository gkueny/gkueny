import React from "react";
import PropTypes from "prop-types";

const Article = ({ title, description, categories = [] }) => {
  return (
    <article className="max-w-xl rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        {categories.map(({ title }) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #{title}
          </span>
        ))}
      </div>
    </article>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Article;
