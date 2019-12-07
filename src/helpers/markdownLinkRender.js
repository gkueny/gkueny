import React from "react";
import PropTypes from "prop-types";

const MarkdownLinkRender = ({ href, children }) => {
  return (
    <a href={href} className="text-lg text-blue-500 hover:text-blue-800">
      {children}
    </a>
  );
};

MarkdownLinkRender.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default MarkdownLinkRender;
