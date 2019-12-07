import React from "react";
import PropTypes from "prop-types";

const MarkdownHeadingRender = ({ level, children }) => {
  switch (level) {
    case 1:
      return <h1 className="text-black font-bold text-3xl my-8">{children}</h1>;
    case 2:
      return <h2 className="text-black font-bold text-2xl my-4">{children}</h2>;
    case 3:
      return <h3 className="text-black font-bold text-xl my-3">{children}</h3>;
    default:
      return <h4 className="text-black font-bold text-lg my-2">{children}</h4>;
  }
};

MarkdownHeadingRender.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
};

export default MarkdownHeadingRender;
