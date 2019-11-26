import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

const Article = ({ data: { prismicArticle } }) => {
  const {
    data: { title, summary, description },
  } = prismicArticle;
  return (
    <div>
      <article dangerouslySetInnerHTML={{ __html: description.html }}></article>
    </div>
  );
};

export default Article;
export const query = graphql`
  query ArticlePage($id: String!) {
    prismicArticle(id: { eq: $id }) {
      data {
        seo_title {
          text
        }
        seo_description
        title {
          text
        }
        summary
        categories {
          category_title
        }
        description {
          html
        }
        image {
          alt
          localFile {
            absolutePath
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
