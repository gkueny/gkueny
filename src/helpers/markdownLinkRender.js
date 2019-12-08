import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const MarkdownLinkRender = ({ href, children }) => {
  if (href && href[0] === "/") {
    return (
      <Link to={href} className="text-lg text-blue-500 hover:text-blue-800">
        {children}
      </Link>
    );
  }
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="text-lg text-blue-500 hover:text-blue-800"
    >
      {children}
    </a>
  );
};

MarkdownLinkRender.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default MarkdownLinkRender;
