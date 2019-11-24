import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Image from "../components/Image";
import SEO from "../components/Seo";

const IndexPage = ({ data: { prismicHomePage } }) => {
  const { data } = prismicHomePage;
  return (
    <Layout>
      <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div className="ml-6 pt-1">
          <h4 className="text-xl text-gray-900 leading-tight">ChitChat</h4>
          <p className="text-base text-gray-600 leading-normal">
            You have a new message!
          </p>
        </div>
      </div>
      <SEO title={data.title_seo.text} description={data.description_seo} />
      <h1>{data.title.text}</h1>
      <h2>{data.subtitle.text}</h2>
      <ul>
        {data.hashtags.map((element, i) => (
          <li key={i}>{element.hashtag}</li>
        ))}
      </ul>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
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
        subtitle {
          text
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
