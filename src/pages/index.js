import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Profil from "../components/Profil";
import SEO from "../components/Seo";

const IndexPage = ({ data: { prismicHomePage } }) => {
  const { data } = prismicHomePage;
  return (
    <Layout>
      <SEO title={data.title_seo.text} description={data.description_seo} />
      <Profil
        name={data.title.text}
        company={data.company}
        companyLink={data.company_link}
        hashtags={data.hashtags}
      />
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query HomePage {
    prismicHomePage {
      id
      data {
        title {
          text
        }
        company
        company_link {
          target
          url
        }
        hashtags {
          hashtag
        }
        title_seo {
          text
        }
        description_seo
      }
    }
  }
`;
