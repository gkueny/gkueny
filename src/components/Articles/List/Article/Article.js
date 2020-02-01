import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import format from "date-fns/format";
import locale from "date-fns/locale/fr";

const Article = ({ title, excerpt, slug, date, keywords = "" }) => {
  return (
    <section className="max-w-xl rounded overflow-hidden shadow-lg border border-gray-200">
      <Link to={`/${slug}`} className="block px-6 py-4 hover:text-blue-800 ">
        <h3 className="font-bold text-xl">{title}</h3>
        {date && (
          <span className="text-gray-700 text-xs">
            Publié le {format(new Date(date), "dd MMMM yyyy", { locale })}
          </span>
        )}
        <p className="text-gray-900 text-base mt-2">{excerpt}</p>
      </Link>
      <div className="px-6 py-4">
        {keywords &&
          keywords.split(",").map((keyword, i) => (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2"
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
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  keywords: PropTypes.string,
};

export default Article;
