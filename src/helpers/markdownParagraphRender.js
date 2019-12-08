import React from "react";
import PropTypes from "prop-types";

const MarkdownParagraphRender = ({ children }) => {
  if (
    children.length === 1 &&
    children[0].props.alt &&
    children[0].props.src &&
    !children[0].props.src.includes("http")
  ) {
    return (
      <div className="article-image article-image--gatsby text-grey-darker text-lg mt-2">
        {children}
      </div>
    );
  }

  if (children.length === 1 && children[0].props.alt && children[0].props.src) {
    return (
      <div className="article-image flex justify-center text-grey-darker text-lg mt-2">
        {children}
      </div>
    );
  }

  return <p className="text-grey-darker text-lg mt-2">{children}</p>;
};

MarkdownParagraphRender.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default MarkdownParagraphRender;
