import React from "react";
import { graphql } from "gatsby";
import Layout from "../Layout";
import Header from "../Header";
import ArticlesList from "../Articles/List";
import SEO from "../Seo";

const BlogPage = ({ data: { allArticle } }) => {
  const { nodes: articles } = allArticle;
  return (
    <Layout header={<Header title={"Blog"} />} padding>
      <SEO
        title="gkueny"
        description="Développeur depuis maintenant 2 ans et demi, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php."
      />
      <section className="flex flex-1 flex-col items-center justify-center">
        <ArticlesList articles={articles} withLink={false} />
      </section>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogPage($skip: Int!, $limit: Int!) {
    allArticle(limit: $limit, skip: $skip) {
      nodes {
        id
        title
        excerpt
        slug
        keywords
      }
    }
  }
`;
