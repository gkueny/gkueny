import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Article = ({ title, excerpt, slug, keywords = "" }) => {
  return (
    <section className="max-w-xl rounded overflow-hidden shadow-lg">
      <Link to={slug} className="block px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{excerpt}</p>
      </Link>
      <div className="px-6 py-4">
        {keywords.split(",").map((keyword, i) => (
          <span
            key={i}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{keyword}
          </span>
        ))}
      </div>
    </section>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
};

export default Article;
