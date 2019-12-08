import React from "react";
import PropTypes from "prop-types";

const MarkdownParagraphRender = ({ children }) => {
  if (children.length === 1 && children[0].type === "img") {
    return (
      <p className="flex justify-center text-grey-darker text-lg mt-2">
        {children}
      </p>
    );
  }

  return <p className="text-grey-darker text-lg mt-2">{children}</p>;
};

MarkdownParagraphRender.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MarkdownParagraphRender;
