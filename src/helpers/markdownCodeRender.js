import React from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownCodeRender = ({ language, value }) => {
  if (!language) {
    return (
      <blockquote className="py-1 px-4 bg-neutral-100 text-red-600 border-l-4 border-neutral-500 italic quote relative text-xl my-4">
        {value}
      </blockquote>
    );
  }

  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  );
};

MarkdownCodeRender.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};

export default MarkdownCodeRender;
