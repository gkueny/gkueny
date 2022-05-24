import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Profil from "../components/Profil";
import Seo from "../components/Seo";

const IndexPage = ({ data: { allArticle } }) => {
  const { nodes: dataArticles } = allArticle;
  return (
    <Layout>
      <Seo description="Développeur depuis maintenant 6 ans, j'ai une grande affinité avec le mobile et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php." />
      <Profil
        name="gkueny"
        company="- Mobile developer @ZEBet"
        companyLink="https://www.linkedin.com/company/groupe-zeturf/mycompany/"
        hashtags={["react-native", "react", "symfony"]}
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
