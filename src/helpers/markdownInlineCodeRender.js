import React from "react";
import PropTypes from "prop-types";

const MarkdownInlineCodeRender = ({ inline, children }) => {
  if(!inline) {
      return children;
  }

  return <span className="text-red-600 font-bold">{children}</span>;
};

MarkdownInlineCodeRender.propTypes = {
  inline: PropTypes.bool,
};

export default MarkdownInlineCodeRender;
