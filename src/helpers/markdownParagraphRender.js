import React from "react";
import PropTypes from "prop-types";

const MarkdownParagraphRender = ({ children }) => {
  return <p className="text-grey-darker text-lg mt-2">{children}</p>;
};

MarkdownParagraphRender.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MarkdownParagraphRender;
