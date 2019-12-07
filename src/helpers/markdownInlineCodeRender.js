import React from "react";
import PropTypes from "prop-types";

const MarkdownParagraphRender = ({ children }) => {
  return <span className="text-black font-bold">{children}</span>;
};

MarkdownParagraphRender.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MarkdownParagraphRender;
