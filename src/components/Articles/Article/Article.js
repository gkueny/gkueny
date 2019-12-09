import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown/with-html";
import Layout from "../../Layout";
import SEO from "../../Seo";
import MarkdownCodeRender from "../../../helpers/markdownCodeRender";
import MarkdownInlineCodeRender from "../../../helpers/markdownInlineCodeRender";
import MarkdownHeadingRender from "../../../helpers/markdownHeadingRender";
import MarkdownParagraphRender from "../../../helpers/markdownParagraphRender";
import MarkdownListRender from "../../../helpers/markdownListRender";
import MarkdownBlockquoteRender from "../../../helpers/markdownBlockquoteRender";
import MarkdownLinkRender from "../../../helpers/markdownLinkRender";
import MarkdownImageRender from "../../../helpers/markdownImageRender";
import Header from "../../Layout/Header";
import "./article.css";

const Article = ({ data: { article } }) => {
  const { title, excerpt, text, images } = article;

  return (
    <Layout header={<Header title={title} />} padding>
      <SEO title={title} description={excerpt} />
      <article className="flex justify-center">
        <div className="max-w-3xl w-full leading-loose">
          <ReactMarkdown
            source={text}
            escapeHtml={false}
            renderers={{
              code: MarkdownCodeRender,
              inlineCode: MarkdownInlineCodeRender,
              heading: MarkdownHeadingRender,
              paragraph: MarkdownParagraphRender,
              list: MarkdownListRender,
              blockquote: MarkdownBlockquoteRender,
              link: MarkdownLinkRender,
              image: props => {
                const imageData = images.find(
                  image => image.intialImage === `(${props.src})`
                );
                return <MarkdownImageRender {...props} imageData={imageData} />;
              },
            }}
          />
        </div>
      </article>
    </Layout>
  );
};

export default Article;
export const query = graphql`
  query ArticlePage($id: String!) {
    article(id: { eq: $id }) {
      title
      excerpt
      text
      images {
        intialImage
        isVideo
        url
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
