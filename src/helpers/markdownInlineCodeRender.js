import React from "react";
import PropTypes from "prop-types";

const MarkdownInlineCodeRender = ({ children }) => {
  return <span className="text-red-500 font-bold">{children}</span>;
};

MarkdownInlineCodeRender.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default MarkdownInlineCodeRender;
