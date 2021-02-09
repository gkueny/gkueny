import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import MarkdownCodeRender from "../../helpers/markdownCodeRender";
import MarkdownInlineCodeRender from "../../helpers/markdownInlineCodeRender";
import MarkdownHeadingRender from "../../helpers/markdownHeadingRender";
import MarkdownParagraphRender from "../../helpers/markdownParagraphRender";
import MarkdownListRender from "../../helpers/markdownListRender";
import MarkdownBlockquoteRender from "../../helpers/markdownBlockquoteRender";
import MarkdownLinkRender from "../../helpers/markdownLinkRender";
import MarkdownImageRender from "../../helpers/markdownImageRender";

const Markdown = ({
  source,
  escapeHtml = false,
  markdownImages = [],
  markdownVideos = [],
}) => {
  return (
    <ReactMarkdown
      source={source}
      escapeHtml={escapeHtml}
      renderers={{
        code: MarkdownCodeRender,
        inlineCode: MarkdownInlineCodeRender,
        heading: MarkdownHeadingRender,
        paragraph: MarkdownParagraphRender,
        list: MarkdownListRender,
        blockquote: MarkdownBlockquoteRender,
        link: MarkdownLinkRender,
        image: (props) => {
          const markdownImage = markdownImages.find(
            (image) => image.initialUrl === `(${props.src})`
          );
          const markdownVideo = markdownVideos.find(
            (video) => video.initialUrl === `(${props.src})`
          );
          return (
            <MarkdownImageRender
              {...props}
              markdownImage={markdownImage}
              markdownVideo={markdownVideo}
            />
          );
        },
      }}
    />
  );
};

export default Markdown;
