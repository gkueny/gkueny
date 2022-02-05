import React from "react";
import PropTypes from "prop-types";

const MarkdownListRender = ({ children }) => {
  return (
    <ul className="list-disc list-inside text-grey-darker text-lg">
      {children}
    </ul>
  );
};

MarkdownListRender.propTypes = {
  children: PropTypes.array.isRequired,
};

export default MarkdownListRender;
