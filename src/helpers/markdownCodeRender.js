import React from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownCodeRender = ({ language, value }) => {
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
