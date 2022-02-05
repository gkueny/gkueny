import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const getLanguage = (children) => {
  if (!children || !children[0]) {
    return null;
  }

  if (!children[0]?.type === "code") {
    return null;
  }

  if (!children[0]?.props?.className?.includes("language-")) {
    return null;
  }

  return children[0]?.props?.className?.split("language-")[1];
};
const MarkdownCodeRender = ({ children }) => {
  const language = getLanguage(children);

  if (!language) {
    return (
      <blockquote className="py-1 px-4 bg-neutral-100 text-red-600 border-l-4 border-neutral-500 italic quote relative text-xl my-4">
        {children}
      </blockquote>
    );
  }

  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {children[0].props.children}
    </SyntaxHighlighter>
  );
};

export default MarkdownCodeRender;
