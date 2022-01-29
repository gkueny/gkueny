import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownCodeRender from "../../helpers/markdownCodeRender";
import MarkdownInlineCodeRender from "../../helpers/MarkdownInlineCodeRender";
import MarkdownHeadingRender from "../../helpers/markdownHeadingRender";
import MarkdownParagraphRender from "../../helpers/markdownParagraphRender";
import MarkdownListRender from "../../helpers/markdownListRender";
import MarkdownBlockquoteRender from "../../helpers/markdownBlockquoteRender";
import MarkdownLinkRender from "../../helpers/markdownLinkRender";
import MarkdownImageRender from "../../helpers/markdownImageRender";

const assetRenderer = (markdownImages, markdownVideos) => (props) => {
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
};

const Markdown = ({ source, markdownImages = [], markdownVideos = [] }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        pre: MarkdownCodeRender,
        code: MarkdownInlineCodeRender,
        h1: MarkdownHeadingRender,
        h2: MarkdownHeadingRender,
        h3: MarkdownHeadingRender,
        h4: MarkdownHeadingRender,
        h5: MarkdownHeadingRender,
        h6: MarkdownHeadingRender,
        p: MarkdownParagraphRender,
        ul: MarkdownListRender,
        blockquote: MarkdownBlockquoteRender,
        a: MarkdownLinkRender,
        img: assetRenderer(markdownImages, markdownVideos),
        gif: assetRenderer(markdownImages, markdownVideos),
        video: assetRenderer(markdownImages, markdownVideos),
      }}
    >
      {source}
    </ReactMarkdown>
  );
};

export default Markdown;
