import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Pagination = ({ currentPage, nbPages }) => {
  const pages = [...Array(nbPages)];
  const previousLink = currentPage > 2 ? `/${currentPage - 1}` : "";

  return (
    <footer className="flex justify-center">
      <ul className="flex pl-0 list-none rounded my-2">
        {pages.map((_, i) => {
          const page = i + 1;
          const link = i > 0 ? `/${page}` : "";
          return (
            <li
              className={`relative block leading-tight bg-white border border-gray-300 text-blue-700  hover:bg-gray-200${
                currentPage === page ? " bg-gray-200" : ""
              }${page === 1 ? " rounded-l" : ""}${
                page === nbPages ? " rounded-r" : ""
              }${page < nbPages ? " border-r-0" : ""}`}
            >
              <Link to={`/blog${link}`} className="block page-link py-2 px-3">
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  nbPages: PropTypes.number.isRequired,
};

export default Pagination;
