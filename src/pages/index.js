import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Profil from "../components/Profil";
import SEO from "../components/Seo";

const IndexPage = ({ data: { allArticle } }) => {
  const { nodes: dataArticles } = allArticle;
  return (
    <Layout>
      <SEO description="Développeur depuis maintenant 2 ans et demi, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php." />
      <Profil
        name="gkueny"
        company="@Occitech"
        companyLink="https://www.occitech.fr"
        hashtags={["react", "react-native", "symfony"]}
        articles={dataArticles}
      />
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query HomePage {
    allArticle(limit: 3, sort: { fields: [date], order: DESC }) {
      nodes {
        id
        title
        date
        excerpt
        slug
        keywords
      }
    }
  }
`;
