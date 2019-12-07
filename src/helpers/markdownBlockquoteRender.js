import React from "react";
import PropTypes from "prop-types";

const MarkdownParagraphRender = ({ children }) => {
  return (
    <blockquote className="py-1 px-4 bg-neutral-100 text-grey-darker border-l-4 border-neutral-500 italic quote relative text-xl my-4">
      {children}
    </blockquote>
  );
};

MarkdownParagraphRender.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MarkdownParagraphRender;
